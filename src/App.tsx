/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FictionalProfile,
  MatchAnalysis,
  Proposal,
  ProposalReflection,
  UserProfile,
} from './types';
import { ALEX_PROFILE, FICTIONAL_PROFILES } from './data/fictionalProfiles';
import {
  loadUserProfile,
  saveUserProfile,
  loadProposals,
  saveProposals,
  resetDemoStorage,
} from './utils/storage';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ProfileView } from './components/ProfileView';
import { ExploreView } from './components/ExploreView';
import { MatchAssistantView } from './components/MatchAssistantView';
import { ExchangesView } from './components/ExchangesView';
import { HowItWorksView } from './components/HowItWorksView';
import { ProposalModal } from './components/ProposalModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { CheckCircle2, Heart, ArrowRightLeft } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadUserProfile());
  const [proposals, setProposals] = useState<Proposal[]>(() => loadProposals());

  // Proposal modal state
  const [proposalPartner, setProposalPartner] = useState<FictionalProfile | null>(null);
  const [initialOfferedSkill, setInitialOfferedSkill] = useState<string>('');
  const [initialRequestedSkill, setInitialRequestedSkill] = useState<string>('');

  // Reset modal state
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Filter pass-through from Home
  const [exploreInitialSkill, setExploreInitialSkill] = useState<string>('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist profile
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    saveUserProfile(updatedProfile);
    showToast('Profile updated successfully!');
  };

  // Load Alex demo profile
  const handleLoadAlex = () => {
    setUserProfile({ ...ALEX_PROFILE });
    saveUserProfile({ ...ALEX_PROFILE });
    showToast("Loaded Alex's demo profile (Excel ⇄ English conversation)");
  };

  // Reset demo
  const handleConfirmReset = () => {
    const { profile, proposals: resetProps } = resetDemoStorage();
    setUserProfile(profile);
    setProposals(resetProps);
    setCurrentTab('home');
    showToast('Demo data reset to initial default state.');
  };

  // Proposal Submission
  const handleOpenProposal = (
    partner: FictionalProfile,
    offeredSkill = '',
    requestedSkill = ''
  ) => {
    setProposalPartner(partner);
    setInitialOfferedSkill(offeredSkill);
    setInitialRequestedSkill(requestedSkill);
  };

  const handleProposeFromMatch = (match: MatchAnalysis, partner: FictionalProfile) => {
    // Extract first skill offered and requested
    const offered = userProfile.skillsOffered[0]?.name || '';
    const requested = partner.skillsOffered[0]?.name || '';
    handleOpenProposal(partner, offered, requested);
  };

  const handleSaveProposal = (newProposal: Proposal) => {
    const updated = [newProposal, ...proposals];
    setProposals(updated);
    saveProposals(updated);
    showToast(`Exchange proposal sent to ${newProposal.partnerName}! (Simulated)`);
    setCurrentTab('exchanges');
  };

  // Proposal Status Update
  const handleUpdateProposalStatus = (id: string, status: Proposal['status']) => {
    const updated = proposals.map((p) => {
      if (p.id === id) {
        return { ...p, status };
      }
      return p;
    });
    setProposals(updated);
    saveProposals(updated);
    showToast(`Proposal status updated to "${status}" (Simulated demo action).`);
  };

  // Save Reflection
  const handleSaveReflection = (proposalId: string, reflection: ProposalReflection) => {
    const updated = proposals.map((p) => {
      if (p.id === proposalId) {
        return { ...p, reflection };
      }
      return p;
    });
    setProposals(updated);
    saveProposals(updated);
    showToast('Private reflection recorded for this exchange.');
  };

  // Calculate counts for badges
  const pendingCount = proposals.filter((p) => p.status === 'pending').length;
  const acceptedCount = proposals.filter((p) => p.status === 'accepted').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2421] flex flex-col font-sans selection:bg-[#D95D39]/20 selection:text-[#183B2B]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        pendingCount={pendingCount}
        acceptedCount={acceptedCount}
        onTryAlex={handleLoadAlex}
        onOpenResetModal={() => setResetModalOpen(true)}
        userName={userProfile.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={setCurrentTab}
            onTryAlex={handleLoadAlex}
            onSelectSkillFilter={(skill) => {
              setExploreInitialSkill(skill);
              setCurrentTab('explore');
            }}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            initialOfferedFilter={exploreInitialSkill}
            onProposeExchange={(p) => handleOpenProposal(p)}
            onNavigateToMatches={() => setCurrentTab('matches')}
          />
        )}

        {currentTab === 'matches' && (
          <MatchAssistantView
            userProfile={userProfile}
            onNavigateToProfile={() => setCurrentTab('profile')}
            onProposeExchangeWithMatch={handleProposeFromMatch}
          />
        )}

        {currentTab === 'exchanges' && (
          <ExchangesView
            proposals={proposals}
            onUpdateProposalStatus={handleUpdateProposalStatus}
            onSaveReflection={handleSaveReflection}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onSaveProfile={handleSaveProfile}
            onNavigateToMatches={() => setCurrentTab('matches')}
            onLoadAlexProfile={handleLoadAlex}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksView
            onNavigate={setCurrentTab}
            onTryAlex={handleLoadAlex}
          />
        )}
      </main>

      {/* Proposal Modal */}
      <ProposalModal
        partner={proposalPartner}
        userProfile={userProfile}
        initialOfferedSkill={initialOfferedSkill}
        initialRequestedSkill={initialRequestedSkill}
        onClose={() => setProposalPartner(null)}
        onSubmitProposal={handleSaveProposal}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#183B2B] text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-[#2D664E] animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E8DEC8] bg-[#F4EFE6] py-10 px-4 sm:px-6 lg:px-8 text-xs text-[#526059]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#183B2B] text-white flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-[#D95D39]" />
            </div>
            <div>
              <span className="font-serif-heading font-bold text-[#183B2B] text-sm">
                SkillSwap
              </span>
              <span className="text-[11px] text-[#697972] block">
                Direct skill exchange without money • Interactive Demo
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#5C6B64]">
            <button
              onClick={() => setCurrentTab('how-it-works')}
              className="hover:text-[#183B2B] transition cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => setCurrentTab('explore')}
              className="hover:text-[#183B2B] transition cursor-pointer"
            >
              Explore Skills
            </button>
            <button
              onClick={() => setCurrentTab('matches')}
              className="hover:text-[#183B2B] transition cursor-pointer"
            >
              AI Match Assistant
            </button>
            <button
              onClick={() => setCurrentTab('profile')}
              className="hover:text-[#183B2B] transition cursor-pointer"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setResetModalOpen(true)}
              className="hover:text-[#D95D39] transition cursor-pointer underline decoration-dotted"
            >
              Reset Demo
            </button>
          </div>

          <div className="text-[11px] text-[#7A8A82] text-center sm:text-right">
            <span>Fictional profiles for demonstration only • Cashless community model</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
