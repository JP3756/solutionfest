import { ArrowLeft, WifiOff, Wifi, Compass, Sparkles, Search, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  onSearchClick?: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  isOffline,
  setIsOffline,
  onSearchClick,
}: HeaderProps) {
  // Title depends on screen tab or some sub-view
  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'learn':
        return 'Growth Essentials';
      case 'credentials':
        return 'Career Cebu';
      case 'jobs':
        return 'Career Cebu';
      default:
        return 'Career Cebu';
    }
  };

  const showBackButton = currentTab !== 'home';

  const handleBack = () => {
    setCurrentTab('home');
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
        return (
          <div className="flex items-center gap-1">
            <span id="verified-cap-stamp" className="p-1 text-[#CCFF00] bg-[#CCFF00]/10 rounded border border-[#CCFF00]/20">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5" id="design-system-header-badge">
            <span className="text-[10px] font-mono font-bold text-[#CCFF00] tracking-widest bg-white/5 px-2 py-0.5 border border-white/10 uppercase">SYS_ACTIVE</span>
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
          <h1 id="header-brand-title" className="text-lg font-black tracking-wider text-white uppercase display-font">
            {getHeaderTitle()}
          </h1>
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
            ? 'bg-[#CCFF00] text-black font-extrabold uppercase tracking-widest text-[10px]'
            : 'bg-white/5 text-white/70 font-mono tracking-wider text-[10px] border-b border-white/5'
        }`}
      >
        {isOffline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 shrink-0 text-black stroke-[3]" />
            <span>
              OFFLINE PROTOCOL ACTIVE • CHANGES WILL SYNC LATER
            </span>
          </>
        ) : (
          <>
            <Wifi className="w-3.5 h-3.5 shrink-0 text-[#CCFF00] animate-pulse" />
            <span>
              ONLINE SYS_SYNC ACTIVE • CEBU CLOUD CONNECTED
            </span>
          </>
        )}
      </div>
    </div>
  );
}
