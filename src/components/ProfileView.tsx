import React, { useState } from 'react';
import {
  UserProfile,
  SkillLevel,
  MeetingFormat,
  OfferedSkill,
} from '../types';
import {
  ALEX_PROFILE,
  ALL_OFFERED_SKILL_NAMES,
  AVAILABILITY_OPTIONS,
} from '../data/fictionalProfiles';
import {
  UserCheck,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Info,
  MapPin,
  Clock,
  Laptop,
} from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onNavigateToMatches: () => void;
  onLoadAlexProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onSaveProfile,
  onNavigateToMatches,
  onLoadAlexProfile,
}) => {
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddOfferedSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = profile.skillsOffered.some(
      (s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
    );
    if (!exists) {
      setProfile({
        ...profile,
        skillsOffered: [
          ...profile.skillsOffered,
          { name: newSkillName.trim(), level: newSkillLevel },
        ],
      });
      setNewSkillName('');
    }
  };

  const handleRemoveOfferedSkill = (index: number) => {
    setProfile({
      ...profile,
      skillsOffered: profile.skillsOffered.filter((_, i) => i !== index),
    });
  };

  const handleUpdateSkillLevel = (index: number, level: SkillLevel) => {
    const updated = [...profile.skillsOffered];
    updated[index] = { ...updated[index], level };
    setProfile({ ...profile, skillsOffered: updated });
  };

  const handleAddWantedSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    const exists = profile.skillsWanted.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );
    if (!exists) {
      setProfile({
        ...profile,
        skillsWanted: [...profile.skillsWanted, trimmed],
      });
      setNewWantedSkill('');
    }
  };

  const handleRemoveWantedSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skillsWanted: profile.skillsWanted.filter((s) => s !== skillToRemove),
    });
  };

  const handleToggleAvailability = (slot: string) => {
    if (profile.availability.includes(slot)) {
      setProfile({
        ...profile,
        availability: profile.availability.filter((s) => s !== slot),
      });
    } else {
      setProfile({
        ...profile,
        availability: [...profile.availability, slot],
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Page Title & Walkthrough Alert */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D95D39]">
            Demo Profile Setup
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#183B2B]">
            My SkillSwap Profile
          </h1>
          <p className="text-sm text-[#4E5B54]">
            Tell the community what you feel confident teaching and what you are eager to learn.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onLoadAlexProfile();
            setProfile({ ...ALEX_PROFILE });
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#183B2B]/30 hover:border-[#183B2B] hover:bg-[#EFE7D8] text-[#183B2B] text-xs font-semibold flex items-center gap-2 cursor-pointer transition shadow-2xs self-start sm:self-auto"
        >
          <UserCheck className="w-4 h-4 text-[#D95D39]" />
          <span>Load Alex’s Profile (Demo Example)</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-6 shadow-xs">
          <h2 className="font-serif-heading text-xl font-bold text-[#183B2B] flex items-center gap-2">
            <span>1. Basic Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="user-name" className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
                First Name <span className="text-[#D95D39]">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="e.g. Alex"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-[#183B2B] text-sm focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="user-location" className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
                Broad Location <span className="text-[11px] font-normal text-[#606E66]">(City / Region only)</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#7A8880] absolute left-3.5 top-3" />
                <input
                  id="user-location"
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="e.g. Seattle, WA or London, UK"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-[#183B2B] text-sm focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B]"
                />
              </div>
              <p className="text-[11px] text-[#6E7B74]">
                Do not enter an exact home or street address. A city or general metro area is sufficient.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="user-intro" className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
              Short Introduction <span className="text-[#D95D39]">*</span>
            </label>
            <textarea
              id="user-intro"
              required
              rows={3}
              value={profile.intro}
              onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
              placeholder="Tell others a little about yourself, your background, and why you want to swap skills."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-[#183B2B] text-sm focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B]"
            />
          </div>
        </div>

        {/* Skills I Can Offer Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
              2. Skills You Can Offer (Teach)
            </h2>
            <span className="text-xs text-[#5C6A63]">
              Indicate your comfortable experience level for each skill
            </span>
          </div>

          {/* Current Offered Skills List */}
          <div className="space-y-3">
            {profile.skillsOffered.length === 0 ? (
              <p className="text-xs text-[#7B8B82] italic p-3 bg-white/60 rounded-xl border border-dashed border-[#DDD3C0]">
                No skills added yet. Add at least one skill you can share below!
              </p>
            ) : (
              profile.skillsOffered.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#E0D7C6] shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#183B2B]"></span>
                    <span className="font-semibold text-sm text-[#183B2B]">{skill.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#65736C] mr-1">Level:</span>
                      {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => handleUpdateSkillLevel(index, lvl)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition ${
                            skill.level === lvl
                              ? 'bg-[#183B2B] text-white'
                              : 'bg-[#F2ECE1] text-[#425049] hover:bg-[#EAE0CF]'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveOfferedSkill(index)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Remove skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Offered Skill Controls */}
          <div className="p-4 rounded-2xl bg-[#F6EFE3] border border-[#DDD3C0] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183B2B]">
              Add a Skill to Teach
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6 space-y-1">
                <label className="text-[11px] font-medium text-[#4D5A53]">Skill Name</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Excel, Cooking, Photography"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD3C0] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-medium text-[#4D5A53]">Experience Level</label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DDD3C0] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                >
                  <option value="Beginner">Beginner (Foundational)</option>
                  <option value="Intermediate">Intermediate (Practical)</option>
                  <option value="Advanced">Advanced (Expert / Fluent)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleAddOfferedSkill}
                  className="w-full py-2 px-3 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Quick suggested skill pills */}
            <div className="pt-2">
              <span className="text-[11px] text-[#65736C] block mb-1.5">Common skills to offer:</span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_OFFERED_SKILL_NAMES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setNewSkillName(s)}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-[#DDD3C0] text-[#34423B] hover:border-[#183B2B] hover:bg-[#FAF7F2] transition"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills I Want to Learn Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
              3. Skills You Want to Learn
            </h2>
            <span className="text-xs text-[#5C6A63]">
              What knowledge would you love to gain in return?
            </span>
          </div>

          {/* Current Wanted Skills Tags */}
          <div className="flex flex-wrap gap-2 min-h-10 items-center p-3 rounded-2xl bg-white border border-[#E0D7C6]">
            {profile.skillsWanted.length === 0 ? (
              <span className="text-xs text-[#7B8B82] italic">
                No skills requested yet. Choose from suggestions or type below.
              </span>
            ) : (
              profile.skillsWanted.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183B2B] text-[#FAF7F2] text-xs font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWantedSkill(skill)}
                    className="hover:text-[#E8A58D] cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Add Wanted Skill input & pills */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newWantedSkill}
              onChange={(e) => setNewWantedSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddWantedSkill(newWantedSkill);
                }
              }}
              placeholder="e.g. English conversation, Guitar, Cooking"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#DDD3C0] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
            />
            <button
              type="button"
              onClick={() => handleAddWantedSkill(newWantedSkill)}
              className="px-4 py-2.5 rounded-xl bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#23503B] transition cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div>
            <span className="text-[11px] text-[#65736C] block mb-1.5">Common skills to learn:</span>
            <div className="flex flex-wrap gap-1.5">
              {ALL_OFFERED_SKILL_NAMES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddWantedSkill(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#F2ECE1] border border-[#DDD3C0] text-[#34423B] hover:border-[#183B2B] hover:bg-white transition cursor-pointer"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Availability and Meeting Format Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E3DAC8] space-y-6 shadow-xs">
          <h2 className="font-serif-heading text-xl font-bold text-[#183B2B]">
            4. Availability & Meeting Format
          </h2>

          {/* Meeting Format preference */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
              Preferred Meeting Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                [
                  {
                    format: 'Online' as MeetingFormat,
                    title: 'Online Video Call',
                    desc: 'Meet via Zoom, Google Meet, or Discord.',
                  },
                  {
                    format: 'In-person' as MeetingFormat,
                    title: 'In-Person (Public)',
                    desc: 'Meet locally in public libraries or cafes.',
                  },
                  {
                    format: 'Flexible' as MeetingFormat,
                    title: 'Flexible (Either)',
                    desc: 'Open to both online and in-person swaps.',
                  },
                ]
              ).map((f) => (
                <div
                  key={f.format}
                  onClick={() => setProfile({ ...profile, format: f.format })}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    profile.format === f.format
                      ? 'bg-[#183B2B] text-white border-[#183B2B] shadow-sm'
                      : 'bg-white text-[#2C3831] border-[#DDD3C0] hover:border-[#183B2B]'
                  }`}
                >
                  <p className="font-bold text-sm mb-1">{f.title}</p>
                  <p
                    className={`text-xs ${
                      profile.format === f.format ? 'text-[#D3DFD9]' : 'text-[#64726A]'
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Checkboxes */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D3832]">
              General Availability Slots
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AVAILABILITY_OPTIONS.map((slot) => {
                const isSelected = profile.availability.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleToggleAvailability(slot)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#183B2B] text-white border-[#183B2B]'
                        : 'bg-white text-[#3E4D45] border-[#DDD3C0] hover:border-[#183B2B]'
                    }`}
                  >
                    <span>{slot}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#D95D39]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#DDD3C0]">
          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183B2B] bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Profile changes saved to demo storage!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#183B2B] text-white font-semibold text-sm hover:bg-[#23503B] transition cursor-pointer shadow-sm"
            >
              Save Profile Changes
            </button>

            <button
              type="button"
              onClick={() => {
                handleSave();
                onNavigateToMatches();
              }}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#D95D39] text-white font-semibold text-sm hover:bg-[#C24E2A] transition cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Matches</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
