import React, { useState } from 'react';
import { Proposal, ProposalReflection } from '../types';
import { X, BookOpen, CheckCircle2, Lock } from 'lucide-react';

interface ReflectionModalProps {
  proposal: Proposal | null;
  onClose: () => void;
  onSaveReflection: (proposalId: string, reflection: ProposalReflection) => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  proposal,
  onClose,
  onSaveReflection,
}) => {
  if (!proposal) return null;

  const existing = proposal.reflection;

  const [whatWentWell, setWhatWentWell] = useState(
    existing?.whatWentWell || ''
  );
  const [keyTakeaway, setKeyTakeaway] = useState(
    existing?.keyTakeaway || ''
  );
  const [notesForNextTime, setNotesForNextTime] = useState(
    existing?.notesForNextTime || ''
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const reflection: ProposalReflection = {
      completedDate: existing?.completedDate || new Date().toISOString().split('T')[0],
      whatWentWell: whatWentWell.trim(),
      keyTakeaway: keyTakeaway.trim(),
      notesForNextTime: notesForNextTime.trim(),
    };
    onSaveReflection(proposal.id, reflection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-[#FAF7F2] rounded-3xl border border-[#DDD3C0] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reflection-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5B6962] hover:text-[#183B2B] hover:bg-[#EFE7D8] transition cursor-pointer"
          aria-label="Close Reflection Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-[#D95D39]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95D39]">
                Private Journal
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#697972] bg-white border border-[#DDD3C0] px-1.5 py-0.2 rounded-full">
                <Lock className="w-2.5 h-2.5" />
                Only you can see this
              </span>
            </div>
            <h2 id="reflection-title" className="font-serif-heading text-xl font-bold text-[#183B2B]">
              Session Reflection
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#525F58]">
          Exchange with <strong>{proposal.partnerName}</strong> (You taught{' '}
          <em>{proposal.userOfferedSkill}</em>, learned <em>{proposal.userRequestedSkill}</em>).
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
              What went well during this exchange?
            </label>
            <textarea
              rows={2}
              value={whatWentWell}
              onChange={(e) => setWhatWentWell(e.target.value)}
              placeholder="e.g. Partner was very patient with pronunciation; we kept to the 30-minute split well."
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
              What was the biggest takeaway or new skill?
            </label>
            <textarea
              rows={2}
              value={keyTakeaway}
              onChange={(e) => setKeyTakeaway(e.target.value)}
              placeholder="e.g. Learned how to use XLOOKUP instead of nested IFs, and practiced 5 travel phrases."
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
              Notes or goals for your next exchange:
            </label>
            <textarea
              rows={2}
              value={notesForNextTime}
              onChange={(e) => setNotesForNextTime(e.target.value)}
              placeholder="e.g. Have a Google Sheet template ready before the session starts."
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#48554E] hover:bg-[#EFE7D8] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D95D39]" />
              <span>Save Private Reflection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
