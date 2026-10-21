export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type MeetingFormat = 'Online' | 'In-person' | 'Flexible';

export interface OfferedSkill {
  name: string;
  level: SkillLevel;
}

export interface UserProfile {
  name: string;
  intro: string;
  skillsOffered: OfferedSkill[];
  skillsWanted: string[];
  availability: string[];
  format: MeetingFormat;
  location: string; // broad city/region only
}

export interface FictionalProfile {
  id: string;
  name: string;
  roleHeadline: string;
  avatarColor: string;
  intro: string;
  skillsOffered: OfferedSkill[];
  skillsWanted: string[];
  availability: string[];
  format: MeetingFormat;
  location: string;
  sampleTopic: string;
  whySwap: string;
}

export interface MatchAnalysis {
  profileId: string;
  partnerName: string;
  userTeaches: string;
  userLearns: string;
  skillFitExplanation: string;
  formatAndAvailabilityAlignment: string;
  potentialConflictsOrMissingInfo: string;
  suggestedFirstSessionPlan: string;
  isFallback?: boolean;
}

export interface ProposalReflection {
  completedDate: string;
  whatWentWell: string;
  keyTakeaway: string;
  notesForNextTime: string;
}

export interface Proposal {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerLocation: string;
  partnerFormat: MeetingFormat;
  userOfferedSkill: string;
  userRequestedSkill: string;
  duration: string;
  suggestedDateTime: string;
  format: 'Online' | 'In-person';
  meetingNotes: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
  reflection?: ProposalReflection;
}
