import React, { useState } from 'react';
import { Proposal, ProposalReflection } from '../types';
import { ReflectionModal } from './ReflectionModal';
import {
  Calendar,
  Clock,
  Laptop,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRightLeft,
  Sparkles,
  Compass,
  AlertCircle,
  FileText,
  Lock,
} from 'lucide-react';

interface ExchangesViewProps {
  proposals: Proposal[];
  onUpdateProposalStatus: (id: string, status: Proposal['status']) => void;
  onSaveReflection: (proposalId: string, reflection: ProposalReflection) => void;
  onNavigate: (tab: string) => void;
}

export const ExchangesView: React.FC<ExchangesViewProps> = ({
  proposals,
  onUpdateProposalStatus,
  onSaveReflection,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'completed'>('accepted');
  const [reflectionTarget, setReflectionTarget] = useState<Proposal | null>(null);

  const pendingList = proposals.filter((p) => p.status === 'pending');
  const acceptedList = proposals.filter((p) => p.status === 'accepted');
  const completedList = proposals.filter((p) => p.status === 'completed');

  const handleSimulateComplete = (proposal: Proposal) => {
    onUpdateProposalStatus(proposal.id, 'completed');
    // Open reflection modal right after completing
    setReflectionTarget({ ...proposal, status: 'completed' });
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header and Subheading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
            Organize & Track
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#183B2B]">
            My Skill Exchanges
          </h1>
          <p className="text-sm text-[#4E5B54]">
            Manage your incoming and scheduled 1-to-1 learning exchanges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('matches')}
            className="px-4 py-2.5 rounded-xl bg-[#D95D39] text-white text-xs font-semibold hover:bg-[#C24E2A] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Find New Matches</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#EFECE4] border border-[#DDD3C0] max-w-md">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'pending'
              ? 'bg-[#183B2B] text-white shadow-xs'
              : 'text-[#4A5750] hover:text-[#183B2B]'
          }`}
        >
          <span>Pending</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'pending' ? 'bg-[#D95D39] text-white' : 'bg-[#DDD3C0] text-[#183B2B]'
            }`}
          >
            {pendingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'accepted'
              ? 'bg-[#183B2B] text-white shadow-xs'
              : 'text-[#4A5750] hover:text-[#183B2B]'
          }`}
        >
          <span>Accepted</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'accepted' ? 'bg-[#D95D39] text-white' : 'bg-[#DDD3C0] text-[#183B2B]'
            }`}
          >
            {acceptedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'completed'
              ? 'bg-[#183B2B] text-white shadow-xs'
              : 'text-[#4A5750] hover:text-[#183B2B]'
          }`}
        >
          <span>Completed</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'completed' ? 'bg-[#D95D39] text-white' : 'bg-[#DDD3C0] text-[#183B2B]'
            }`}
          >
            {completedList.length}
          </span>
        </button>
      </div>

      {/* 1. PENDING TAB */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingList.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#DDD3C0] space-y-3">
              <p className="font-serif-heading text-lg font-bold text-[#183B2B]">
                No pending exchange proposals right now
              </p>
              <p className="text-xs text-[#526059] max-w-sm mx-auto">
                Explore fictional profiles or use the AI Match Assistant to propose an exchange.
              </p>
              <button
                onClick={() => onNavigate('explore')}
                className="px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer"
              >
                Explore Skills to Propose
              </button>
            </div>
          ) : (
            pendingList.map((proposal) => (
              <div
                key={proposal.id}
                className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#DDD3C0] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE2D2]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif-heading text-xl font-bold text-[#183B2B]">
                        Proposed with {proposal.partnerName}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Awaiting Response
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7972]">{proposal.partnerLocation} • {proposal.format}</p>
                  </div>
                  <span className="text-[11px] text-[#7B8B83]">
                    Sent: {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#E0D7C6]">
                    <span className="text-[10px] font-bold uppercase text-[#183B2B] block">
                      You Offered to Teach:
                    </span>
                    <p className="font-semibold text-sm text-[#183B2B]">{proposal.userOfferedSkill}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E0D7C6]">
                    <span className="text-[10px] font-bold uppercase text-[#D95D39] block">
                      You Requested to Learn:
                    </span>
                    <p className="font-semibold text-sm text-[#183B2B]">{proposal.userRequestedSkill}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#46544D]">
                  <p><strong>Proposed Date & Time:</strong> {proposal.suggestedDateTime} ({proposal.duration})</p>
                  <p className="italic bg-white p-2.5 rounded-lg border border-[#EAE2D2]">
                    “{proposal.meetingNotes}”
                  </p>
                </div>

                {/* Simulated Partner Actions */}
                <div className="pt-3 border-t border-[#EAE2D2] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-[#718079]">
                    Simulate partner response in this interactive demo:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateProposalStatus(proposal.id, 'declined')}
                      className="px-3 py-1.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Simulate Decline (Demo)</span>
                    </button>
                    <button
                      onClick={() => onUpdateProposalStatus(proposal.id, 'accepted')}
                      className="px-4 py-1.5 rounded-xl bg-[#183B2B] text-white hover:bg-[#23503B] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D95D39]" />
                      <span>Simulate Accept (Demo)</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. ACCEPTED TAB */}
      {activeTab === 'accepted' && (
        <div className="space-y-4">
          {acceptedList.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#DDD3C0] space-y-3">
              <p className="font-serif-heading text-lg font-bold text-[#183B2B]">
                No accepted exchanges currently scheduled
              </p>
              <p className="text-xs text-[#526059] max-w-sm mx-auto">
                Once a proposal is accepted, your upcoming exchange session will appear here with prep guidelines.
              </p>
              <button
                onClick={() => onNavigate('matches')}
                className="px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer"
              >
                Find Compatible Matches
              </button>
            </div>
          ) : (
            acceptedList.map((proposal) => (
              <div
                key={proposal.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD3C0] shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE2D2]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif-heading text-xl font-bold text-[#183B2B]">
                        Confirmed Exchange with {proposal.partnerName}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                        Accepted & Confirmed
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7972]">{proposal.partnerLocation} • Format: {proposal.format}</p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white border border-[#DDD3C0] text-xs font-semibold text-[#183B2B]">
                    {proposal.duration} Session
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E0D7C6]">
                    <span className="text-[10px] font-bold uppercase text-[#183B2B] block mb-0.5">
                      Your Half: Teach {proposal.userOfferedSkill}
                    </span>
                    <p className="text-[#4C5B53]">
                      Prepare 2-3 practical tips or exercises to walk {proposal.partnerName.split(' ')[0]} through.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#E0D7C6]">
                    <span className="text-[10px] font-bold uppercase text-[#D95D39] block mb-0.5">
                      Their Half: Learn {proposal.userRequestedSkill}
                    </span>
                    <p className="text-[#4C5B53]">
                      Have your questions or practice goals ready to make the most of their guidance.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F6EFE3] text-xs space-y-1">
                  <div className="flex items-center gap-2 text-[#183B2B]">
                    <Calendar className="w-4 h-4 text-[#D95D39]" />
                    <span className="font-semibold">Scheduled Time:</span>
                    <span>{proposal.suggestedDateTime}</span>
                  </div>
                  <p className="text-[11px] text-[#606E66]">
                    Meeting Format: {proposal.format} {proposal.format === 'In-person' ? '(Public venue)' : '(Online Video)'}
                  </p>
                </div>

                {/* Simulation button */}
                <div className="pt-3 border-t border-[#EAE2D2] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-[#697972]">
                    Finished your meeting? Record what you learned:
                  </span>
                  <button
                    onClick={() => handleSimulateComplete(proposal)}
                    className="px-5 py-2 rounded-xl bg-[#183B2B] text-white hover:bg-[#23503B] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D95D39]" />
                    <span>Simulate Complete Session (Demo Action)</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. COMPLETED TAB */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedList.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#DDD3C0] space-y-3">
              <p className="font-serif-heading text-lg font-bold text-[#183B2B]">
                No completed exchanges yet
              </p>
              <p className="text-xs text-[#526059] max-w-sm mx-auto">
                When you complete an exchange, you can record a private reflection to lock in what you learned.
              </p>
            </div>
          ) : (
            completedList.map((proposal) => (
              <div
                key={proposal.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD3C0] shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE2D2]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif-heading text-xl font-bold text-[#183B2B]">
                        Completed Exchange with {proposal.partnerName}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                        Exchange Concluded
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7972]">
                      Traded: {proposal.userOfferedSkill} ⇄ {proposal.userRequestedSkill} ({proposal.duration})
                    </p>
                  </div>

                  <button
                    onClick={() => setReflectionTarget(proposal)}
                    className="px-3.5 py-1.5 rounded-xl border border-[#183B2B]/30 hover:border-[#183B2B] hover:bg-[#EFE7D8] text-[#183B2B] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#D95D39]" />
                    <span>{proposal.reflection ? 'Edit Reflection' : 'Add Reflection'}</span>
                  </button>
                </div>

                {/* Reflection display if present */}
                {proposal.reflection ? (
                  <div className="p-4 rounded-2xl bg-white border border-[#DDD3C0] space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#183B2B]">
                        <BookOpen className="w-4 h-4 text-[#D95D39]" />
                        <span>Private Reflection (Recorded {proposal.reflection.completedDate})</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-[#718079]">
                        <Lock className="w-3 h-3" />
                        Private note
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE2D2]">
                        <span className="text-[10px] font-bold uppercase text-[#183B2B] block mb-1">
                          What Went Well:
                        </span>
                        <p className="text-[#3E4D45]">{proposal.reflection.whatWentWell || '—'}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE2D2]">
                        <span className="text-[10px] font-bold uppercase text-[#183B2B] block mb-1">
                          Key Takeaway:
                        </span>
                        <p className="text-[#3E4D45]">{proposal.reflection.keyTakeaway || '—'}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE2D2]">
                        <span className="text-[10px] font-bold uppercase text-[#183B2B] block mb-1">
                          Next Time Notes:
                        </span>
                        <p className="text-[#3E4D45]">{proposal.reflection.notesForNextTime || '—'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#F6EFE3] border border-dashed border-[#DDD3C0] text-center space-y-2">
                    <p className="text-xs text-[#526059]">
                      You haven't added a private reflection for this completed exchange yet.
                    </p>
                    <button
                      onClick={() => setReflectionTarget(proposal)}
                      className="px-4 py-1.5 rounded-lg bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer"
                    >
                      Record Private Reflection
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Reflection Modal */}
      <ReflectionModal
        proposal={reflectionTarget}
        onClose={() => setReflectionTarget(null)}
        onSaveReflection={(id, reflection) => {
          onSaveReflection(id, reflection);
          setReflectionTarget(null);
        }}
      />
    </div>
  );
};
