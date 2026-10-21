import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Compass,
  CalendarCheck,
  UserCheck,
  HelpCircle,
  RotateCcw,
  Menu,
  X,
  ArrowRightLeft,
  CheckCircle2,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  pendingCount: number;
  acceptedCount: number;
  onTryAlex: () => void;
  onOpenResetModal: () => void;
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  pendingCount,
  acceptedCount,
  onTryAlex,
  onOpenResetModal,
  userName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alexToast, setAlexToast] = useState(false);

  const handleAlexClick = () => {
    onTryAlex();
    setAlexToast(true);
    setTimeout(() => setAlexToast(false), 3000);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: ArrowRightLeft },
    { id: 'explore', label: 'Explore Skills', icon: Compass },
    { id: 'matches', label: 'AI Match Assistant', icon: Sparkles, badge: 'AI' },
    {
      id: 'exchanges',
      label: 'My Exchanges',
      icon: CalendarCheck,
      count: pendingCount + acceptedCount,
    },
    { id: 'profile', label: `My Profile (${userName || 'You'})`, icon: UserCheck },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      {/* Top Demo Banner */}
      <div className="bg-[#183B2B] text-[#FAF7F2] px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D95D39] animate-pulse"></span>
          <span className="tracking-wide">
            <strong>Interactive Demo</strong> — Fictional Profiles & Simulated Exchanges
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-[#FAF7F2]/80">
          <span>No credit card • No accounts • Cashless learning</span>
          <button
            onClick={onOpenResetModal}
            className="hover:text-white underline decoration-dotted flex items-center gap-1 cursor-pointer transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#214F3B] transition">
              <ArrowRightLeft className="w-5 h-5 text-[#D95D39]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-heading text-xl font-bold text-[#183B2B] tracking-tight">
                  SkillSwap
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-[#D95D39]/40 text-[#D95D39]">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-[#556059] font-medium hidden sm:block">
                Teach what you know. Learn what you need.
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#183B2B] text-[#FAF7F2] shadow-sm'
                      : 'text-[#2C3531] hover:text-[#183B2B] hover:bg-[#EFE7D8]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D95D39]' : 'text-[#606B65]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#D95D39] text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-[#FAF7F2] text-[#183B2B]'
                          : 'bg-[#D95D39] text-white'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={handleAlexClick}
              title="Loads the fictional Alex profile (Excel ⇄ English conversation)"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF7F2] border border-[#183B2B]/30 text-[#183B2B] hover:bg-[#EFE7D8] hover:border-[#183B2B] transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D95D39]" />
              <span>Try Example (Alex)</span>
            </button>
            <button
              onClick={() => onSelectTab('matches')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#D95D39] text-white hover:bg-[#C24E2A] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find Matches</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleAlexClick}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-[#EFE7D8] text-[#183B2B] border border-[#183B2B]/20"
            >
              Try Alex
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#183B2B] hover:bg-[#EFE7D8] transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC8] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-[#183B2B] text-[#FAF7F2]'
                    : 'text-[#2C3531] hover:bg-[#EFE7D8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D95D39]' : 'text-[#606B65]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#D95D39] text-white">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#E8DEC8] flex items-center justify-between">
            <button
              onClick={handleAlexClick}
              className="text-xs font-medium text-[#183B2B] underline decoration-dotted"
            >
              Load Alex Example Profile
            </button>
            <button
              onClick={() => {
                onOpenResetModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-medium text-red-700 underline decoration-dotted"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
      )}

      {/* Alex Loaded Toast Notice */}
      {alexToast && (
        <div className="absolute top-full right-4 mt-2 bg-[#183B2B] text-white text-xs px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-emerald-700/50 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Alex's profile loaded! (Offers Excel, wants English conversation)</span>
        </div>
      )}
    </header>
  );
};
