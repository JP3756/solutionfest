import { useState } from 'react';
import { Download, Megaphone, Briefcase, CheckCircle2, CloudLightning, Loader2, Sparkles, BookOpen, Quote, Heart, ArrowRight, ArrowLeft, Check, Award } from 'lucide-react';
import { Announcement } from '../types';
import officeCebu from '../assets/images/office_cebu_1781174008747.png';
import studentCebu from '../assets/images/student_cebu_1781173975950.png';
import cebuanoGraduateSpotlight from '../assets/images/cebuano_graduate_spotlight_1781174568618.png';
import cebuSuccessStory from '../assets/images/cebu_success_story_1781175339377.png';
import cebuWarehouseJob from '../assets/images/cebu_warehouse_job_1781175144548.png';

const SECTOR_ROADMAPS = [
  {
    id: 'bpo-tech',
    title: 'BPO & Support',
    emoji: '📞',
    salaryRange: 'PHP 16,000 - PHP 26,000',
    hiringHubs: 'Cebu IT Park (Lahug), Cebu Business Park (Mabolo)',
    demandLevel: 'Very High',
    skills: ['Customer Support', 'Polite Communication', 'English Conversation'],
    description: 'Cebu’s biggest employment driver. Exceptional opportunities for high school and vocational graduates with solid English fluency.',
    tips: 'SMEs and multinational brands in Lahug recruit yearly. Practice English speaking with local radio or call-center simulation guides!'
  },
  {
    id: 'tourism-hospitality',
    title: 'Hospitality & Tourism',
    emoji: '🌴',
    salaryRange: 'PHP 13,000 - PHP 20,000',
    hiringHubs: 'Mactan Resorts (Lapu-Lapu), IT Park Food Hubs',
    demandLevel: 'High',
    skills: ['Polite Communication', 'Hotel & Housekeeping Support', 'English Conversation'],
    description: 'World-renowned Cebu hotels and restaurants require proactive, friendly front-office receptionists and guest support personnel.',
    tips: 'Cebu Academy for Vocational Tourism runs affordable weekend trainings. Great for energetic, service-oriented young individuals!'
  },
  {
    id: 'retail-clerical',
    title: 'Retail & Office Services',
    emoji: '🛍️',
    salaryRange: 'PHP 12,500 - PHP 18,000',
    hiringHubs: 'SM Seaside (Mambaling), SM City Cebu, Colon Street',
    demandLevel: 'Steady',
    skills: ['Basic Computer Skills', 'Data Typing & Entry', 'Office Filing & Clerical', 'Retail Sales & Cashiering'],
    description: 'General support positions in local stores, accounting outlets, and small business backend filing centers.',
    tips: 'A strong grasp of search sheets, modern inventory apps, and quick typing is highly prized by older business districts in Downtown Cebu.'
  },
  {
    id: 'logistics-ports',
    title: 'Logistics & Shipping',
    emoji: '🚢',
    salaryRange: 'PHP 14,000 - PHP 21,000',
    hiringHubs: 'Mandaue Reclamation, Cebu Port Authority Area, Consolacion',
    demandLevel: 'High',
    skills: ['Inventory Management', 'Basic Computer Skills', 'Willing to Learn'],
    description: 'Fast-paced loading, sorting, inventory checking, and distribution jobs for Cebu’s key national trading shipping lines.',
    tips: 'Safety credentials and inventory system familiarity will easily place you ahead of common untrained applicants.'
  }
];

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
  const [activeSectorId, setActiveSectorId] = useState<string>('bpo-tech');
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann-1',
      source: 'Cebu Career Training',
      timeAgo: '2 hours ago',
      text: 'Free Customer Support & Communication classes now open in Cebu. No college degree required!',
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
      story: "Salamat kaayo sa Cebu local trainers! At first, I was nervous because I don't have a college degree, but the offline learning guide gave me so much confidence. I completed my digital resume here, passed the interview, and now I support my family with a stable income.",
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
          <span>★ Cebu Industry Standard Curriculum ★</span>
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

      {/* Cebu Industry Sector & Demand Explorer */}
      <div id="solution-canvas-deck" className="glass rounded-lg border border-[#CCFF00]/30 bg-gradient-to-br from-[#CCFF00]/5 to-black/40 p-5 mt-2 flex flex-col gap-4 relative overflow-hidden">
        {/* Neon decorative background glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#CCFF00]/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#CCFF00]" />
            <h3 className="text-sm font-black font-mono text-white uppercase tracking-wider">
              Cebu Industry Sector & Livelihood Explorer
            </h3>
          </div>
          <span className="text-[8px] font-mono font-bold text-black bg-[#CCFF00] px-2 py-0.5 rounded uppercase leading-none">
            Local Demand Trends
          </span>
        </div>

        {/* Tagline / Core Statement */}
        <div className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-md">
          <span className="text-[8px] font-mono font-bold text-[#CCFF00]/60 block uppercase tracking-widest leading-none mb-1">// DYNAMIC CAREER INSIGHT</span>
          <p className="text-[13px] font-light leading-relaxed text-white/90 font-sans">
            Explore Cebu's high-demand career sectors, anticipated regional salaries, and check how well your registered skills align with modern hiring requirements!
          </p>
        </div>

        {/* Interactive Selector Pill Navigation */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-white/5 font-mono text-[10px]">
          {SECTOR_ROADMAPS.map((sector) => (
            <button
              key={sector.id}
              onClick={() => {
                setActiveSectorId(sector.id);
                onSuccessToast(`Viewing ${sector.title} career roadmap`);
              }}
              className={`px-3 py-2 rounded transition-all whitespace-nowrap uppercase font-bold border cursor-pointer flex items-center gap-1.5 ${
                activeSectorId === sector.id
                  ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-black'
                  : 'bg-white/5 hover:bg-white/10 text-white/50 border-white/10'
              }`}
            >
              <span>{sector.emoji}</span>
              <span>{sector.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Sector Details Content */}
        {(() => {
          const currentSector = SECTOR_ROADMAPS.find((m) => m.id === activeSectorId) || SECTOR_ROADMAPS[0];
          const userSkillsList = user?.skills || [];

          return (
            <div className="text-left py-1 animate-fade-in flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>{currentSector.emoji}</span>
                    <span>{currentSector.title} Roadmap</span>
                  </h4>
                  <p className="text-xs text-[#CCFF00]/80 font-mono mt-1 font-bold uppercase tracking-wider">
                    Demand Urgency: {currentSector.demandLevel} in Metro Cebu
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded px-3 py-1.5 font-mono shrink-0">
                  <span className="text-[8px] text-white/45 block uppercase tracking-widest leading-none">Starting Salaries</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{currentSector.salaryRange}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-white/45 font-bold uppercase tracking-widest block leading-none">
                    Sector Hubs & Geography
                  </span>
                  <p className="text-xs text-white/90 leading-relaxed font-sans mt-0.5 bg-white/5 p-3 rounded border border-white/5">
                    📍 <strong>Key Workplaces:</strong> {currentSector.hiringHubs}
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed font-sans mt-1">
                    {currentSector.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-white/45 font-bold uppercase tracking-widest block leading-none">
                    Required Core Skillset & Alignment
                  </span>
                  <div className="flex flex-col gap-1.5 mt-1.5">
                    {currentSector.skills.map((skill) => {
                      const hasSkill = userSkillsList.some((us) => us.toLowerCase() === skill.toLowerCase());
                      return (
                        <div
                          key={skill}
                          className={`flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-bold border transition-colors ${
                            hasSkill
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                              : 'bg-[#a0a0a0]/5 text-white/50 border-white/5'
                          }`}
                        >
                          <span className="uppercase">{skill}</span>
                          <span className={`text-[8.5px] px-1.5 py-0.5 rounded font-bold uppercase border ${
                            hasSkill
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15'
                              : 'bg-white/5 text-white/40 border-white/10'
                          }`}>
                            {hasSkill ? '✓ Certified' : '✕ Missing'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Local Pro Tips */}
              <div className="bg-[#CCFF00]/5 border border-[#CCFF00]/15 p-3 rounded text-xs text-white/80 leading-relaxed font-sans flex items-start gap-2 mt-1">
                <span className="text-[#CCFF00 ] shrink-0 font-bold font-mono">💡 LOCAL INSIDER TIP:</span>
                <p>
                  {currentSector.tips}
                </p>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('jobs');
                    onSuccessToast(`Opening Cebu Job listings filtered for ${currentSector.title}!`);
                  }}
                  className="bg-[#CCFF00] hover:bg-[#b5e000] text-black font-black uppercase text-xs px-4 py-2.5 rounded transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Search {currentSector.title} Jobs</span>
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Interactive Guidance Panel with lime accent borders */}
      <div id="local-tip-box" className="mt-2 bg-[#CCFF00]/5 border border-[#CCFF00]/20 p-4 rounded-lg">
        <div className="flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#CCFF00] font-mono">Cebu Career Portal</h4>
            <div className="text-[13px] text-white/80 leading-relaxed mt-1 font-light flex flex-col gap-2">
              <p>
                This application is a **community-first career companion** designed to empower and prepare jobseekers in Cebu. All features are built to guide you in structuring your skills, credentials, and resumes to align directly with modern local industry requirements.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-md p-2.5 mt-1">
                <span className="font-bold text-[#CCFF00] uppercase text-[10px] block mb-1 font-mono">// HOW TO APPLY FOR CEBU JOBS:</span>
                <p className="text-[12px] text-white/90">
                  You can use the <strong>Resume Builder</strong> here to structure your profile, download your print-ready PDF, and then present it physically or upload it to local recruitment hubs and job events to submit your application directly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
