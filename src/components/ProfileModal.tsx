import React from 'react';
import { FictionalProfile } from '../types';
import {
  X,
  MapPin,
  Clock,
  Sparkles,
  ArrowRightLeft,
  Shield,
  Laptop,
  CheckCircle2,
} from 'lucide-react';

interface ProfileModalProps {
  profile: FictionalProfile | null;
  onClose: () => void;
  onProposeExchange: (profile: FictionalProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onClose,
  onProposeExchange,
}) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-[#FAF7F2] rounded-3xl border border-[#DDD3C0] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-profile-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5B6962] hover:text-[#183B2B] hover:bg-[#EFE7D8] transition cursor-pointer"
          aria-label="Close Profile Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-start gap-4 pr-8">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif-heading font-bold text-xl shadow-xs shrink-0 ${profile.avatarColor}`}
          >
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="modal-profile-title"
                className="font-serif-heading text-2xl font-bold text-[#183B2B]"
              >
                {profile.name}
              </h2>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#183B2B]/10 text-[#183B2B]">
                Fictional Member
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#48554E] font-medium">{profile.roleHeadline}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7972] mt-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5" />
                Format: {profile.format}
              </span>
            </div>
          </div>
        </div>

        {/* Bio / Introduction */}
        <div className="p-4 rounded-2xl bg-white border border-[#E3DAC8] space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#183B2B]">
            About {profile.name.split(' ')[0]}
          </span>
          <p className="text-sm text-[#38453E] leading-relaxed">{profile.intro}</p>
        </div>

        {/* Skills Two-Way Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Can Teach */}
          <div className="p-4 rounded-2xl bg-[#EFECE5] border border-[#DDD3C0] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183B2B] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#183B2B]"></span>
              Can Teach You
            </span>
            <div className="space-y-1.5">
              {profile.skillsOffered.map((s) => (
                <div
                  key={s.name}
                  className="p-2 rounded-xl bg-white border border-[#DDD3C0] flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#183B2B]">{s.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4F5D56] font-medium text-[11px]">
                    {s.level} level
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wants to Learn */}
          <div className="p-4 rounded-2xl bg-[#EFECE5] border border-[#DDD3C0] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D95D39]"></span>
              Looking to Learn
            </span>
            <div className="space-y-1.5">
              {profile.skillsWanted.map((s) => (
                <div
                  key={s}
                  className="p-2 rounded-xl bg-white border border-[#DDD3C0] text-xs font-medium text-[#183B2B]"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Availability & First Session Topic */}
        <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#E3DAC8]">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#D95D39] mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#183B2B] block">Typical Availability:</span>
              <p className="text-xs text-[#525F58] mt-0.5">{profile.availability.join(' • ')}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#EFECE5] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#183B2B] mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#183B2B] block">Sample First Exchange Topic:</span>
              <p className="text-xs text-[#525F58] mt-0.5">{profile.sampleTopic}</p>
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div className="p-3 rounded-xl bg-[#F6EFE3] border border-[#E0D7C6] flex items-center gap-2.5 text-xs text-[#55635C]">
          <Shield className="w-4 h-4 text-[#D95D39] shrink-0" />
          <span>
            First time exchanging? Agree on a simple 45-60 minute structured agenda and meet online or in a public space.
          </span>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#48554E] hover:bg-[#EFE7D8] transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onProposeExchange(profile);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <ArrowRightLeft className="w-4 h-4 text-[#D95D39]" />
            <span>Propose Exchange with {profile.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
