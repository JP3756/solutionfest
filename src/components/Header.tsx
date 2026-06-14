import { ArrowLeft, WifiOff, Wifi, Compass, Sparkles, Search, HelpCircle, Settings } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  onSearchClick?: () => void;
  user?: User | null;
}

export default function Header({
  currentTab,
  setCurrentTab,
  isOffline,
  setIsOffline,
  onSearchClick,
  user,
}: HeaderProps) {
  // Title depends on screen tab or some sub-view
  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'learn':
        return 'Growth Essentials';
      case 'credentials':
        return 'Cebu Upskilling';
      case 'jobs':
        return 'Cebu Upskilling';
      case 'employer-home':
        return 'Recruiter Hub';
      case 'employer-talent':
        return 'Talent Search';
      case 'employer-post-job':
        return 'Recruitment';
      case 'settings':
        return 'Settings';
      default:
        return 'Cebu Upskilling';
    }
  };

  const showBackButton = currentTab !== 'home' && currentTab !== 'employer-home';

  const handleBack = () => {
    if (user?.role === 'employer') {
      setCurrentTab('employer-home');
    } else {
      setCurrentTab('home');
    }
  };

  const getRightIcon = () => {
    switch (currentTab) {
      case 'jobs':
        return (
          <button 
            id="job-search-header"
            onClick={onSearchClick}
            className="p-1.5 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            title="Search Jobs"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        );
      case 'learn':
        return (
          <div className="flex items-center gap-1.5">
            <span className="bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-mono border border-[#CCFF00]/30 animate-pulse">
              LIVE AUDIO
            </span>
          </div>
        );
      case 'credentials':
      case 'employer-talent':
        return (
          <div className="flex items-center gap-1">
            <span id="verified-cap-stamp" className="p-1 text-[#CCFF00] bg-[#CCFF00]/10 rounded border border-[#CCFF00]/20">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
            </span>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center gap-1">
            <span id="settings-stamp" className="p-1 text-[#CCFF00] bg-[#CCFF00]/10 rounded border border-[#CCFF00]/20">
              <Settings className="w-4 h-4 text-[#CCFF00]" />
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5" id="design-system-header-badge">
            <span className="text-[10px] font-sans font-bold text-[#CCFF00] tracking-widest bg-[#CCFF00]/10 px-2.5 py-0.5 border border-[#CCFF00]/25 rounded uppercase">Connected</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col bg-black border-b border-white/10 sticky top-0 z-50">
      {/* Upper bar with Back button, Title, Right utility icon */}
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <button
              id="back-navigation-btn"
              onClick={handleBack}
              className="p-1.5 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
          ) : (
            <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping"></div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 id="header-brand-title" className="text-[17px] font-black tracking-wider text-white uppercase display-font leading-none">
                {getHeaderTitle()}
              </h1>
              {currentTab === 'home' && (
                <span className="text-[8px] font-bold font-mono text-zinc-300 border border-zinc-800 bg-zinc-900 px-1 rounded tracking-wide">
                  GUIDE
                </span>
              )}
            </div>
            <span className="text-[8px] font-mono tracking-widest text-[#CCFF00] uppercase block mt-0.5 font-bold leading-none">
              Cebu Career Guide
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getRightIcon()}
        </div>
      </div>

      {/* Offline Banner Toggle bar styled as structural alert protocol */}
      <div
        id="offline-banner"
        onClick={() => setIsOffline(!isOffline)}
        className={`w-full py-2 px-4 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 select-none text-center ${
          isOffline
            ? 'bg-[#CCFF00] text-black font-bold uppercase tracking-widest text-[10px]'
            : 'bg-white/5 text-white/70 font-sans tracking-wide text-[10px] border-b border-white/5'
        }`}
      >
        {isOffline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 shrink-0 text-black stroke-[2]" />
            <span>
              Offline Mode Active • Your progress is saved locally
            </span>
          </>
        ) : (
          <>
            <Wifi className="w-3.5 h-3.5 shrink-0 text-[#CCFF00] animate-pulse" />
            <span>
              Connected • Your career guide is synchronized
            </span>
          </>
        )}
      </div>
    </div>
  );
}
