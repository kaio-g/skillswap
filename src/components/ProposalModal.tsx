import React, { useState, useEffect } from 'react';
import {
  FictionalProfile,
  MeetingFormat,
  Proposal,
  UserProfile,
} from '../types';
import {
  X,
  ArrowRightLeft,
  Calendar,
  Clock,
  Laptop,
  CheckCircle2,
  Shield,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface ProposalModalProps {
  partner: FictionalProfile | null;
  userProfile: UserProfile;
  initialOfferedSkill?: string;
  initialRequestedSkill?: string;
  onClose: () => void;
  onSubmitProposal: (proposal: Proposal) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  partner,
  userProfile,
  initialOfferedSkill = '',
  initialRequestedSkill = '',
  onClose,
  onSubmitProposal,
}) => {
  if (!partner) return null;

  const [step, setStep] = useState<'form' | 'summary'>('form');

  // Form State
  const [offeredSkill, setOfferedSkill] = useState(
    initialOfferedSkill || userProfile.skillsOffered[0]?.name || ''
  );
  const [requestedSkill, setRequestedSkill] = useState(
    initialRequestedSkill || partner.skillsOffered[0]?.name || ''
  );
  const [duration, setDuration] = useState('60 minutes');
  const [suggestedDateTime, setSuggestedDateTime] = useState('');
  const [format, setFormat] = useState<'Online' | 'In-person'>(
    partner.format === 'In-person' ? 'In-person' : 'Online'
  );
  const [meetingNotes, setMeetingNotes] = useState(
    `Hi ${partner.name.split(' ')[0]}! I would love to trade knowledge with you. I can guide you through ${
      offeredSkill || 'my skills'
    }, and I'm excited to learn ${requestedSkill || 'from you'}. Looking forward to connecting!`
  );

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update default notes when skills change
  useEffect(() => {
    if (offeredSkill && requestedSkill) {
      setMeetingNotes(
        `Hi ${partner.name.split(' ')[0]}! I would love to organize a 1-to-1 skill exchange. I can help you with ${offeredSkill}, and I'd love to learn ${requestedSkill} in return. Looking forward to connecting!`
      );
    }
  }, [offeredSkill, requestedSkill, partner.name]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!offeredSkill.trim()) {
      newErrors.offeredSkill = 'Please select a skill you can offer.';
    }
    if (!requestedSkill.trim()) {
      newErrors.requestedSkill = 'Please select a skill you want to learn.';
    }
    if (!suggestedDateTime.trim()) {
      newErrors.suggestedDateTime = 'Please propose a suggested date and time (e.g. Next Tuesday at 7:00 PM).';
    }
    if (!meetingNotes.trim()) {
      newErrors.meetingNotes = 'Please write a brief note introducing your learning goals.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('summary');
    }
  };

  const handleFinalSubmit = () => {
    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      partnerId: partner.id,
      partnerName: partner.name,
      partnerLocation: partner.location,
      partnerFormat: partner.format,
      userOfferedSkill: offeredSkill,
      userRequestedSkill: requestedSkill,
      duration,
      suggestedDateTime,
      format,
      meetingNotes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    onSubmitProposal(newProposal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-[#FAF7F2] rounded-3xl border border-[#DDD3C0] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5B6962] hover:text-[#183B2B] hover:bg-[#EFE7D8] transition cursor-pointer"
          aria-label="Close Proposal Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-6 h-6 text-[#D95D39]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95D39]">
              {step === 'form' ? 'Step 1 of 2: Proposal Details' : 'Step 2 of 2: Confirmation Summary'}
            </span>
            <h2
              id="proposal-modal-title"
              className="font-serif-heading text-2xl font-bold text-[#183B2B]"
            >
              Propose Exchange with {partner.name}
            </h2>
          </div>
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleProceedToSummary} className="space-y-5">
            {/* Partner Snapshot */}
            <div className="p-3.5 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] text-xs flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#183B2B]">{partner.name}</span>
                <span className="text-[#55635C]"> ({partner.location})</span>
                <p className="text-[#697972] text-[11px] mt-0.5">
                  Available: {partner.availability.join(', ')}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-[#DDD3C0] text-[#183B2B]">
                {partner.format}
              </span>
            </div>

            {/* Reciprocal Skills Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Skill Offered */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183B2B]">
                  Skill You Will Teach <span className="text-[#D95D39]">*</span>
                </label>
                <select
                  value={offeredSkill}
                  onChange={(e) => setOfferedSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                >
                  <option value="">Select a skill you offer...</option>
                  {userProfile.skillsOffered.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.level} level)
                    </option>
                  ))}
                  {/* Allow custom typing if needed */}
                  <option value="General mentoring">General peer mentoring</option>
                </select>
                {errors.offeredSkill && (
                  <p className="text-[11px] text-red-600">{errors.offeredSkill}</p>
                )}
              </div>

              {/* Skill Requested */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D95D39]">
                  Skill You Want to Learn <span className="text-[#D95D39]">*</span>
                </label>
                <select
                  value={requestedSkill}
                  onChange={(e) => setRequestedSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                >
                  <option value="">Select from {partner.name.split(' ')[0]}'s skills...</option>
                  {partner.skillsOffered.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.level} level)
                    </option>
                  ))}
                </select>
                {errors.requestedSkill && (
                  <p className="text-[11px] text-red-600">{errors.requestedSkill}</p>
                )}
              </div>
            </div>

            {/* Duration & Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
                  Session Duration <span className="text-[#D95D39]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['45 minutes', '60 minutes', '90 minutes'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border cursor-pointer transition text-center ${
                        duration === d
                          ? 'bg-[#183B2B] text-white border-[#183B2B]'
                          : 'bg-white text-[#3E4D45] border-[#DDD3C0] hover:border-[#183B2B]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
                  Format <span className="text-[#D95D39]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'Online' as const, label: 'Online Video' },
                    { val: 'In-person' as const, label: 'In-Person (Public)' },
                  ].map((f) => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => setFormat(f.val)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border cursor-pointer transition text-center ${
                        format === f.val
                          ? 'bg-[#183B2B] text-white border-[#183B2B]'
                          : 'bg-white text-[#3E4D45] border-[#DDD3C0] hover:border-[#183B2B]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Date & Time */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
                Suggested Date & Time <span className="text-[#D95D39]">*</span>
              </label>
              <input
                type="text"
                value={suggestedDateTime}
                onChange={(e) => setSuggestedDateTime(e.target.value)}
                placeholder="e.g. Next Tuesday at 7:00 PM EST or Saturday morning at 10:00 AM"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
              />
              {errors.suggestedDateTime && (
                <p className="text-[11px] text-red-600">{errors.suggestedDateTime}</p>
              )}

              {/* Quick suggestions chips from partner availability */}
              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-[#6E7B74]">Quick pick from availability:</span>
                {partner.availability.slice(0, 3).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSuggestedDateTime(`Upcoming ${slot} at 7:00 PM`)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFECE4] text-[#34423B] hover:bg-[#E5DFD4] transition"
                  >
                    + {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Introduction / Message Note */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
                Short Introduction / Meeting Note <span className="text-[#D95D39]">*</span>
              </label>
              <textarea
                rows={3}
                value={meetingNotes}
                onChange={(e) => setMeetingNotes(e.target.value)}
                placeholder="Write a brief introduction and what specific topics you'd like to cover..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
              />
              {errors.meetingNotes && (
                <p className="text-[11px] text-red-600">{errors.meetingNotes}</p>
              )}
            </div>

            {/* Public Safety Reminder */}
            {format === 'In-person' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
                <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Safety Reminder:</strong> For in-person meetings, always choose a public, well-lit place such as a public library or local cafe. Never meet at private residences for first exchanges.
                </span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#48554E] hover:bg-[#EFE7D8] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer shadow-sm"
              >
                Review Proposal Summary →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: CONFIRMATION SUMMARY */}
        {step === 'summary' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-white border border-[#DDD3C0] space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFECE5]">
                <span className="font-bold text-sm text-[#183B2B]">Exchange Agreement Terms</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Ready to Propose
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F6EFE3]">
                  <span className="text-[10px] font-bold uppercase text-[#183B2B] block mb-0.5">
                    You Will Teach:
                  </span>
                  <p className="font-semibold text-sm text-[#183B2B]">{offeredSkill}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F6EFE3]">
                  <span className="text-[10px] font-bold uppercase text-[#D95D39] block mb-0.5">
                    {partner.name.split(' ')[0]} Will Teach:
                  </span>
                  <p className="font-semibold text-sm text-[#183B2B]">{requestedSkill}</p>
                </div>
              </div>

              <div className="space-y-2 text-[#46534C] pt-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D95D39]" />
                  <span>
                    <strong>Duration:</strong> {duration} (approx. {parseInt(duration) / 2} mins each)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#183B2B]" />
                  <span>
                    <strong>Suggested Timing:</strong> {suggestedDateTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#183B2B]" />
                  <span>
                    <strong>Meeting Format:</strong> {format} (Partner location: {partner.location})
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EFECE5]">
                  <strong className="block text-[10px] uppercase font-bold text-[#64726B] mb-1">
                    Introduction Message Preview:
                  </strong>
                  <p className="p-2.5 rounded-lg bg-[#FAF7F2] text-[#34403A] italic">
                    “{meetingNotes}”
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Simulation Notice */}
            <div className="p-3.5 rounded-xl bg-[#EFECE4] border border-[#DDD3C0] text-xs text-[#526059] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#183B2B] block">Simulated Local Proposal:</strong>
                <span>
                  This proposal will be stored in your local browser dashboard under <strong>My Exchanges &gt; Pending</strong>.
                  No real emails or external messages are sent. You can simulate partner acceptance on the dashboard!
                </span>
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#EAE2D2]">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#48554E] hover:bg-[#EFE7D8] transition cursor-pointer"
              >
                ← Back to Edit
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D95D39]" />
                <span>Confirm & Send Proposal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
