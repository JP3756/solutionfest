import { useState } from 'react';
import { Download, Megaphone, Briefcase, CheckCircle2, CloudLightning, Loader2, Sparkles, BookOpen, Quote, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Announcement } from '../types';
import officeCebu from '../assets/images/office_cebu_1781174008747.png';
import studentCebu from '../assets/images/student_cebu_1781173975950.png';
import cebuanoGraduateSpotlight from '../assets/images/cebuano_graduate_spotlight_1781174568618.png';
import cebuSuccessStory from '../assets/images/cebu_success_story_1781175339377.png';
import cebuWarehouseJob from '../assets/images/cebu_warehouse_job_1781175144548.png';

interface HomeTabProps {
  setCurrentTab: (tab: string) => void;
  isOffline: boolean;
  onSuccessToast: (msg: string) => void;
  user: { name: string; skills: string[] } | null;
}

export default function HomeTab({ setCurrentTab, isOffline, onSuccessToast, user }: HomeTabProps) {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [thankedStories, setThankedStories] = useState<Record<number, boolean>>({});
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann-1',
      source: 'DMDP Free Classes',
      timeAgo: '2 hours ago',
      text: 'Free Customer Support & Communication classes now open at DMDP Cebu. No college degree required!',
      type: 'update',
    },
    {
      id: 'ann-2',
      source: 'Cebu City Job Fair',
      timeAgo: 'Yesterday',
      text: 'Mega Job Fair on June 15: Over 1,200 non-degree jobs for cashiers, service crew, office helpers, and call center staff.',
      type: 'advisory',
    },
    {
      id: 'ann-3',
      source: 'Local Scholarships',
      timeAgo: '3 days ago',
      text: 'Sponsorship entries approved for free vocational certificates in Housekeeping and Food Service.',
      type: 'update',
    },
  ]);

  // Cebuano real-world success testimonies / thankfulness letters
  const successStories = [
    {
      name: "Joven M.",
      barangay: "Mambaling, Cebu City",
      role: "Customer Support (Cebu IT Park)",
      avatar: cebuanoGraduateSpotlight,
      tagline: "Hired at Cebu IT Park Hub!",
      story: "Salamat kaayo sa DMDP ug Cebu City Government! At first, I was nervous because I don't have a college degree, but the offline learning guide gave me so much confidence. I completed my digital resume here, passed the interview, and now I support my family with a stable income.",
    },
    {
      name: "Kassandra Go",
      barangay: "Guadalupe, Cebu City",
      role: "Guest Receptionist (Mactan Resort)",
      avatar: cebuSuccessStory,
      tagline: "Now a certified resort staff!",
      story: "Dako kaayo ko og pasalamat! I used the offline downloads to study BPO/Hotel communication while riding the modern jeepney. This portal is life-changing—it connected me directly to verified local employers without any complex requirements. Daghang salamat!",
    },
    {
      name: "Michael Tecson",
      barangay: "Bulacao, Cebu City",
      role: "Logistics Specialist (Mandaue Office)",
      avatar: cebuWarehouseJob,
      tagline: "Found stable salary in 2 weeks!",
      story: "I felt stuck for years because of strict job application criteria. Cebu Talent's resume builder automatically formatted my vocational volunteer work beautifully. Local businesses reached out to me through this system! Truly a blessing for everyday Cebuanos.",
    }
  ];

  const handleThankClick = (index: number) => {
    if (thankedStories[index]) return;
    setThankedStories(prev => ({ ...prev, [index]: true }));
    onSuccessToast(`You sent a Heart of Encouragement to ${successStories[index].name}!`);
  };

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
          onSuccessToast('Next Customer Service Starter Module saved offline successfully!');
          return null;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12 text-white">
      {/* Welcome telemetry badge */}
      {user && (
        <div id="welcome-telemetry-badge" className="flex items-center justify-between border border-white/10 bg-white/5 p-4 rounded-lg font-mono">
          <div>
            <span className="text-[10px] text-white/55 uppercase block tracking-[0.15em] mb-0.5">Welcome back,</span>
            <span className="text-white text-sm font-bold uppercase tracking-wider">{user.name}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/55 uppercase block tracking-[0.15em] mb-0.5">My skills</span>
            <span className="text-[#CCFF00] text-xs font-bold uppercase tracking-wider">{user.skills.length} Active</span>
          </div>
        </div>
      )}

      {/* Active Track Card - Styled with Glass and border-white/10 */}
      <div id="active-track-card" className="glass rounded-lg border border-white/10 p-5 transition-all hover:border-white/15">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#CCFF00] block uppercase mb-1 font-mono">
          Your Learning Path
        </span>
        <h2 className="text-[20px] font-bold text-white leading-snug uppercase tracking-tight mb-3 display-font">
          Customer Service & BPO Basics
        </h2>

        {/* Course Cover Image Banner */}
        <div className="relative mb-4 h-28 rounded overflow-hidden border border-white/5 shadow-inner">
          <img 
            src={officeCebu} 
            alt="Cebu IT Park Hub" 
            className="w-full h-full object-cover object-center filter saturate-110" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>
          <div className="absolute bottom-2 left-3">
            <span className="text-[9px] font-bold tracking-[0.1em] text-[#CCFF00] block uppercase font-mono leading-none">Primary Work Target</span>
            <span className="text-[11px] font-bold text-white uppercase font-sans mt-0.5 block leading-none">Cebu Business District Hub</span>
          </div>
        </div>

        {/* ProgressBar of Kinetic design */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 font-mono text-[12px] tracking-wider text-white/50">
            <span>COURSE PROGRESS</span>
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
          className={`w-full h-12 rounded flex items-center justify-center gap-2 px-4 font-bold uppercase text-xs tracking-widest transition-all ${
            downloaded
              ? 'bg-white/5 text-white/60 border border-white/10 pointer-events-none'
              : 'bg-[#CCFF00] text-black hover:bg-[#b0db00] active:scale-98 cursor-pointer'
          }`}
        >
          {downloadProgress !== null ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black stroke-[2]" />
              <span>Downloading lesson material ({downloadProgress}%)</span>
            </>
          ) : downloaded ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>Saved offline! Ready to study anywhere</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 stroke-[2]" />
              <span>Download next unit for offline learning (2.4 MB)</span>
            </>
          )}
        </button>

        {/* Info box with uppercase mono indicator */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-white/50 font-mono uppercase tracking-widest">
          <span>★ DMDP Standard Curriculum Alignment ★</span>
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
            <span className="text-[11px] text-white/60 tracking-wide block mt-0.5">Practice customer scenarios</span>
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
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-white font-mono">Cebu Jobs</h4>
            <span className="text-[11px] text-[#CCFF00] tracking-wide block mt-0.5">4 matches found!</span>
          </div>
        </button>
      </div>

      {/* Announcements */}
      <div className="mt-2">
        <h3 id="announcements-section-header" className="text-sm font-bold font-mono text-[#CCFF00] tracking-[0.1em] uppercase mb-2">
          News & Local Career Help
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
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono">
                  {ann.source} • <span className="text-[#CCFF00]">{ann.timeAgo}</span>
                </span>
                <p className="text-[14px] font-medium text-white/85 leading-relaxed">
                  {ann.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cebuano Success & Thankfulness Stories Carousel */}
      <div id="cebu-success-testimonials" className="glass rounded-lg border border-white/10 p-5 mt-2 flex flex-col gap-4 relative">
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#CCFF00]" />
            <h3 className="text-xs font-black font-mono text-[#CCFF00] uppercase tracking-wider">
              Cebuano Success Letters
            </h3>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStoryIndex(prev => (prev - 1 + successStories.length) % successStories.length)}
              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              title="Previous testimony"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-white/80" />
            </button>
            <span className="text-[10px] font-mono font-bold text-white/40">
              {activeStoryIndex + 1}/{successStories.length}
            </span>
            <button
              onClick={() => setActiveStoryIndex(prev => (prev + 1) % successStories.length)}
              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              title="Next testimony"
            >
              <ArrowRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Selected Story Display */}
        <div className="flex gap-4 items-start duration-250 animate-fade-in">
          <div className="relative shrink-0">
            <img 
              src={successStories[activeStoryIndex].avatar} 
              alt={successStories[activeStoryIndex].name} 
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg border border-white/10 object-cover filter saturate-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#CCFF00] rounded-full flex items-center justify-center border-2 border-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div>
                <h4 className="text-[13px] font-extrabold text-white leading-none">
                  {successStories[activeStoryIndex].name}
                </h4>
                <p className="text-[9.5px] font-mono text-white/50 uppercase tracking-widest mt-1">
                  {successStories[activeStoryIndex].barangay}
                </p>
              </div>
              <span className="text-[8px] font-black uppercase text-black bg-[#CCFF00]/90 px-1 py-0.5 rounded tracking-tight mt-0.5 shrink-0">
                {successStories[activeStoryIndex].role.split(' ')[0]}
              </span>
            </div>

            <p className="text-[12px] text-white/80 leading-relaxed font-sans italic mt-2 text-left">
              &ldquo;{successStories[activeStoryIndex].story}&rdquo;
            </p>

            <span className="text-[10px] text-[#CCFF00]/80 font-mono font-bold mt-1.5 uppercase block tracking-wider text-left">
              Current Job: {successStories[activeStoryIndex].role}
            </span>
          </div>
        </div>

        {/* Footer Actions / Encouragements */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1 text-[11px]">
          <span className="text-white/40 font-mono uppercase text-[9px] tracking-wider">
            {successStories[activeStoryIndex].tagline}
          </span>
          <button
            onClick={() => handleThankClick(activeStoryIndex)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all active:scale-95 cursor-pointer ${
              thankedStories[activeStoryIndex]
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/5 hover:border-white/15'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${thankedStories[activeStoryIndex] ? 'fill-current text-red-500' : ''}`} />
            <span className="font-bold tracking-tight">
              {thankedStories[activeStoryIndex] ? 'Encouraged! (152)' : 'Send Heart (151)'}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive DMDP Alignment Guidance Panel with lime accent borders */}
      <div id="local-tip-box" className="mt-2 bg-[#CCFF00]/5 border border-[#CCFF00]/20 p-4 rounded-lg">
        <div className="flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#CCFF00] font-mono">Independent Civic Career Portal</h4>
            <div className="text-[13px] text-white/80 leading-relaxed mt-1 font-light flex flex-col gap-2">
              <p>
                This application is an **independent community-developed platform** designed to support jobseekers in Cebu. We are **NOT affiliated with, endorsed by, or an official system of the Cebu City Government or the Department of Manpower Development and Placement (DMDP)**. All features are built to guide you in structuring your skills to match common local industry practices.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-md p-2.5 mt-1">
                <span className="font-bold text-[#CCFF00] uppercase text-[10px] block mb-1 font-mono">// HOW TO APPLY FOR LOCAL PROGRAMS:</span>
                <p className="text-[12px] text-white/90">
                  You can use the <strong>Resume Builder</strong> here to structure your bio, download the print-ready PDF, and then bring it physically to the <strong>DMDP Office (Ramos, Cebu City)</strong> or regional hiring events to submit your application in person!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
