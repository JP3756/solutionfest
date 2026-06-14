import { useState, useEffect } from 'react';
import { Briefcase, Users, Star, GraduationCap, MapPin, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { User, Job, JobApplication } from '../types';

interface EmployerHomeTabProps {
  user: User | null;
  setCurrentTab: (tab: string) => void;
  onSuccessToast: (msg: string) => void;
}

export default function EmployerHomeTab({ user, setCurrentTab, onSuccessToast }: EmployerHomeTabProps) {
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [shortlistedCount, setShortlistedCount] = useState(0);

  useEffect(() => {
    // Calculate stats
    const savedJobs = localStorage.getItem('cebu_jobs_list');
    const jobs: Job[] = savedJobs ? JSON.parse(savedJobs) : [];
    const myJobs = jobs.filter(j => j.id.startsWith('employer-') || j.closesSoon); // simulate employer ownerships too
    setActiveJobsCount(myJobs.length || 2);

    const savedApps = localStorage.getItem('cebu_applications_list');
    const apps: JobApplication[] = savedApps ? JSON.parse(savedApps) : [];
    setApplicantsCount(apps.length);

    const shortlisted = apps.filter(a => a.status === 'Shortlisted').length;
    // Also check pre-seeded shortlists
    const savedShortlistKeys = localStorage.getItem('cebu_shortlisted_candidates');
    const candShortCount = savedShortlistKeys ? JSON.parse(savedShortlistKeys).length : 0;
    setShortlistedCount(shortlisted + candShortCount);
  }, []);

  // Quick statistics cards layout
  const stats = [
    {
      id: 'active-listings',
      label: 'My Active Openings',
      value: activeJobsCount,
      desc: 'Posted vacant slots in Cebu',
      icon: Briefcase,
      color: '#CCFF00',
      tab: 'employer-post-job'
    },
    {
      id: 'talents-view',
      label: 'Applicants Received',
      value: applicantsCount,
      desc: 'Form submissions from seekers',
      icon: Users,
      color: '#38bdf8',
      tab: 'employer-post-job'
    },
    {
      id: 'shortlist-view',
      label: 'Shortlisted Talent',
      value: shortlistedCount,
      desc: 'Graduates aligned for contact',
      icon: Star,
      color: '#f43f5e',
      tab: 'employer-talent'
    }
  ];

  return (
    <div className="flex flex-col gap-5 animate-fade-in text-white pb-8">
      {/* Immersive Welcome Hub Header */}
      <div id="employer-intro-card" className="glass border border-white/10 p-5 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-[#CCFF00]/30 to-transparent"></div>
        <span className="text-[10px] font-bold text-[#CCFF00] tracking-[0.2em] uppercase font-mono block">
          Corporate Console
        </span>
        <h2 className="text-xl font-bold uppercase tracking-wide text-white font-sans mt-1">
          {user?.companyName || 'Cebu Enterprise'}
        </h2>
        
        <div className="flex items-center gap-2 mt-1.5 bg-white/5 border border-white/10 rounded px-2.5 py-1 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span>
          <span className="text-[9.5px] font-mono text-zinc-300 font-bold uppercase tracking-wider">
            Sector Matcher: {user?.industry || 'General Trade'}
          </span>
        </div>

        <p className="text-[11px] text-white/70 font-sans tracking-wide leading-relaxed mt-2.5 max-w-[325px]">
          Hello, <strong className="text-white">{user?.name || 'Recruiter'}</strong>. Manage your recruitment campaigns, filter vocational candidates, and check real-time skills alignments across our local Cebuano talent pipeline.
        </p>
      </div>

      {/* Recruiter Stats Dashboard Grid */}
      <div className="grid grid-cols-1 gap-3" id="employer-stats-grid">
        {stats.map((stat) => (
          <button
            key={stat.id}
            onClick={() => setCurrentTab(stat.tab)}
            className="glass hover:border-white/20 border border-white/10 rounded-lg p-4 text-left transition-all relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#CCFF00]/10 to-transparent"></div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider font-mono">
                  {stat.label}
                </span>
                <span className="text-2xl font-black block mt-0.5" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-[10px] text-zinc-400 mt-0.5 block font-sans">
                  {stat.desc}
                </span>
              </div>
              <div 
                className="p-3 rounded-lg flex items-center justify-center border transition-colors"
                style={{ backgroundColor: `${stat.color}10`, borderColor: `${stat.color}25` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Cebu-specific Hiring Guidelines & Market Data */}
      <div className="glass border border-white/10 rounded-lg p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <TrendingUp className="w-4 h-4 text-[#CCFF00]" />
          <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-[#CCFF00]">
            Cebu Talent Insights & Guidelines
          </span>
        </div>

        <div className="flex flex-col gap-2.5 text-[10.5px] font-sans text-zinc-300">
          <div className="bg-black/50 border border-white/5 p-2.5 rounded">
            <span className="font-bold text-[#CCFF00] uppercase block mb-1">
              • Upskill-first Recruitment Advantage
            </span>
            <p className="leading-snug">
              Cebu candidates are taking free local digital training modules. When shortlisting, prioritize candidates with completed badges in English Conversation or Customer Support communication.
            </p>
          </div>

          <div className="bg-black/50 border border-white/5 p-2.5 rounded">
            <span className="font-bold text-[#CCFF00] uppercase block mb-1">
              • standard Salary Regulations
            </span>
            <p className="leading-snug">
              Average entry salaries range from PHP 14,000 for local warehouse clerks to PHP 20,000+ inside Cebu IT Park call-center agencies.
            </p>
          </div>

          <div className="bg-black/50 border border-white/5 p-2.5 rounded flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-white uppercase">Is it safe to recruit offline?</span>
              <p className="leading-snug">
                Yes! This portal maintains all shortlist flags, filters, and offline applications in device storage and synchronizes instantly once internet is restored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
