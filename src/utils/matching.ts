import { FictionalProfile, MatchAnalysis, UserProfile } from '../types';

function normalize(str: string): string {
  return str.toLowerCase().trim();
}

function skillMatches(skillA: string, skillB: string): boolean {
  const a = normalize(skillA);
  const b = normalize(skillB);
  return a === b || a.includes(b) || b.includes(a);
}

function formatMatches(userFormat: string, partnerFormat: string): { aligned: boolean; note: string } {
  if (userFormat === 'Flexible' || partnerFormat === 'Flexible') {
    return { aligned: true, note: 'Format is fully compatible via flexible arrangements.' };
  }
  if (userFormat === partnerFormat) {
    return { aligned: true, note: `Both prefer ${userFormat} sessions.` };
  }
  return {
    aligned: false,
    note: `Format difference: You prefer ${userFormat}, while partner prefers ${partnerFormat}. A compromise may be needed.`,
  };
}

function findAvailabilityOverlap(userAvail: string[], partnerAvail: string[]): string[] {
  const overlap: string[] = [];
  for (const u of userAvail) {
    for (const p of partnerAvail) {
      if (normalize(u) === normalize(p)) {
        overlap.push(u);
      } else if (
        (u.includes('Tuesday') && p.includes('Tuesday')) ||
        (u.includes('Thursday') && p.includes('Thursday')) ||
        (u.includes('Monday') && p.includes('Monday')) ||
        (u.includes('Wednesday') && p.includes('Wednesday')) ||
        (u.includes('Friday') && p.includes('Friday')) ||
        (u.includes('Saturday') && p.includes('Saturday')) ||
        (u.includes('Sunday') && p.includes('Sunday')) ||
        (u.includes('Weekend') && (p.includes('Saturday') || p.includes('Sunday')))
      ) {
        if (!overlap.includes(`${u} / ${p}`)) {
          overlap.push(`${u} & ${p}`);
        }
      }
    }
  }
  return overlap;
}

export function computeRuleBasedMatches(
  user: UserProfile,
  candidates: FictionalProfile[]
): { matches: MatchAnalysis[]; generalAdvice: string } {
  const scoredCandidates = candidates.map((candidate) => {
    // 1. Check if user teaches what partner wants
    const userTeachesWhatPartnerWants: { userSkill: string; level: string; partnerWants: string }[] = [];
    user.skillsOffered.forEach((offered) => {
      candidate.skillsWanted.forEach((wanted) => {
        if (skillMatches(offered.name, wanted)) {
          userTeachesWhatPartnerWants.push({
            userSkill: offered.name,
            level: offered.level,
            partnerWants: wanted,
          });
        }
      });
    });

    // 2. Check if partner teaches what user wants
    const partnerTeachesWhatUserWants: { partnerSkill: string; level: string; userWants: string }[] = [];
    candidate.skillsOffered.forEach((offered) => {
      user.skillsWanted.forEach((wanted) => {
        if (skillMatches(offered.name, wanted)) {
          partnerTeachesWhatUserWants.push({
            partnerSkill: offered.name,
            level: offered.level,
            userWants: wanted,
          });
        }
      });
    });

    const isReciprocal = userTeachesWhatPartnerWants.length > 0 && partnerTeachesWhatUserWants.length > 0;
    const isPartial = userTeachesWhatPartnerWants.length > 0 || partnerTeachesWhatUserWants.length > 0;

    const formatCheck = formatMatches(user.format, candidate.format);
    const overlapAvail = findAvailabilityOverlap(user.availability, candidate.availability);

    let score = 0;
    if (isReciprocal) score += 100;
    if (userTeachesWhatPartnerWants.length > 0) score += 30;
    if (partnerTeachesWhatUserWants.length > 0) score += 30;
    if (formatCheck.aligned) score += 20;
    score += Math.min(overlapAvail.length * 15, 30);

    return {
      candidate,
      isReciprocal,
      isPartial,
      score,
      userTeachesWhatPartnerWants,
      partnerTeachesWhatUserWants,
      formatCheck,
      overlapAvail,
    };
  });

  // Sort descending by score
  scoredCandidates.sort((a, b) => b.score - a.score);

  const topThree = scoredCandidates.slice(0, 3);

  const matches: MatchAnalysis[] = topThree.map(({ candidate, userTeachesWhatPartnerWants, partnerTeachesWhatUserWants, formatCheck, overlapAvail }) => {
    const userTeachesStr = userTeachesWhatPartnerWants.length > 0
      ? userTeachesWhatPartnerWants.map((m) => `${m.userSkill} (${m.level} level)`).join(', ')
      : user.skillsOffered.length > 0
      ? `${user.skillsOffered[0].name} (${user.skillsOffered[0].level} level)`
      : 'Open to sharing general skills';

    const userLearnsStr = partnerTeachesWhatUserWants.length > 0
      ? partnerTeachesWhatUserWants.map((m) => `${m.partnerSkill} (${m.level} level)`).join(', ')
      : candidate.skillsOffered.length > 0
      ? `${candidate.skillsOffered[0].name} (${candidate.skillsOffered[0].level} level)`
      : 'Skills from profile';

    let skillFitExplanation = '';
    if (userTeachesWhatPartnerWants.length > 0 && partnerTeachesWhatUserWants.length > 0) {
      skillFitExplanation = `Direct reciprocal fit: ${user.name} offers ${userTeachesStr} which ${candidate.name} is seeking, while ${candidate.name} offers ${userLearnsStr} which ${user.name} wants to practice.`;
    } else if (userTeachesWhatPartnerWants.length > 0) {
      skillFitExplanation = `Partial fit: ${candidate.name} is looking for ${userTeachesStr}. Complementary learning can be discussed.`;
    } else if (partnerTeachesWhatUserWants.length > 0) {
      skillFitExplanation = `Partial fit: ${candidate.name} offers ${userLearnsStr}. Discuss if other knowledge can be exchanged.`;
    } else {
      skillFitExplanation = `Cross-domain potential: Shared interest in learning and community exchange based on active schedules.`;
    }

    let formatAndAvailabilityAlignment = formatCheck.note;
    if (overlapAvail.length > 0) {
      formatAndAvailabilityAlignment += ` Overlapping times detected during: ${overlapAvail.join(', ')}.`;
    } else {
      formatAndAvailabilityAlignment += ` Stated times differ (${user.availability.join(', ') || 'unspecified'} vs ${candidate.availability.join(', ')}). A mutually agreed time slot will need to be coordinated.`;
    }

    let potentialConflictsOrMissingInfo = '';
    if (overlapAvail.length === 0) {
      potentialConflictsOrMissingInfo += 'Schedules do not have an exact matching day listed. ';
    }
    if (!formatCheck.aligned) {
      potentialConflictsOrMissingInfo += 'Meeting formats differ (one is online, one is in-person). ';
    }
    if (!potentialConflictsOrMissingInfo) {
      potentialConflictsOrMissingInfo = 'No explicit scheduling or format conflicts. Coordinate timezone and specific hour before meeting.';
    }

    const primaryTeach = userTeachesWhatPartnerWants[0]?.userSkill || user.skillsOffered[0]?.name || 'the first skill';
    const primaryLearn = partnerTeachesWhatUserWants[0]?.partnerSkill || candidate.skillsOffered[0]?.name || 'the partner skill';

    const suggestedFirstSessionPlan = `60-minute structured exchange: Spend the first 25 minutes on ${primaryTeach} fundamentals and practical exercises; take a 5-minute break to debrief; spend the next 25 minutes practicing ${primaryLearn}; conclude with 5 minutes to set goals for a follow-up session.`;

    return {
      profileId: candidate.id,
      partnerName: candidate.name,
      userTeaches: userTeachesStr,
      userLearns: userLearnsStr,
      skillFitExplanation,
      formatAndAvailabilityAlignment,
      potentialConflictsOrMissingInfo,
      suggestedFirstSessionPlan,
      isFallback: true,
    };
  });

  const reciprocalCount = scoredCandidates.filter((c) => c.isReciprocal).length;
  let generalAdvice = '';
  if (reciprocalCount >= 2) {
    generalAdvice = `Great alignment: Found ${reciprocalCount} profile(s) with complementary two-way skill matches. Reach out to propose a focused 45-60 minute introductory session.`;
  } else if (reciprocalCount === 1) {
    generalAdvice = `Found 1 exact two-way match and 2 adjacent possibilities. To discover more partners, try selecting "Flexible" format or adding more open availability days in your profile.`;
  } else {
    generalAdvice = `No direct two-way reciprocal match was found for your exact current skills and preferences. Consider adding an additional skill you can teach, broadening what you want to learn, or switching meeting format to "Flexible" to unlock matches.`;
  }

  return { matches, generalAdvice };
}
