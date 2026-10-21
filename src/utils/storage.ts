import { ALEX_PROFILE } from '../data/fictionalProfiles';
import { Proposal, UserProfile } from '../types';

const STORAGE_KEY_PROFILE = 'skillswap_user_profile_v1';
const STORAGE_KEY_PROPOSALS = 'skillswap_proposals_v1';

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'demo-prop-1',
    partnerId: 'elena-rostova',
    partnerName: 'Elena Rostova',
    partnerLocation: 'Toronto, ON',
    partnerFormat: 'Online',
    userOfferedSkill: 'Excel',
    userRequestedSkill: 'English conversation',
    duration: '60 minutes',
    suggestedDateTime: 'Upcoming Tuesday at 7:00 PM EST',
    format: 'Online',
    meetingNotes: 'Hi Elena! I would love to walk through Excel VLOOKUP/XLOOKUP formulas and pivot tables, and practice conversation for travel in exchange.',
    status: 'accepted',
    createdAt: '2026-10-14T10:00:00Z',
  },
  {
    id: 'demo-prop-2',
    partnerId: 'david-kim',
    partnerName: 'David Kim',
    partnerLocation: 'Chicago, IL',
    partnerFormat: 'Online',
    userOfferedSkill: 'Excel',
    userRequestedSkill: 'Basic computer support',
    duration: '45 minutes',
    suggestedDateTime: 'Completed on Saturday, Oct 11',
    format: 'Online',
    meetingNotes: 'Trading spreadsheet formatting tips for advice on configuring automated system backups and cloud sync.',
    status: 'completed',
    createdAt: '2026-10-09T14:30:00Z',
    reflection: {
      completedDate: '2026-10-11',
      whatWentWell: 'David was super clear about explaining local vs cloud backups. Splitting the hour evenly into 20-minute chunks kept the energy high.',
      keyTakeaway: 'Prepare a one-page bullet list of specific questions beforehand so no time is wasted figuring out where to start.',
      notesForNextTime: 'Follow up on password manager setup for next month.',
    },
  },
];

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load user profile from storage', err);
  }
  return { ...ALEX_PROFILE };
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save user profile', err);
  }
}

export function loadProposals(): Proposal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROPOSALS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load proposals', err);
  }
  return INITIAL_PROPOSALS;
}

export function saveProposals(proposals: Proposal[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROPOSALS, JSON.stringify(proposals));
  } catch (err) {
    console.error('Failed to save proposals', err);
  }
}

export function resetDemoStorage(): { profile: UserProfile; proposals: Proposal[] } {
  try {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_PROPOSALS);
    localStorage.removeItem('skillswap_cached_matches_v1');
  } catch (err) {
    console.error('Failed to reset storage', err);
  }
  return {
    profile: { ...ALEX_PROFILE },
    proposals: INITIAL_PROPOSALS,
  };
}
