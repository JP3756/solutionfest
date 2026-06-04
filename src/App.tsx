import { useState, useEffect } from 'react';
import { Home, BookOpen, Clock, BadgeCheck, Briefcase, GraduationCap, Sparkles, X, CheckCircle } from 'lucide-react';
import Header from './components/Header';
import HomeTab from './components/HomeTab';
import LearnTab from './components/LearnTab';
import CredentialsTab from './components/CredentialsTab';
import JobsTab from './components/JobsTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isOffline, setIsOffline] = useState<boolean>(true); // initially offline from Screenshot 1
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger success Toast notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
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
        return <CredentialsTab onSuccessToast={triggerToast} />;
      case 'jobs':
        return <JobsTab isOffline={isOffline} onSuccessToast={triggerToast} />;
      default:
        return <HomeTab setCurrentTab={setCurrentTab} isOffline={isOffline} onSuccessToast={triggerToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-start text-white selection:bg-[#CCFF00]/30 font-sans antialiased py-4 sm:py-8">
      {/* Simulation Mobile Container Wrapper with border-8/border-[#1a1a1a] from Kinetic spec */}
      <div className="w-full max-w-[480px] min-h-screen bg-black flex flex-col border-8 border-[#1d1d1d] relative pb-[84px] shadow-2xl rounded-xl overflow-hidden">
        
        {/* Core Header View with back state support */}
        <Header 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          isOffline={isOffline} 
          setIsOffline={setIsOffline}
          onSearchClick={handleJobSearchHeaderClick}
        />

        {/* Scrollable Core Screen Contents */}
        <main className="flex-1 px-4 py-5 overflow-y-auto">
          {renderActiveTab()}
        </main>

        {/* Toast Notifier Popup in dark theme */}
        {toastMessage && (
          <div 
            id="toast-popup-banner"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[400px] bg-[#1a1a1a] text-white rounded-lg p-3.5 shadow-2xl flex items-start gap-2.5 z-50 text-[14px] leading-snug animate-slide-up border border-[#CCFF00]/30"
          >
            <CheckCircle className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
            <div className="flex-1 font-medium font-sans">
              {toastMessage}
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-white/40 hover:text-white p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Nav Bar - Exactly matching the Kinetic aesthetic */}
        <nav 
          id="tab-navbar-container" 
          className="w-full max-w-[464px] h-[72px] bg-[#0c0c0c] border-t border-white/10 fixed bottom-[0px] z-50 px-3 flex items-center justify-between"
        >
          {/* Home Button */}
          <button
            id="nav-tab-home"
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all ${
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
            className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all ${
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
            className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all ${
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
            className={`flex flex-col items-center justify-center flex-1 h-[54px] rounded transition-all ${
              currentTab === 'jobs'
                ? 'bg-[#CCFF00] text-black font-black uppercase tracking-tight'
                : 'text-white/50 hover:text-white font-semibold'
            }`}
          >
            <Briefcase className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase font-mono">Jobs</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
