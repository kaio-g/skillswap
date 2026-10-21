import React from 'react';
import {
  ArrowRightLeft,
  Sparkles,
  Compass,
  CheckCircle,
  Shield,
  Clock,
  BookOpen,
  Coffee,
  HelpCircle,
  FileSpreadsheet,
  Languages,
  Utensils,
  Camera,
  Music,
  FileText,
  Laptop,
} from 'lucide-react';
import { ALL_OFFERED_SKILL_NAMES } from '../data/fictionalProfiles';
import { HeroIllustration } from './HeroIllustration';
import { ConceptIllustration } from './ConceptIllustration';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onTryAlex: () => void;
  onSelectSkillFilter: (skill: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onTryAlex,
  onSelectSkillFilter,
}) => {
  const skillIcons: Record<string, React.ReactNode> = {
    'English conversation': <Languages className="w-5 h-5 text-[#183B2B]" />,
    'Portuguese conversation': <Languages className="w-5 h-5 text-[#245B45]" />,
    'Excel': <FileSpreadsheet className="w-5 h-5 text-[#183B2B]" />,
    'Photography': <Camera className="w-5 h-5 text-[#D95D39]" />,
    'Cooking': <Utensils className="w-5 h-5 text-[#C24E2A]" />,
    'Guitar': <Music className="w-5 h-5 text-[#183B2B]" />,
    'Resume writing': <FileText className="w-5 h-5 text-[#245B45]" />,
    'Basic computer support': <Laptop className="w-5 h-5 text-[#183B2B]" />,
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-radial from-[#F3ECE1] to-[#EAE0CF] border border-[#DDD3C0] p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#D95D39]/10 to-transparent pointer-events-none rounded-full blur-2xl -mr-20 -mt-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Headline, Subheading, and Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fictional Profiles Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#183B2B] text-[#FAF7F2] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D95D39]"></span>
              <span>Interactive Demo — Fictional Profiles</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#183B2B] tracking-tight leading-[1.12]">
              You have something to teach. <br className="hidden sm:inline" />
              <span className="text-[#D95D39]">Someone has something you need.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#3C4741] leading-relaxed">
              SkillSwap is a cashless exchange where people share practical knowledge directly.
              No tuition fees, no hourly bills, and no complicated credit systems—just reciprocal, one-to-one learning.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('matches')}
                className="px-6 py-3.5 rounded-xl bg-[#183B2B] text-[#FAF7F2] font-semibold text-base shadow-md hover:bg-[#23503B] hover:shadow-lg transition cursor-pointer flex items-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-[#D95D39] group-hover:rotate-12 transition" />
                <span>Find Your Exchange</span>
              </button>

              <button
                onClick={() => onNavigate('explore')}
                className="px-6 py-3.5 rounded-xl bg-[#FAF7F2] text-[#183B2B] font-semibold text-base border border-[#183B2B]/25 hover:bg-[#EFE7D8] hover:border-[#183B2B] transition cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <Compass className="w-5 h-5 text-[#3C4741]" />
                <span>Explore Skills</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration (Beside headline on desktop, below on mobile) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroIllustration />
          </div>
        </div>

        {/* Real-world exchange callout card */}
        <div className="mt-10 pt-8 border-t border-[#DDD3C0] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#D5CABB] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D95D39] mb-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>The Reciprocal Exchange Idea</span>
            </div>
            <p className="font-serif-heading text-lg font-medium text-[#183B2B] italic">
              “I can help you with Excel for one hour, and you can help me practice conversational English for one hour.”
            </p>
            <p className="text-xs text-[#556059] mt-2">
              Both parties invest time equally. Knowledge is traded directly with genuine peer-to-peer respect.
            </p>
          </div>

          <div className="bg-[#183B2B] text-[#FAF7F2] p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E8A58D]">
                  Demo Walkthrough Profile
                </span>
                <span className="text-[10px] bg-[#FAF7F2]/15 px-2 py-0.5 rounded font-mono">
                  Ready to test
                </span>
              </div>
              <p className="text-sm text-[#E0E9E4]">
                <strong>Alex’s Profile:</strong> Offers basic Excel help & wants conversational English practice. Available Tuesday & Thursday evenings (Online).
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#A3B8AD]">Click to load & test matching:</span>
              <button
                onClick={onTryAlex}
                className="px-3.5 py-1.5 rounded-lg bg-[#D95D39] text-white text-xs font-semibold hover:bg-[#C24E2A] transition cursor-pointer shadow-xs"
              >
                Try Alex’s Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Concept Illustration */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
            Visual Concept • Cashless Skill Exchange
          </span>
          <span className="text-xs text-[#63726A] hidden sm:inline">
            Mutual peer-to-peer knowledge sharing
          </span>
        </div>
        <ConceptIllustration />
      </section>

      {/* Featured Skills Carousel / Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#183B2B]">
              Explore Everyday Knowledge
            </h2>
            <p className="text-sm text-[#4E5B54]">
              Real skills our fictional community members can teach and want to learn today:
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-[#183B2B] hover:text-[#D95D39] flex items-center gap-1 underline decoration-dotted transition"
          >
            View all 8 fictional profiles →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {ALL_OFFERED_SKILL_NAMES.map((skill) => (
            <div
              key={skill}
              onClick={() => {
                onSelectSkillFilter(skill);
                onNavigate('explore');
              }}
              className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E3DAC8] hover:border-[#183B2B] hover:bg-[#F4ECE0] transition cursor-pointer group shadow-2xs flex flex-col justify-between h-28"
            >
              <div className="p-2 rounded-lg bg-[#EFE7D8] w-fit group-hover:bg-[#FAF7F2] transition">
                {skillIcons[skill] || <BookOpen className="w-5 h-5 text-[#183B2B]" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#183B2B] group-hover:text-[#D95D39] transition">
                  {skill}
                </p>
                <span className="text-[11px] text-[#63726A]">Search partners →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
            The SkillSwap Process
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#183B2B]">
            How Direct Skill Exchanges Work
          </h2>
          <p className="text-sm text-[#556059]">
            Four straightforward principles make learning rewarding, equitable, and sustainable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-lg">
              1
            </div>
            <h3 className="font-semibold text-base text-[#183B2B]">Share what you can teach</h3>
            <p className="text-xs text-[#4F5C55] leading-relaxed">
              List the skills you feel comfortable guiding someone through—from Excel lookups to sourdough baking or acoustic guitar chords.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-lg">
              2
            </div>
            <h3 className="font-semibold text-base text-[#183B2B]">Find complementary fits</h3>
            <p className="text-xs text-[#4F5C55] leading-relaxed">
              Discover someone who wants what you offer and teaches what you are eager to learn, matching schedules and format preferences.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-lg">
              3
            </div>
            <h3 className="font-semibold text-base text-[#183B2B]">Agree on a fair exchange</h3>
            <p className="text-xs text-[#4F5C55] leading-relaxed">
              Propose a 45 or 60-minute session. Split the time equally: half on your topic, half on theirs, with clear expectations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-lg">
              4
            </div>
            <h3 className="font-semibold text-base text-[#183B2B]">Learn together</h3>
            <p className="text-xs text-[#4F5C55] leading-relaxed">
              Meet online via video or in a public space. Afterwards, jot down a private reflection to solidify what you learned.
            </p>
          </div>
        </div>
      </section>

      {/* Safety & Community Etiquette Guidance */}
      <section className="rounded-2xl bg-[#183B2B] text-[#FAF7F2] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Shield className="w-6 h-6 text-[#D95D39]" />
          <h3 className="font-serif-heading text-xl font-bold">
            Community Etiquette & Safety Reminders
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#D3DFD9] leading-relaxed">
          Skill exchanges thrive on mutual respect and healthy boundaries. Keep these three core safety guidelines in mind:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#214F3B] p-4 rounded-xl border border-[#2D664E] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A58D]">
              <CheckCircle className="w-4 h-4 text-[#D95D39]" />
              <span>Agree on Expectations</span>
            </div>
            <p className="text-xs text-[#B8CCC2]">
              Clarify skill level and agenda beforehand so neither person feels overwhelmed or underprepared.
            </p>
          </div>

          <div className="bg-[#214F3B] p-4 rounded-xl border border-[#2D664E] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A58D]">
              <CheckCircle className="w-4 h-4 text-[#D95D39]" />
              <span>Protect Sensitive Data</span>
            </div>
            <p className="text-xs text-[#B8CCC2]">
              Never share financial details, home addresses, or private credentials during skill exchanges.
            </p>
          </div>

          <div className="bg-[#214F3B] p-4 rounded-xl border border-[#2D664E] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A58D]">
              <CheckCircle className="w-4 h-4 text-[#D95D39]" />
              <span>Meet in Public Places</span>
            </div>
            <p className="text-xs text-[#B8CCC2]">
              For any in-person sessions, always pick a well-lit public venue like a library study room or coffee shop.
            </p>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-[#A1B8AD] border-t border-[#265741] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>* Notice: Fictional demo environment. In real-world platforms, profiles are unverified.</span>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="text-white hover:text-[#E8A58D] underline transition"
          >
            Read the complete safety guide →
          </button>
        </div>
      </section>
    </div>
  );
};
