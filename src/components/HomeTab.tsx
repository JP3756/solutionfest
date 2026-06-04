import { useState } from 'react';
import { Download, Megaphone, Briefcase, CheckCircle2, CloudLightning, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { Announcement } from '../types';

interface HomeTabProps {
  setCurrentTab: (tab: string) => void;
  isOffline: boolean;
  onSuccessToast: (msg: string) => void;
}

export default function HomeTab({ setCurrentTab, isOffline, onSuccessToast }: HomeTabProps) {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann-1',
      source: 'DMDP Update',
      timeAgo: '2 hours ago',
      text: 'New IT-BPM Training Vouchers Available for displaced workers in IT Park.',
      type: 'update',
    },
    {
      id: 'ann-2',
      source: 'CIB.O Advisory',
      timeAgo: 'Yesterday',
      text: 'Upcoming Virtual Job Fair focusing on mid-level tech roles. Registration opens next week.',
      type: 'advisory',
    },
    {
      id: 'ann-3',
      source: 'Cebu City Gov',
      timeAgo: '3 days ago',
      text: 'Sponsorship grants approved for 250 new scholars in Mobile App Development program.',
      type: 'update',
    },
  ]);

  // Handle Download simulation
  const handleDownload = () => {
    if (downloaded) {
      onSuccessToast('Module is already available offline!');
      return;
    }
    
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloaded(true);
          onSuccessToast('Next ServiceNow Micro-Module saved offline successfully!');
          return null;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12 text-white">
      {/* Active Track Card - Styled with Glass and border-white/10 */}
      <div id="active-track-card" className="glass rounded-lg border border-white/10 p-5 transition-all hover:border-white/15">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#CCFF00] block uppercase mb-1 font-mono">
          // ACTIVE SYSTEM TRACK
        </span>
        <h2 className="text-[20px] font-black text-white leading-snug uppercase tracking-tight mb-4 display-font">
          Voice Agent to ServiceNow Developer
        </h2>

        {/* ProgressBar of Kinetic design */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 font-mono text-[12px] tracking-wider text-white/50">
            <span>COURSE MODULE COMPLETED</span>
            <span className="text-[#CCFF00] font-bold">{downloaded ? '70%' : '60%'}</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-sm overflow-hidden">
            <div 
              className="bg-[#CCFF00] h-full transition-all duration-500" 
              style={{ width: downloaded ? '70%' : '60%' }}
            ></div>
          </div>
        </div>

        {/* Download Button with Neon Acid Green / Accent Spec */}
        <button
          id="download-module-btn"
          onClick={handleDownload}
          disabled={downloadProgress !== null}
          className={`w-full h-12 rounded flex items-center justify-center gap-2 px-4 font-black uppercase text-xs tracking-widest transition-all ${
            downloaded
              ? 'bg-white/5 text-white/60 border border-white/10 pointer-events-none'
              : 'bg-[#CCFF00] text-black hover:bg-[#b0db00] active:scale-98 cursor-pointer'
          }`}
        >
          {downloadProgress !== null ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black stroke-[3]" />
              <span>DOWNLOADING LESSON ({downloadProgress}%)</span>
            </>
          ) : downloaded ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>MICRO-MODULE SYNCED OFFLINE</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 stroke-[3]" />
              <span>DOWNLOAD NEXT MODULE (2.4 MB)</span>
            </>
          )}
        </button>

        {/* Info box with uppercase mono indicator */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-white/45 font-mono uppercase tracking-widest">
          <span>CURRICULUM SOURCE: DMDP X SERVICENOW</span>
        </div>
      </div>

      {/* Action shortcuts block */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          id="nav-to-study-btn"
          onClick={() => setCurrentTab('learn')}
          className="glass p-4 rounded-lg border border-white/10 flex flex-col gap-2 hover:border-[#CCFF00]/40 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-white font-mono">Resume Lesson</h4>
            <span className="text-[11px] text-white/50 tracking-wide block mt-0.5">Practice Brandings</span>
          </div>
        </button>

        <button 
          id="nav-to-jobs-btn"
          onClick={() => setCurrentTab('jobs')}
          className="glass p-4 rounded-lg border border-white/10 flex flex-col gap-2 hover:border-[#CCFF00]/40 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white/70">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-white font-mono">Cebu Placements</h4>
            <span className="text-[11px] text-[#CCFF00] tracking-wide block mt-0.5">4 Sync Matches</span>
          </div>
        </button>
      </div>

      {/* Announcements */}
      <div className="mt-2">
        <h3 id="announcements-section-header" className="text-sm font-black font-mono text-[#CCFF00] tracking-[0.25em] uppercase mb-2">
          // LIVELIHOOD & INCUBATION REPORTS
        </h3>
        <div className="w-full h-[1px] bg-white/10 mb-4"></div>

        <div className="flex flex-col gap-4">
          {announcements.map((ann) => (
            <div 
              key={ann.id}
              className="glass rounded-lg border border-white/10 p-4 flex gap-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* Icon Container with subtle glass overlay */}
              <div 
                className="w-11 h-11 shrink-0 rounded bg-white/5 text-[#CCFF00] border border-white/10 flex items-center justify-center"
              >
                {ann.type === 'update' ? (
                  <Megaphone className="w-4.5 h-4.5" />
                ) : (
                  <Briefcase className="w-4.5 h-4.5" />
                )}
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  {ann.source} // <span className="text-[#CCFF00]">{ann.timeAgo}</span>
                </span>
                <p className="text-[14px] font-medium text-white/85 leading-relaxed">
                  {ann.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Interactive Suggestion Sandbox with lime-scent highlight borders */}
      <div id="local-tip-box" className="mt-2 bg-[#CCFF00]/5 border border-[#CCFF00]/20 p-4 rounded-lg">
        <div className="flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-[#CCFF00] font-mono">Cebu System Alert</h4>
            <p className="text-[13px] text-white/70 leading-relaxed mt-1 font-light">
              {isOffline 
                ? 'Your upskilling log is securely pocketed offline. Feel free to resume training, answer validation quizzes, or apply with your Digital Passport. Your metrics will hot-sync automatically on reconnection.' 
                : 'CIB.O live networks are refreshed. Your credentials passport gives you direct prioritization for partner company roles.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
