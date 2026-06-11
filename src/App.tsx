import { useState, useEffect } from 'react';
import { Home, BookOpen, Clock, BadgeCheck, Briefcase, GraduationCap, Sparkles, X, CheckCircle, LogOut, Wifi, WifiOff, Settings } from 'lucide-react';
import Header from './components/Header';
import HomeTab from './components/HomeTab';
import LearnTab from './components/LearnTab';
import CredentialsTab from './components/CredentialsTab';
import JobsTab from './components/JobsTab';
import SettingsTab from './components/SettingsTab';
import AuthOnboarding from './components/AuthOnboarding';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isOffline, setIsOffline] = useState<boolean>(true); // initially offline from Screenshot 1
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('12:00 PM');

  // Real-time ticking Clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Authenticated user store persisted in localStorage
  const [user, setUser] = useState<{ name: string; skills: string[] } | null>(() => {
    const saved = localStorage.getItem('cebu_talent_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Trigger success Toast notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const handleAuthComplete = (name: string, skills: string[]) => {
    const newUser = { name, skills };
    setUser(newUser);
    localStorage.setItem('cebu_talent_user', JSON.stringify(newUser));
    triggerToast(`Sync Successful: Account verified. Welcome, ${name}!`);
  };

  const handleUpdateSkills = (updatedSkills: string[]) => {
    if (user) {
      const updatedUser = { ...user, skills: updatedSkills };
      setUser(updatedUser);
      localStorage.setItem('cebu_talent_user', JSON.stringify(updatedUser));
      triggerToast('Skills updated across active directories.');
    }
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('cebu_talent_user');
    setCurrentTab('home');
    triggerToast('Secure session terminated.');
  };

  // Listen to custom tab search command from header
  const handleJobSearchHeaderClick = () => {
    setCurrentTab('jobs');
    triggerToast('Use the category tabs or search input below to filter vacancies.');
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'learn':
        return <LearnTab isOffline={isOffline} onSuccessToast={triggerToast} />;
      case 'credentials':
        return (
          <CredentialsTab 
            onSuccessToast={triggerToast} 
            user={user} 
            onUpdateSkills={handleUpdateSkills} 
            onLogOut={handleLogOut}
          />
        );
      case 'jobs':
        return <JobsTab isOffline={isOffline} onSuccessToast={triggerToast} userSkills={user?.skills || []} />;
      case 'settings':
        return (
          <SettingsTab
            user={user}
            isOffline={isOffline}
            setIsOffline={setIsOffline}
            onUpdateSkills={handleUpdateSkills}
            onSuccessToast={triggerToast}
            onLogOut={handleLogOut}
          />
        );
      default:
        return (
          <HomeTab 
            setCurrentTab={setCurrentTab} 
            isOffline={isOffline} 
            onSuccessToast={triggerToast} 
            user={user}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(204,255,0,0.06),transparent)] flex flex-col items-center justify-start text-white selection:bg-[#CCFF00]/30 font-sans antialiased py-3 sm:py-6 px-2">
      
      {/* Simulation Mobile Container Wrapper with immersive physical bezels */}
      <div className="w-full max-w-[430px] h-[820px] bg-black flex flex-col border-10 border-[#1a1a1a] ring-1 ring-white/10 relative shadow-[0_0_80px_rgba(0,0,0,0.85)] rounded-[40px] overflow-hidden">
        
        {/* Simulated Native Smartphone Status Bar & Physical Cam Sensor Island */}
        <div className="w-full h-9 bg-black flex items-center justify-between px-5 pt-2 pb-1 z-40 relative shrink-0 border-b border-white/5 select-none font-mono">
          {/* Clock & Career Network Carrier */}
          <div className="flex items-center gap-1.5 text-[9.5px] text-zinc-400 font-bold tracking-tight">
            <span>{currentTime}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600 block"></span>
            <span className="text-[8px] text-zinc-400 font-bold tracking-widest uppercase">CEBU UPSKILLING</span>
          </div>

          {/* Simulated hardware camera notch pill */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-zinc-950 border border-zinc-800/50 rounded-full flex items-center justify-between px-2.5 z-50 pointer-events-none shadow-inner">
            <span className="w-1.5 h-1 rounded-full bg-zinc-900 block border border-zinc-950"></span>
            <span className="w-1 h-1 rounded-full bg-blue-950/80 ring-1 ring-blue-900/40 block"></span>
            {isOffline ? (
              <span className="w-1 h-1 rounded-full bg-zinc-800 block"></span>
            ) : (
              <span className="w-1 h-1 rounded-full bg-[#CCFF00] animate-pulse block"></span>
            )}
          </div>

          {/* Right hand dynamic indicators representing system state */}
          <div className="flex items-center gap-1.5 text-[9.5px] text-zinc-400 font-semibold select-none">
            {/* Dynamic connectivity signal */}
            <div className="flex items-end gap-0.5 h-2.5" title={isOffline ? "Cellular Only (Offline Mode)" : "Wi-Fi Active"}>
              <span className={`w-0.5 h-1 rounded-xs transition-colors ${isOffline ? 'bg-zinc-600' : 'bg-[#CCFF00]'}`}></span>
              <span className={`w-0.5 h-1.5 rounded-xs transition-colors ${isOffline ? 'bg-zinc-600' : 'bg-[#CCFF00]'}`}></span>
              <span className={`w-0.5 h-2 rounded-xs transition-colors ${isOffline ? 'bg-zinc-600' : 'bg-[#CCFF00]'}`}></span>
              <span className={`w-0.5 h-2.5 rounded-xs transition-colors ${isOffline ? 'bg-zinc-600' : 'bg-[#CCFF00]'}`}></span>
            </div>

            {/* Simulated WiFi/LTE icon */}
            {isOffline ? (
              <span className="text-[8px] font-black uppercase text-zinc-500 bg-zinc-800/10 px-1 rounded-xs border border-zinc-800 py-0.5 leading-none">LTE</span>
            ) : (
              <span className="text-[8px] font-black uppercase text-black bg-[#CCFF00] px-1 rounded-xs py-0.5 leading-none border border-[#CCFF00]/40">WiFi</span>
            )}

            {/* Battery state */}
            <div className="flex items-center gap-1">
              <span className="text-[8.5px] font-bold text-zinc-500">92%</span>
              <div className="w-5.5 h-3 border border-zinc-600 rounded-sm p-0.5 flex items-center bg-zinc-950 relative">
                <div className="h-full bg-emerald-500 rounded-2xs w-[92%]"></div>
                <div className="absolute -right-0.5 top-[3px] w-0.5 h-1 bg-zinc-600 rounded-r-2xs"></div>
              </div>
            </div>
          </div>
        </div>
        
        {user ? (
          <>
            {/* Core Header View with state support */}
            <Header 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab} 
              isOffline={isOffline} 
              setIsOffline={setIsOffline}
              onSearchClick={handleJobSearchHeaderClick}
            />

            {/* Scrollable Core Screen Contents inside the mobile frame */}
            <main className="flex-1 px-4 py-5 overflow-y-auto pb-24 scrollbar-none">
              {renderActiveTab()}
            </main>

            {/* Bottom Nav Bar - Kept absolute within container to prevent escaping the simulated screen */}
            <nav 
              id="tab-navbar-container" 
              className="absolute bottom-0 left-0 right-0 h-[72px] bg-[#0c0c0c]/95 backdrop-blur-md border-t border-white/10 z-30 px-3 flex items-center justify-between pb-3"
            >
              {/* Home Button */}
              <button
                id="nav-tab-home"
                onClick={() => setCurrentTab('home')}
                className={`flex flex-col items-center justify-center flex-1 h-[50px] rounded transition-all cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <Home className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] tracking-wider uppercase font-mono">Home</span>
              </button>

              {/* Learn Button */}
              <button
                id="nav-tab-learn"
                onClick={() => setCurrentTab('learn')}
                className={`flex flex-col items-center justify-center flex-1 h-[50px] rounded transition-all cursor-pointer ${
                  currentTab === 'learn'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <GraduationCap className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] tracking-wider uppercase font-mono">Learn</span>
              </button>

              {/* Credentials Button */}
              <button
                id="nav-tab-credentials"
                onClick={() => setCurrentTab('credentials')}
                className={`flex flex-col items-center justify-center flex-1 h-[50px] rounded transition-all cursor-pointer ${
                  currentTab === 'credentials'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <BadgeCheck className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] tracking-wider uppercase font-mono">Skills</span>
              </button>

              {/* Jobs Button */}
              <button
                id="nav-tab-jobs"
                onClick={() => setCurrentTab('jobs')}
                className={`flex flex-col items-center justify-center flex-1 h-[50px] rounded transition-all cursor-pointer ${
                  currentTab === 'jobs'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <Briefcase className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] tracking-wider uppercase font-mono">Jobs</span>
              </button>

              {/* Settings Button */}
              <button
                id="nav-tab-settings"
                onClick={() => setCurrentTab('settings')}
                className={`flex flex-col items-center justify-center flex-1 h-[50px] rounded transition-all cursor-pointer ${
                  currentTab === 'settings'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <Settings className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] tracking-wider uppercase font-mono">Settings</span>
              </button>
            </nav>
          </>
        ) : (
          <main className="flex-1 px-4 py-6 overflow-y-auto flex flex-col justify-center scrollbar-none pb-12">
            <AuthOnboarding onComplete={handleAuthComplete} />
          </main>
        )}

        {/* Physical Simulated Swipe Bar Gesture indicator at baseline of phone hardware */}
        <div className="absolute bottom-1 right-0 left-0 h-2.5 z-40 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Repositioned Dynamic Toast Notification System */}
      {toastMessage && (
        <div 
          id="toast-popup-banner"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[360px] bg-[#1a1a1a] text-white rounded-lg p-3.5 shadow-2x shadow-black/80 flex items-start gap-2.5 z-50 text-[12.5px] leading-snug animate-slide-up border border-[#CCFF00]/30"
        >
          <CheckCircle className="w-4.5 h-4.5 text-[#CCFF00] shrink-0 mt-0.5" />
          <div className="flex-1 font-semibold font-sans">
            {toastMessage}
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-white/40 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

