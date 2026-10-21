import React from 'react';
import {
  ArrowRightLeft,
  Sparkles,
  Shield,
  Clock,
  BookOpen,
  Coffee,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Users,
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (tab: string) => void;
  onTryAlex: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onNavigate,
  onTryAlex,
}) => {
  return (
    <div className="space-y-12 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
          The SkillSwap Philosophy
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#183B2B]">
          How Skill Exchanges Work
        </h1>
        <p className="text-sm text-[#4E5B54]">
          Learning doesn’t have to require money or tuition. When two people trade complementary knowledge, both walk away empowered.
        </p>
      </div>

      {/* The 4 Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-xl">
            1
          </div>
          <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
            Share what you can teach
          </h2>
          <p className="text-xs sm:text-sm text-[#48564F] leading-relaxed">
            You don’t need a university teaching degree. Practical, everyday skills are immensely valuable—whether you know how to build pivot tables in Excel, make authentic sourdough, play basic guitar chords, or speak conversational Portuguese.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-xl">
            2
          </div>
          <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
            Find someone whose skills complement yours
          </h2>
          <p className="text-xs sm:text-sm text-[#48564F] leading-relaxed">
            Direct reciprocity is at the heart of SkillSwap. Use our directory or the AI Match Assistant to find partners whose learning goals match your teaching strengths, and vice-versa, while aligning on schedule and meeting preferences.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-xl">
            3
          </div>
          <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
            Agree on a fair exchange
          </h2>
          <p className="text-xs sm:text-sm text-[#48564F] leading-relaxed">
            Keep sessions simple and balanced. A typical exchange lasts 60 minutes: 25 minutes focused on one person's skill, a brief 5-minute breather, and 25 minutes on the other person's skill. Setting mutual expectations guarantees a fair partnership.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-xl">
            4
          </div>
          <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
            Learn together
          </h2>
          <p className="text-xs sm:text-sm text-[#48564F] leading-relaxed">
            Meet via online video call or in a welcoming public space. There is no performance anxiety or grades—just two peers helping one another. After the session, record a private reflection to lock in what you discovered.
          </p>
        </div>
      </div>

      {/* Safety & Etiquette Guide */}
      <section className="rounded-3xl bg-[#183B2B] text-[#FAF7F2] p-8 sm:p-10 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D95D39] text-white flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-heading text-2xl font-bold">
              Community Safety & Etiquette Guidance
            </h2>
            <p className="text-xs text-[#C6D8CE]">
              Guidelines for safe, courteous, and productive peer exchanges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#214F3B] border border-[#2D664E] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E8A58D]">
              <CheckCircle2 className="w-4 h-4 text-[#D95D39]" />
              <span>Agree on Expectations</span>
            </div>
            <p className="text-xs text-[#B8CCC2] leading-relaxed">
              Agree in advance on the duration, specific topics to cover, and skill level. Being upfront avoids surprises or mismatched expectations during the session.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#214F3B] border border-[#2D664E] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E8A58D]">
              <CheckCircle2 className="w-4 h-4 text-[#D95D39]" />
              <span>Avoid Sharing Sensitive Info</span>
            </div>
            <p className="text-xs text-[#B8CCC2] leading-relaxed">
              Never share financial information, passwords, bank accounts, or home addresses. Only broad city locations are ever necessary for organizing an exchange.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#214F3B] border border-[#2D664E] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E8A58D]">
              <CheckCircle2 className="w-4 h-4 text-[#D95D39]" />
              <span>Choose a Public Place</span>
            </div>
            <p className="text-xs text-[#B8CCC2] leading-relaxed">
              For any in-person meetings, always choose a busy, well-lit public space—such as a municipal library study room, coffee shop, or community center.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#142E22] border border-[#23503B] flex items-start gap-3 text-xs text-[#A1B8AD]">
          <AlertTriangle className="w-5 h-5 text-[#E8A58D] shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer on Member Profiles:</strong> Profiles presented in this demo are fictional. In real-world peer exchange communities, profiles are not identity-verified by default. Always exercise personal discretion and adhere to community guidelines.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-6">
        <h2 className="font-serif-heading text-2xl font-bold text-[#183B2B]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-[#3E4C45]">
          <div className="p-4 rounded-2xl bg-white border border-[#DDD3C0] space-y-1">
            <h3 className="font-bold text-[#183B2B] text-sm">
              What if my skill level is much lower than my partner’s?
            </h3>
            <p className="text-[#55645D]">
              That is completely fine! SkillSwap is built on mutual goodwill, not professional consulting fees. Even if you are an intermediate Excel user helping an absolute beginner, your time is equally valuable.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DDD3C0] space-y-1">
            <h3 className="font-bold text-[#183B2B] text-sm">
              How does the AI Match Assistant help?
            </h3>
            <p className="text-[#55645D]">
              Our matching assistant analyzes what you teach against what others want, and what they teach against what you want, while checking format and time overlaps. If an exact match is missing, it provides suggestions on which preference to broaden.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DDD3C0] space-y-1">
            <h3 className="font-bold text-[#183B2B] text-sm">
              Can we organize multiple sessions with the same partner?
            </h3>
            <p className="text-[#55645D]">
              Yes! If your first 60-minute session goes well and you both enjoyed the swap, you can propose follow-up exchanges anytime to continue learning together.
            </p>
          </div>
        </div>

        {/* CTA to test Alex or Explore */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#DDD3C0]">
          <span className="text-xs text-[#63726A]">Ready to test the demo exchange?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onTryAlex}
              className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#183B2B]/30 hover:bg-[#EFE7D8] text-[#183B2B] text-xs font-semibold transition cursor-pointer"
            >
              Load Demo Alex Profile
            </button>
            <button
              onClick={() => onNavigate('matches')}
              className="px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer shadow-xs"
            >
              Find Matches Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
