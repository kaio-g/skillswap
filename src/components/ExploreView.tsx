import React, { useState, useMemo } from 'react';
import { FictionalProfile, MeetingFormat } from '../types';
import {
  FICTIONAL_PROFILES,
  ALL_OFFERED_SKILL_NAMES,
  AVAILABILITY_OPTIONS,
} from '../data/fictionalProfiles';
import { ProfileModal } from './ProfileModal';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Laptop,
  ArrowRightLeft,
  Eye,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ExploreViewProps {
  initialOfferedFilter?: string;
  onProposeExchange: (profile: FictionalProfile) => void;
  onNavigateToMatches: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialOfferedFilter = '',
  onProposeExchange,
  onNavigateToMatches,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [offeredFilter, setOfferedFilter] = useState(initialOfferedFilter);
  const [desiredFilter, setDesiredFilter] = useState('');
  const [formatFilter, setFormatFilter] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [selectedProfile, setSelectedProfile] = useState<FictionalProfile | null>(null);

  const filteredProfiles = useMemo(() => {
    return FICTIONAL_PROFILES.filter((profile) => {
      // 1. Search term (name, intro, headline, skills, location)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = profile.name.toLowerCase().includes(term);
        const matchesHeadline = profile.roleHeadline.toLowerCase().includes(term);
        const matchesIntro = profile.intro.toLowerCase().includes(term);
        const matchesLocation = profile.location.toLowerCase().includes(term);
        const matchesOffered = profile.skillsOffered.some((s) =>
          s.name.toLowerCase().includes(term)
        );
        const matchesWanted = profile.skillsWanted.some((s) =>
          s.toLowerCase().includes(term)
        );
        if (
          !matchesName &&
          !matchesHeadline &&
          !matchesIntro &&
          !matchesLocation &&
          !matchesOffered &&
          !matchesWanted
        ) {
          return false;
        }
      }

      // 2. Offered skill filter
      if (offeredFilter && offeredFilter !== 'All') {
        const matches = profile.skillsOffered.some(
          (s) => s.name.toLowerCase() === offeredFilter.toLowerCase()
        );
        if (!matches) return false;
      }

      // 3. Desired skill filter
      if (desiredFilter && desiredFilter !== 'All') {
        const matches = profile.skillsWanted.some(
          (s) => s.toLowerCase() === desiredFilter.toLowerCase()
        );
        if (!matches) return false;
      }

      // 4. Meeting format filter
      if (formatFilter && formatFilter !== 'All') {
        if (formatFilter === 'Online' && profile.format !== 'Online' && profile.format !== 'Flexible') {
          return false;
        }
        if (formatFilter === 'In-person' && profile.format !== 'In-person' && profile.format !== 'Flexible') {
          return false;
        }
        if (formatFilter === 'Flexible' && profile.format !== 'Flexible') {
          return false;
        }
      }

      // 5. Availability filter
      if (availabilityFilter && availabilityFilter !== 'All') {
        const matches = profile.availability.some((a) =>
          a.toLowerCase().includes(availabilityFilter.toLowerCase())
        );
        if (!matches) return false;
      }

      return true;
    });
  }, [searchTerm, offeredFilter, desiredFilter, formatFilter, availabilityFilter]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    (offeredFilter && offeredFilter !== 'All') ||
    (desiredFilter && desiredFilter !== 'All') ||
    formatFilter !== 'All' ||
    availabilityFilter !== 'All';

  const handleResetFilters = () => {
    setSearchTerm('');
    setOfferedFilter('All');
    setDesiredFilter('All');
    setFormatFilter('All');
    setAvailabilityFilter('All');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header and Subheading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
            Fictional Community Directory
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#183B2B]">
            Explore Skills & People
          </h1>
          <p className="text-sm text-[#4E5B54]">
            Browse 8 diverse fictional profiles offering real knowledge without money.
          </p>
        </div>

        <button
          onClick={onNavigateToMatches}
          className="px-4 py-2.5 rounded-xl bg-[#D95D39] text-white text-xs font-semibold hover:bg-[#C24E2A] transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Use AI Match Assistant</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-4 shadow-xs">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#73827A] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, skill (e.g. Excel, English, Cooking), or city..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B] shadow-2xs"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Offered Skill */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#4E5B54]">
              Skill Offered
            </label>
            <select
              value={offeredFilter}
              onChange={(e) => setOfferedFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            >
              <option value="All">All Offered Skills</option>
              {ALL_OFFERED_SKILL_NAMES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Desired Skill */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#4E5B54]">
              Skill Desired (Wants)
            </label>
            <select
              value={desiredFilter}
              onChange={(e) => setDesiredFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            >
              <option value="All">All Desired Skills</option>
              {ALL_OFFERED_SKILL_NAMES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Meeting Format */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#4E5B54]">
              Meeting Format
            </label>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            >
              <option value="All">All Formats</option>
              <option value="Online">Online Video Call</option>
              <option value="In-person">In-Person Only</option>
              <option value="Flexible">Flexible (Either)</option>
            </select>
          </div>

          {/* Availability */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#4E5B54]">
              Availability
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C0] text-xs text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            >
              <option value="All">Any Time Slot</option>
              <option value="Tuesday">Tuesday Evenings</option>
              <option value="Thursday">Thursday Evenings</option>
              <option value="Monday">Monday Evenings</option>
              <option value="Wednesday">Wednesday Evenings</option>
              <option value="Friday">Friday Evenings</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Weekend">Weekends</option>
            </select>
          </div>
        </div>

        {/* Status & Clear filters button */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[#64726B] font-medium">
            Showing <strong>{filteredProfiles.length}</strong> of {FICTIONAL_PROFILES.length} fictional profiles
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-[#D95D39] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Profiles Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#DDD3C0] space-y-3">
          <p className="font-serif-heading text-xl font-bold text-[#183B2B]">
            No fictional profiles matched your filters
          </p>
          <p className="text-xs text-[#5E6D66] max-w-md mx-auto">
            Try adjusting your search keyword or clearing the specific offered/desired skill filter to see more profiles.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] hover:border-[#183B2B]/40 hover:shadow-md transition flex flex-col justify-between space-y-5"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif-heading font-bold text-lg shadow-2xs ${profile.avatarColor}`}
                  >
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-serif-heading text-lg font-bold text-[#183B2B]">
                      {profile.name}
                    </h2>
                    <p className="text-xs text-[#525F58] line-clamp-1">{profile.roleHeadline}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#6E7B74] mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {profile.location}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                    profile.format === 'Online'
                      ? 'bg-blue-100/70 text-blue-900 border border-blue-200'
                      : profile.format === 'In-person'
                      ? 'bg-amber-100/80 text-amber-900 border border-amber-200'
                      : 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                  }`}
                >
                  {profile.format}
                </span>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-[#3E4A43] leading-relaxed line-clamp-2">
                {profile.intro}
              </p>

              {/* Two-Way Skills preview */}
              <div className="space-y-2.5 pt-2 border-t border-[#EAE2D2]">
                {/* Offered */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#183B2B] block mb-1">
                    Offers to teach:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skillsOffered.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFECE4] text-[#183B2B] text-xs font-semibold"
                      >
                        <span>{s.name}</span>
                        <span className="text-[10px] text-[#697871] font-normal">
                          ({s.level})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Wanted */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95D39] block mb-1">
                    Wants to learn:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skillsWanted.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center px-2 py-0.5 rounded-lg bg-white border border-[#DDD3C0] text-[#3E4A43] text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability chip */}
                <div className="flex items-center gap-1 text-[11px] text-[#6E7B74] pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#D95D39]" />
                  <span className="truncate">{profile.availability.slice(0, 2).join(' • ')}</span>
                  {profile.availability.length > 2 && (
                    <span className="text-[10px] text-[#86958E]">
                      +{profile.availability.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#EAE2D2]">
                <button
                  onClick={() => setSelectedProfile(profile)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#183B2B] bg-[#EFECE4] hover:bg-[#E5DFD4] transition cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => onProposeExchange(profile)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#183B2B] hover:bg-[#23503B] transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#D95D39]" />
                  <span>Propose Exchange</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Detail Modal */}
      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onProposeExchange={(p) => {
          setSelectedProfile(null);
          onProposeExchange(p);
        }}
      />
    </div>
  );
};
