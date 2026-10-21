import React, { useState } from 'react';
import {
  FictionalProfile,
  MatchAnalysis,
  UserProfile,
} from '../types';
import { FICTIONAL_PROFILES } from '../data/fictionalProfiles';
import { computeRuleBasedMatches } from '../utils/matching';
import {
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  Calendar,
  Clock,
  Compass,
  Laptop,
  HelpCircle,
  Loader2,
  RefreshCw,
  User,
  Info,
} from 'lucide-react';

interface MatchAssistantViewProps {
  userProfile: UserProfile;
  onNavigateToProfile: () => void;
  onProposeExchangeWithMatch: (match: MatchAnalysis, partnerProfile: FictionalProfile) => void;
}

export const MatchAssistantView: React.FC<MatchAssistantViewProps> = ({
  userProfile,
  onNavigateToProfile,
  onProposeExchangeWithMatch,
}) => {
  const [loading, setLoading] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchAnalysis[] | null>(null);
  const [generalAdvice, setGeneralAdvice] = useState<string>('');
  const [matchSource, setMatchSource] = useState<'gemini' | 'fallback' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFindMatches = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile,
          targetProfiles: FICTIONAL_PROFILES,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const resData = await response.json();

      if (resData.success && resData.source === 'gemini' && resData.data?.matches) {
        setMatchResults(resData.data.matches);
        setGeneralAdvice(resData.data.generalAdvice || '');
        setMatchSource('gemini');
      } else {
        // Fallback required or Gemini unconfigured
        const fallback = computeRuleBasedMatches(userProfile, FICTIONAL_PROFILES);
        setMatchResults(fallback.matches);
        setGeneralAdvice(fallback.generalAdvice);
        setMatchSource('fallback');
        if (resData.message) {
          console.info('Rule-based fallback used:', resData.message);
        }
      }
    } catch (err: any) {
      console.warn('Network or server error during AI match, using rule-based fallback:', err);
      // Deterministic rule-based fallback as explicitly required by prompt
      const fallback = computeRuleBasedMatches(userProfile, FICTIONAL_PROFILES);
      setMatchResults(fallback.matches);
      setGeneralAdvice(fallback.generalAdvice);
      setMatchSource('fallback');
      setErrorMessage(
        'The Gemini server endpoint was unreachable. Active matches are computed via the rule-based fallback engine.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getPartnerProfile = (profileId: string): FictionalProfile | undefined => {
    return FICTIONAL_PROFILES.find((p) => p.id === profileId);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header and Subheading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
            AI Match Assistant
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#183B2B]">
            Reciprocal Exchange Matching
          </h1>
          <p className="text-sm text-[#4E5B54]">
            Analyzes your profile against community members to find mutually beneficial, 1-to-1 learning partners.
          </p>
        </div>

        <button
          onClick={handleFindMatches}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[#183B2B] text-white font-semibold text-sm hover:bg-[#23503B] transition cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50 self-start sm:self-auto"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#D95D39]" />
              <span>Analyzing Profiles...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#D95D39]" />
              <span>{matchResults ? 'Re-Analyze Matches' : 'Find My Matches'}</span>
            </>
          )}
        </button>
      </div>

      {/* Current User Profile Snapshot Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183B2B]">
            <User className="w-4 h-4 text-[#D95D39]" />
            <span>Active Profile Being Matched: <strong>{userProfile.name || 'You'}</strong></span>
          </div>
          <button
            onClick={onNavigateToProfile}
            className="text-xs text-[#183B2B] hover:text-[#D95D39] underline font-medium cursor-pointer"
          >
            Edit Profile Preferences
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-[#E0D7C6]">
            <span className="text-[10px] uppercase font-bold text-[#63726A] block mb-1">
              You Offer to Teach:
            </span>
            <div className="flex flex-wrap gap-1">
              {userProfile.skillsOffered.length === 0 ? (
                <span className="text-gray-400 italic">None listed</span>
              ) : (
                userProfile.skillsOffered.map((s) => (
                  <span
                    key={s.name}
                    className="px-2 py-0.5 rounded bg-[#EFECE4] text-[#183B2B] font-semibold"
                  >
                    {s.name} ({s.level})
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#E0D7C6]">
            <span className="text-[10px] uppercase font-bold text-[#63726A] block mb-1">
              You Want to Learn:
            </span>
            <div className="flex flex-wrap gap-1">
              {userProfile.skillsWanted.length === 0 ? (
                <span className="text-gray-400 italic">None listed</span>
              ) : (
                userProfile.skillsWanted.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-white border border-[#DDD3C0] text-[#183B2B] font-medium"
                  >
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#E0D7C6]">
            <span className="text-[10px] uppercase font-bold text-[#63726A] block mb-1">
              Preferences & Availability:
            </span>
            <p className="text-[#3F4D46] line-clamp-2">
              <strong>Format:</strong> {userProfile.format} •{' '}
              <strong>Times:</strong> {userProfile.availability.join(', ') || 'Any'}
            </p>
          </div>
        </div>
      </div>

      {/* Match Engine Status Indicator */}
      {matchSource && (
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed ${
            matchSource === 'gemini'
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/90 border-amber-300 text-amber-950'
          }`}
        >
          {matchSource === 'gemini' ? (
            <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <strong className="font-bold">
                {matchSource === 'gemini'
                  ? 'AI Match Analysis — Powered by Gemini 3.8 Flash'
                  : 'Rule-Based Fallback Matching Active'}
              </strong>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-mono uppercase bg-white/70 border border-current">
                {matchSource === 'gemini' ? 'Grounded AI' : 'Deterministic Logic'}
              </span>
            </div>
            <p>
              {matchSource === 'gemini'
                ? 'Analysis strictly grounded in profile data. Qualifications, availability, and session agendas are derived exclusively from profile facts without inventing scores.'
                : 'The Gemini API is unconfigured or offline. Matches are evaluated deterministically using reciprocal skill crossover, meeting formats, and schedule overlap.'}
            </p>
          </div>
        </div>
      )}

      {/* General Advice Banner */}
      {generalAdvice && (
        <div className="p-4 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] text-xs text-[#3E4C45] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#D95D39] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-[#183B2B] block mb-0.5">
              Community Alignment Assessment:
            </strong>
            <span>{generalAdvice}</span>
          </div>
        </div>
      )}

      {/* Initial Empty State before clicking Find Matches */}
      {!matchResults && !loading && (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#DDD3C0] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EFE7D8] text-[#183B2B] flex items-center justify-center mx-auto">
            <ArrowRightLeft className="w-7 h-7 text-[#D95D39]" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
              Ready to find your complementary exchange?
            </h2>
            <p className="text-xs text-[#526059]">
              Click <strong>“Find My Matches”</strong> above. We will compare your skills and schedule with all 8 fictional profiles to find the most balanced trades.
            </p>
          </div>
          <button
            onClick={handleFindMatches}
            className="px-6 py-2.5 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer shadow-xs"
          >
            Run Match Analysis Now
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] animate-pulse space-y-4"
            >
              <div className="h-6 w-1/3 bg-[#E8DEC8] rounded"></div>
              <div className="h-4 w-3/4 bg-[#E8DEC8] rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-[#E8DEC8] rounded-xl"></div>
                <div className="h-16 bg-[#E8DEC8] rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top 3 Match Cards */}
      {matchResults && !loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-heading text-2xl font-bold text-[#183B2B]">
              Top 3 Promising Exchanges
            </h2>
            <span className="text-xs text-[#606E67]">
              Ranked by reciprocal fit & availability
            </span>
          </div>

          <div className="space-y-6">
            {matchResults.map((match, idx) => {
              const partner = getPartnerProfile(match.profileId);
              return (
                <div
                  key={match.profileId || idx}
                  className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD3C0] shadow-xs hover:border-[#183B2B]/40 transition space-y-6"
                >
                  {/* Match Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAE2D2]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-serif-heading font-bold text-sm shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif-heading text-xl font-bold text-[#183B2B]">
                            {match.partnerName}
                          </h3>
                          {partner && (
                            <span className="text-[11px] text-[#697972]">
                              ({partner.location} • {partner.format})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#525F58]">
                          {partner?.roleHeadline || 'Fictional community member'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => partner && onProposeExchangeWithMatch(match, partner)}
                      className="px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 text-[#D95D39]" />
                      <span>Propose This Exchange</span>
                    </button>
                  </div>

                  {/* Bidirectional Trade Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-[#E3DAC8] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#183B2B] block">
                        What You Teach {match.partnerName.split(' ')[0]}:
                      </span>
                      <p className="text-sm font-semibold text-[#183B2B]">{match.userTeaches}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E3DAC8] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95D39] block">
                        What {match.partnerName.split(' ')[0]} Teaches You:
                      </span>
                      <p className="text-sm font-semibold text-[#183B2B]">{match.userLearns}</p>
                    </div>
                  </div>

                  {/* Detailed Analysis Breakdown */}
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-3.5 rounded-xl bg-[#F6EFE3] border border-[#E0D7C6]">
                      <strong className="font-bold text-[#183B2B] block mb-0.5">
                        Why Your Skills Fit:
                      </strong>
                      <span className="text-[#3D4B44]">{match.skillFitExplanation}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F6EFE3] border border-[#E0D7C6]">
                      <strong className="font-bold text-[#183B2B] block mb-0.5">
                        Format & Availability Alignment:
                      </strong>
                      <span className="text-[#3D4B44]">{match.formatAndAvailabilityAlignment}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F6EFE3] border border-[#E0D7C6]">
                      <strong className="font-bold text-[#183B2B] block mb-0.5">
                        Potential Conflicts or Items to Clarify:
                      </strong>
                      <span className="text-[#3D4B44]">{match.potentialConflictsOrMissingInfo}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#D5CABB] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#D95D39]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Suggested First-Session Plan (60 min):</span>
                      </div>
                      <p className="text-xs text-[#35433C]">{match.suggestedFirstSessionPlan}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
