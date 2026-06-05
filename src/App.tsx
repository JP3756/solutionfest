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
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-start text-white selection:bg-[#CCFF00]/30 font-sans antialiased py-4 sm:py-8 px-2">
      {/* Simulation Mobile Container Wrapper with border-8/border-[#1d1d1d] */}
      <div className={`w-full max-w-[440px] h-[820px] bg-black flex flex-col border-8 border-[#1d1d1d] relative shadow-2xl rounded-[32px] overflow-hidden`}>
        
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
            <main className="flex-1 px-4 py-5 overflow-y-auto pb-24">
              {renderActiveTab()}
            </main>

            {/* Bottom Nav Bar - Kept absolute within container to prevent escaping the simulated screen */}
            <nav 
              id="tab-navbar-container" 
              className="absolute bottom-0 left-0 right-0 h-[72px] bg-[#0c0c0c]/95 backdrop-blur-md border-t border-white/10 z-30 px-3 flex items-center justify-between"
            >
              {/* Home Button */}
              <button
                id="nav-tab-home"
                onClick={() => setCurrentTab('home')}
                className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <Home className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] tracking-wider uppercase font-mono">Home</span>
              </button>

              {/* Learn Button */}
              <button
                id="nav-tab-learn"
                onClick={() => setCurrentTab('learn')}
                className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all cursor-pointer ${
                  currentTab === 'learn'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <GraduationCap className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] tracking-wider uppercase font-mono">Learn</span>
              </button>

              {/* Credentials Button */}
              <button
                id="nav-tab-credentials"
                onClick={() => setCurrentTab('credentials')}
                className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all cursor-pointer ${
                  currentTab === 'credentials'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <BadgeCheck className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] tracking-wider uppercase font-mono">Creds</span>
              </button>

              {/* Jobs Button */}
              <button
                id="nav-tab-jobs"
                onClick={() => setCurrentTab('jobs')}
                className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all cursor-pointer ${
                  currentTab === 'jobs'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <Briefcase className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] tracking-wider uppercase font-mono">Jobs</span>
              </button>

              {/* Settings Button */}
              <button
                id="nav-tab-settings"
                onClick={() => setCurrentTab('settings')}
                className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all cursor-pointer ${
                  currentTab === 'settings'
                    ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                    : 'text-white/50 hover:text-white font-semibold'
                }`}
              >
                <Settings className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] tracking-wider uppercase font-mono">Settings</span>
              </button>
            </nav>
          </>
        ) : (
          <main className="flex-1 px-4 py-6 overflow-y-auto flex flex-col justify-center">
            <AuthOnboarding onComplete={handleAuthComplete} />
          </main>
        )}
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

