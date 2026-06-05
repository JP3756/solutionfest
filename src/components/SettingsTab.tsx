import { useState, FormEvent } from 'react';
import { 
  Settings, 
  User, 
  MapPin, 
  Sliders, 
  Database, 
  ShieldAlert, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Bell, 
  HardDrive,
  Info 
} from 'lucide-react';
import ResumeBuilder from './ResumeBuilder';

interface SettingsTabProps {
  user: { name: string; skills: string[] } | null;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  onUpdateSkills: (updatedSkills: string[]) => void;
  onSuccessToast: (msg: string) => void;
  onLogOut: () => void;
}

export default function SettingsTab({
  user,
  isOffline,
  setIsOffline,
  onUpdateSkills,
  onSuccessToast,
  onLogOut,
}: SettingsTabProps) {
  // Sourced name/email from simulated environment
  const [userName, setUserName] = useState<string>(user?.name || '');
  const [userEmail, setUserEmail] = useState<string>(() => {
    const savedEmail = localStorage.getItem('cebu_talent_email');
    return savedEmail || 'johnpaolo.cabaluna@dbtc-cebu.edu.ph';
  });

  // Cebu Region location preference
  const [locationPreference, setLocationPreference] = useState<string>(() => {
    return localStorage.getItem('cebu_talent_pref_location') || 'Cebu IT Park';
  });

  // Algorithm matches priority
  const [matchingPriority, setMatchingPriority] = useState<'high' | 'standard'>(() => {
    return (localStorage.getItem('cebu_talent_match_priority') as 'high' | 'standard') || 'standard';
  });

  // Notification toggles
  const [notifyNewJobs, setNotifyNewJobs] = useState<boolean>(true);
  const [notifyOfflineSaves, setNotifyOfflineSaves] = useState<boolean>(true);

  // Cebu demand ecosystem zones
  const zoneOptions = [
    'Cebu IT Park (Lahug)',
    'Cebu Business Park',
    'Mandaue City Zone',
    'Lapu-Lapu City (MEZ)',
    'Talisay & South Area',
  ];

  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      onSuccessToast('Error: Please enter your name.');
      return;
    }
    
    // Save locally
    localStorage.setItem('cebu_talent_email', userEmail);
    localStorage.setItem('cebu_talent_pref_location', locationPreference);
    localStorage.setItem('cebu_talent_match_priority', matchingPriority);
    
    // Propagate up to main state provider
    if (user) {
      const updatedUser = { ...user, name: userName };
      localStorage.setItem('cebu_talent_user', JSON.stringify(updatedUser));
      // Triggers update on stateful parent
      window.dispatchEvent(new Event('storage'));
      // Directly call onUpdateSkills to trigger top level reload with same skills but updated name
      onUpdateSkills([...user.skills]);
    }
    
    onSuccessToast('Profile and preferences updated successfully!');
  };

  const handleSystemRestore = () => {
    if (confirm('Are you sure you want to reset all cached progress, applications, and logs?')) {
      localStorage.clear();
      onSuccessToast('All local storage cleared. Restarting app...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-16 text-white" id="settings-tab-main">
      
      {/* Settings telemetry badge */}
      <div id="settings-telemetry-intro" className="flex items-center justify-between border border-white/10 bg-white/5 p-4 rounded-lg font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#CCFF00]/10 border border-[#CCFF00]/25 text-[#CCFF00] rounded">
            <Settings className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] text-white/60 uppercase block tracking-[0.1em] mb-0.5">Control Panel</span>
            <span className="text-white text-xs font-bold uppercase tracking-wider">App Preferences</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#CCFF00] font-mono leading-none tracking-widest font-bold uppercase bg-[#CCFF00]/10 px-2 py-1 rounded border border-[#CCFF00]/20">
            Privacy Secure
          </span>
        </div>
      </div>

      {/* Profile & Identity Settings form */}
      <form onSubmit={handleProfileSave} className="glass border border-white/10 rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-[#CCFF00]/20 to-transparent"></div>
        
        <span className="text-[10px] font-bold text-[#CCFF00] tracking-[0.1em] uppercase font-mono block mb-1">
          Personal Profile
        </span>

        {/* Name input */}
        <div className="flex flex-col gap-1.5 font-mono">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/50">
            Edit Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full text-white bg-black/80 font-medium text-xs font-mono h-11 pl-10 pr-4 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none"
              required
            />
            <User className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Email input */}
        <div className="flex flex-col gap-1.5 font-mono">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            Your Email Address
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full text-white bg-black/80 font-medium text-xs font-mono h-11 px-3.5 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none"
            required
          />
          <p className="text-[10px] text-white/60 font-sans">
            Used for employer job notifications and certification updates.
          </p>
        </div>

        {/* Destination target sector */}
        <div className="flex flex-col gap-1.5 font-mono">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            Preferred Work Location in Cebu
          </label>
          <div className="relative">
            <select
              value={locationPreference}
              onChange={(e) => setLocationPreference(e.target.value)}
              className="w-full text-white bg-black/80 font-medium text-xs font-mono h-11 px-3.5 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none appearance-none cursor-pointer"
            >
              {zoneOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-[#CCFF00] absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-bold uppercase text-xs tracking-widest rounded flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer"
        >
          <span>Save Profile Preferences</span>
          <Check className="w-4 h-4 stroke-[2]" />
        </button>
      </form>

      {/* Digital Civic Resume Builder */}
      <ResumeBuilder user={user} onSuccessToast={onSuccessToast} />

      {/* Match Engine Configuration */}
      <div className="glass border border-white/10 rounded-lg p-5 flex flex-col gap-4">
        <span className="text-[10px] font-bold text-[#CCFF00] tracking-[0.1em] uppercase font-mono block">
          Job Matching Settings
        </span>

        <div className="flex flex-col gap-3 font-mono">
          {/* Priority togglers */}
          <div className="flex flex-col gap-2">
            <span className="text-white/70 text-[10px] uppercase font-bold tracking-wider">Job Match Mode</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMatchingPriority('standard');
                  localStorage.setItem('cebu_talent_match_priority', 'standard');
                  onSuccessToast('Matching priority protocol set to standard broad career matches.');
                }}
                className={`py-2.5 rounded text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                  matchingPriority === 'standard'
                    ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30'
                    : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'
                }`}
              >
                Standard Coverage
              </button>
              <button
                type="button"
                onClick={() => {
                  setMatchingPriority('high');
                  localStorage.setItem('cebu_talent_match_priority', 'high');
                  onSuccessToast('Matching priority protocol set to high rigor matching.');
                }}
                className={`py-2.5 rounded text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                  matchingPriority === 'high'
                    ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30'
                    : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'
                }`}
              >
                Strict Skills Only
              </button>
            </div>
            <span className="text-[10px] text-white/60 leading-tight font-sans">
              {matchingPriority === 'high' 
                ? 'Strict Mode: Matches jobs that require your exact, verified career skills.' 
                : 'Broad Mode: Matches jobs in your general career fields (IT, Customer Support, etc.).'}
            </span>
          </div>

          {/* Core offline control settings toggle */}
          <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-2">
            <span className="text-white/70 text-[10px] uppercase font-bold tracking-wider">Offline Simulation</span>
            <div className="flex items-center justify-between bg-black/40 border border-white/5 p-3 rounded">
              <div className="flex flex-col gap-0.5 max-w-[200px]">
                <span className="text-white font-bold text-[11px] uppercase font-sans">Simulate Offline Mode</span>
                <span className="text-[10px] text-white/60 font-sans">Turn off the network to try the offline saving feature!</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOffline(!isOffline);
                  onSuccessToast(!isOffline ? 'Offline simulator activated! You can still complete actions offline.' : 'Back online! Connected successfully.');
                }}
                className={`w-20 h-[30px] rounded transition-all font-bold text-[10px] tracking-wider uppercase cursor-pointer ${
                  isOffline 
                    ? 'bg-[#CCFF00] text-black' 
                    : 'bg-white/10 text-white/50 hover:bg-white/15'
                }`}
              >
                {isOffline ? 'Offline' : 'Online'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications and Sync config */}
      <div className="glass border border-white/10 rounded-lg p-5 flex flex-col gap-4 font-sans">
        <span className="text-[10px] font-bold text-[#CCFF00] tracking-[0.1em] uppercase block font-mono">
          Email Alerts & Notifications
        </span>

        <div className="flex flex-col gap-3 font-sans text-[11px]">
          {/* Notify new jobs query */}
          <div className="flex items-center justify-between cursor-pointer py-2 select-none" onClick={() => setNotifyNewJobs(!notifyNewJobs)}>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-white uppercase tracking-wider font-sans text-xs">Job Match Notifications</span>
              <span className="text-[10px] text-white/60 font-sans">Get alerts when a new Cebu job matches your registered skills</span>
            </div>
            <div className="w-10 h-5 bg-black border border-white/15 rounded-full p-0.5 relative flex items-center">
              <div className={`w-3.5 h-3.5 rounded-full transition-transform ${
                notifyNewJobs ? 'bg-[#CCFF00] translate-x-5' : 'bg-white/20 translate-x-0'
              }`}></div>
            </div>
          </div>

          {/* Notify offline changes logs */}
          <div className="flex items-center justify-between cursor-pointer py-2 select-none border-t border-white/5 pt-2" onClick={() => setNotifyOfflineSaves(!notifyOfflineSaves)}>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-white uppercase tracking-wider font-sans text-xs">Offline Save Alerts</span>
              <span className="text-[10px] text-white/60 font-sans">Show a banner when app data is saved to your offline device memory</span>
            </div>
            <div className="w-10 h-5 bg-black border border-white/15 rounded-full p-0.5 relative flex items-center">
              <div className={`w-3.5 h-3.5 rounded-full transition-transform ${
                notifyOfflineSaves ? 'bg-[#CCFF00] translate-x-5' : 'bg-white/20 translate-x-0'
              }`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* System info & Data reset block */}
      <div className="glass border border-white/10 rounded-lg p-5 flex flex-col gap-4 font-sans select-none">
        <span className="text-[10px] font-bold text-red-400 tracking-[0.1em] uppercase block font-mono">
          Danger Zone
        </span>

        <div className="bg-red-950/20 border border-red-900/30 p-3 rounded flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-[11px]">
            <span className="text-white font-bold uppercase">Clear App Data</span>
            <p className="text-white/70 text-[10px] leading-snug font-sans">
              This will completely reset the app. Your certificates, skill badges, job applications, progress, and settings will be permanently erased.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSystemRestore}
          className="w-full h-11 bg-red-950/45 hover:bg-red-950/60 border border-red-900/40 text-red-300 font-bold uppercase text-[11px] tracking-wide rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All App Data</span>
        </button>

        {/* Technical specifications */}
        <div className="border-t border-white/5 pt-3 flex flex-col gap-1.5 text-[10px] text-white/50 font-sans">
          <div className="flex justify-between">
            <span>Security Registration:</span>
            <span>Cebu-DPA Encrypted</span>
          </div>
          <div className="flex justify-between">
            <span>Local Database:</span>
            <span>IndexedDB Offline Cache</span>
          </div>
          <div className="flex justify-between">
            <span>App Version:</span>
            <span>v2.5.0 (Cebu Edition)</span>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <button
        type="button"
        onClick={onLogOut}
        className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase text-xs tracking-widest rounded transition-all cursor-pointer active:scale-98"
      >
        Sign Out
      </button>

    </div>
  );
}
