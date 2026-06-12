import { useState } from 'react';
import { 
  MapPin, 
  Banknote, 
  Briefcase, 
  Bookmark, 
  Check, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Clock, 
  X, 
  BadgeCheck,
  Compass, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  ArrowDownUp
} from 'lucide-react';
import { Job } from '../types';
import officeCebu from '../assets/images/office_cebu_1781174008747.png';
import cebuWarehouseJob from '../assets/images/cebu_warehouse_job_1781175144548.png';
import cebuResortJob from '../assets/images/cebu_resort_job_1781175164407.png';
import cebuRetailJob from '../assets/images/cebu_retail_job_1781175182572.png';

const TARGET_CAREERS = [
  {
    name: 'Customer Support (BPO)',
    category: 'Tech',
    requiredSkills: ['Customer Support', 'Polite Communication', 'English Conversation'],
    recommendedCourse: 'Customer Communication Excellence',
    courseProvider: 'Cebu Virtual College & TESDA Alignment',
    estHours: '20 Hours'
  },
  {
    name: 'Office Filing & Data Clerk',
    category: 'Tech',
    requiredSkills: ['Basic Computer Skills', 'Data Typing & Entry', 'Office Filing & Clerical'],
    recommendedCourse: 'Digital Literacy & Modern Spreadsheets',
    courseProvider: 'Cebu Institute of Tech & Public Access Guides',
    estHours: '15 Hours'
  },
  {
    name: 'Hotel Guest Receptionist',
    category: 'Hospitality',
    requiredSkills: ['Polite Communication', 'Hotel & Housekeeping Support', 'English Conversation'],
    recommendedCourse: 'Tourism & Front-Office Hospitality Essentials',
    courseProvider: 'Cebu Academy for Vocational Tourism',
    estHours: '25 Hours'
  },
  {
    name: 'Retail Store Associate',
    category: 'Retail',
    requiredSkills: ['Retail Sales & Cashiering', 'Basic Computer Skills', 'Willing to Learn'],
    recommendedCourse: 'Point-of-Sale Systems & Customer Service Training',
    courseProvider: 'Sugbo Enterprise Retail Association',
    estHours: '12 Hours'
  }
];

interface JobsTabProps {
  isOffline: boolean;
  onSuccessToast: (msg: string) => void;
  userSkills?: string[];
}

export default function JobsTab({ isOffline, onSuccessToast, userSkills = [] }: JobsTabProps) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('All Industries');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Job Application & Saving state
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showApplyModal, setShowApplyModal] = useState<Job | null>(null);

  // UpSkills Gap Analyzer state
  const [showAnalyzer, setShowAnalyzer] = useState<boolean>(false);
  const [targetCareerInput, setTargetCareerInput] = useState<string>('Customer Support (BPO)');

  const categories = ['All Industries', 'Tech', 'Logistics', 'Hospitality', 'Retail'];

  const initialJobs: Job[] = [
    {
      id: 'job-1',
      title: 'Customer Support Associate (BPO)',
      location: 'Cebu IT Park, Lahug',
      salary: 'PHP 18,000 - 24,000',
      description: 'Help answer questions from global clients via phone and live chat. No experience or college degree required — full paid training provided! High school graduate or senior high school graduate is welcome.',
      tags: ['Customer Support', 'English Conversation', 'No Degree Required', 'Full-time'],
      category: 'Tech'
    },
    {
      id: 'job-2',
      title: 'Warehouse Logistics Helper',
      location: 'Mandaue Logistics Hub',
      salary: 'PHP 14,000 - 17,000',
      description: 'Assist in sorting, checking, and packing daily shop packages in our safe, modern warehouse. Requires good health and a warm team attitude. High school grads are welcome!',
      tags: ['Basic Computer Skills', 'No Degree Required', 'Immediate Start', 'Shift Work'],
      category: 'Logistics'
    },
    {
      id: 'job-3',
      title: 'Hotel Receptionist & Guest Associate',
      location: 'Lapu-Lapu Resort Strip',
      salary: 'PHP 16,000 - 19,000',
      description: 'Greet checking guests, register arrivals, and help with guest requests in a warm Cebuano tone. High school graduates with friendly communication confidence are highly encouraged to join us.',
      tags: ['English Conversation', 'Polite Communication', 'No Degree Required', 'On-site'],
      closesSoon: true,
      category: 'Hospitality'
    },
    {
      id: 'job-4',
      title: 'Retail Store Cashier & Assistant',
      location: 'Banilad Commerce Center',
      salary: 'PHP 13,000 - 15,000',
      description: 'Scan item barcodes, process cashier transactions, and help organize display shelves. No college degree required. Full on-the-job training provided!',
      tags: ['Retail Sales & Cashiering', 'No Degree Required', 'On-site', 'Full-time'],
      category: 'Retail'
    }
  ];

  const handleApplyClick = (job: Job) => {
    if (appliedJobs.includes(job.id)) {
      onSuccessToast(`You have already applied for ${job.title}!`);
      return;
    }
    // Launch Apply Confirmation Modal
    setShowApplyModal(job);
  };

  const confirmApply = () => {
    if (!showApplyModal) return;
    const job = showApplyModal;
    setAppliedJobs((prev) => [...prev, job.id]);
    setShowApplyModal(null);

    if (isOffline) {
      onSuccessToast(`Saved Offline! Application for ${job.title} queued to sync when online.`);
    } else {
      onSuccessToast(`Applied! Your profile with registered skills was transmitted securely to the recruitment team.`);
    }
  };

  const handleSaveToggle = (jobId: string, jobTitle: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs((prev) => prev.filter((id) => id !== jobId));
      onSuccessToast(`Removed ${jobTitle} from Saved Jobs.`);
    } else {
      setSavedJobs((prev) => [...prev, jobId]);
      onSuccessToast(`Saved ${jobTitle}! You can review this post anytime.`);
    }
  };

  // Filter computation
  const filteredJobs = initialJobs.filter((job) => {
    const categoryMatches = 
      selectedCategory === 'All Industries' || job.category === selectedCategory;
    const searchMatches = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <div className="flex flex-col gap-4 animate-fade-in pb-12 text-white">
      {/* Interactive Cebu Job Match Score & Skill Gap Analyzer */}
      <div id="commute-estimator" className="glass rounded-lg border border-white/10 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => {
            setShowAnalyzer(!showAnalyzer);
            if (!showAnalyzer) {
              onSuccessToast("Cebu Job Match & Gap Analyzer active. Pick your target career!");
            }
          }}
          className="w-full px-3 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors gap-1.5"
        >
          <div className="flex items-center gap-1.5 text-white min-w-0 flex-1">
            <Compass className="w-4 h-4 text-[#CCFF00] shrink-0" />
            <span className="font-bold text-[11px] sm:text-[13px] uppercase tracking-tight sm:tracking-wider font-mono truncate">
              Cebu Upskill & Matching Analyzer
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-1.5 py-0.5 rounded border border-[#CCFF00]/15 uppercase tracking-wider whitespace-nowrap">
              {showAnalyzer ? 'Hide' : 'Open'}
            </span>
            {showAnalyzer ? (
              <ChevronUp className="w-3.5 h-3.5 text-white/60" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-white/60" />
            )}
          </div>
        </button>

        {showAnalyzer && (
          <div className="px-3 pb-4 border-t border-white/5 pt-3 flex flex-col gap-3.5 animate-slide-down">
            <p className="text-[11px] sm:text-xs text-white/75 font-sans leading-relaxed">
              Understand how close you are to landing your target career path in Cebu. We will check your current skills, highlight gaps, and recommend direct accredited upskilling paths!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              {/* Selector 1: Target Career */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-white/50 uppercase tracking-widest font-bold">
                  Target Career Role
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="analyzer-career-select"
                    value={targetCareerInput}
                    onChange={(e) => {
                      setTargetCareerInput(e.target.value);
                    }}
                    placeholder="E.g., Software, BPO, Sales..."
                    className="w-full text-xs h-10 px-3 border border-white/10 rounded bg-[#0a0a0a] text-white focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/15 outline-none font-bold uppercase tracking-wide cursor-text placeholder-white/30"
                  />
                </div>
              </div>

              {/* Quick Info Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-white/50 uppercase tracking-widest font-bold font-mono">
                  Current Certified Talents
                </label>
                <div className="min-h-10 py-1.5 px-2.5 bg-white/5 border border-white/10 rounded flex items-center justify-between gap-1 text-[10.5px] sm:text-xs text-white/80 font-bold">
                  <span className="truncate">{userSkills.length} SKILLS ACTIVE</span>
                  <span className="text-emerald-400 font-mono text-[8px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/15 shrink-0">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Compute and Render Math */}
            {(() => {
              const inputLower = targetCareerInput.toLowerCase();
              let career = TARGET_CAREERS.find((tc) => tc.name.toLowerCase() === inputLower);
              
              if (!career) {
                // Look for substring matches
                const matchedStatic = TARGET_CAREERS.find((tc) => 
                  tc.name.toLowerCase().includes(inputLower) || 
                  inputLower.includes(tc.name.toLowerCase())
                );
                
                if (matchedStatic) {
                  career = matchedStatic;
                } else {
                  // Generate custom career dynamic schema
                  if (inputLower.includes('bpo') || inputLower.includes('support') || inputLower.includes('call') || inputLower.includes('agent') || inputLower.includes('chat') || inputLower.includes('service') || inputLower.includes('customer')) {
                    career = {
                      name: targetCareerInput || 'Customer Support',
                      category: 'Tech',
                      requiredSkills: ['Customer Support', 'Polite Communication', 'English Conversation'],
                      recommendedCourse: 'Customer Communication Excellence',
                      courseProvider: 'Cebu Virtual College & TESDA Alignment',
                      estHours: '20 Hours'
                    };
                  } else if (inputLower.includes('clerk') || inputLower.includes('data') || inputLower.includes('office') || inputLower.includes('file') || inputLower.includes('entry') || inputLower.includes('typing') || inputLower.includes('admin') || inputLower.includes('secretary')) {
                    career = {
                      name: targetCareerInput || 'Office Clerk',
                      category: 'Tech',
                      requiredSkills: ['Basic Computer Skills', 'Data Typing & Entry', 'Office Filing & Clerical'],
                      recommendedCourse: 'Digital Literacy & Modern Spreadsheets',
                      courseProvider: 'Cebu Institute of Tech & Public Access Guides',
                      estHours: '15 Hours'
                    };
                  } else if (inputLower.includes('hotel') || inputLower.includes('reception') || inputLower.includes('guest') || inputLower.includes('waiter') || inputLower.includes('tourist') || inputLower.includes('hospitality') || inputLower.includes('resort')) {
                    career = {
                      name: targetCareerInput || 'Guest Receptionist',
                      category: 'Hospitality',
                      requiredSkills: ['Polite Communication', 'Hotel & Housekeeping Support', 'English Conversation'],
                      recommendedCourse: 'Tourism & Front-Office Hospitality Essentials',
                      courseProvider: 'Cebu Academy for Vocational Tourism',
                      estHours: '25 Hours'
                    };
                  } else if (inputLower.includes('retail') || inputLower.includes('store') || inputLower.includes('cashier') || inputLower.includes('sales') || inputLower.includes('seller') || inputLower.includes('market')) {
                    career = {
                      name: targetCareerInput || 'Retail Associate',
                      category: 'Retail',
                      requiredSkills: ['Retail Sales & Cashiering', 'Basic Computer Skills', 'Willing to Learn'],
                      recommendedCourse: 'Point-of-Sale Systems & Customer Service Training',
                      courseProvider: 'Sugbo Enterprise Retail Association',
                      estHours: '12 Hours'
                    };
                  } else if (inputLower.includes('programmer') || inputLower.includes('developer') || inputLower.includes('software') || inputLower.includes('code') || inputLower.includes('it') || inputLower.includes('web')) {
                    career = {
                      name: targetCareerInput || 'Software Developer',
                      category: 'Tech',
                      requiredSkills: ['Basic Computer Skills', 'Problem Solving', 'Willing to Learn'],
                      recommendedCourse: 'Introduction to Modern Digital Technology & Coding',
                      courseProvider: 'Sugbo IT Training Centers',
                      estHours: '30 Hours'
                    };
                  } else {
                    career = {
                      name: targetCareerInput || 'Custom Career Choice',
                      category: 'General',
                      requiredSkills: ['Problem Solving', 'Willing to Learn', 'Polite Communication'],
                      recommendedCourse: 'Vocational Work Ethic & Practical Livelihood Skills',
                      courseProvider: 'TESDA Cebu Accredited Livelihood Center',
                      estHours: '16 Hours'
                    };
                  }
                }
              }
              
              // Calculate matches and gaps
              const matchedSkillsList = career.requiredSkills.filter(
                (reqSkill) => userSkills.some((userSkill) => userSkill.toLowerCase() === reqSkill.toLowerCase())
              );
              const missingSkillsList = career.requiredSkills.filter(
                (reqSkill) => !userSkills.some((userSkill) => userSkill.toLowerCase() === reqSkill.toLowerCase())
              );

              const totalCount = career.requiredSkills.length;
              const matchedCount = matchedSkillsList.length;
              const matchScorePercentage = Math.round((matchedCount / totalCount) * 100);

              return (
                <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono flex flex-col gap-3.5 text-left text-white animate-fade-in">
                  <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                    <div>
                      <span className="text-[8.5px] uppercase text-[#CCFF00]/80 block tracking-widest leading-none mb-1">Target Skill Alignment</span>
                      <span className="text-xs font-bold text-white uppercase">{career.name} Standard Syllabus</span>
                    </div>
                    <span className="text-[8px] font-black uppercase text-black bg-[#CCFF00] px-1.5 py-0.5 rounded shrink-0">
                      {career.category} Field
                    </span>
                  </div>

                  {/* Skill checklist grids */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-emerald-500/5 p-3 border border-emerald-500/15 rounded">
                      <span className="text-[8px] text-emerald-400 block uppercase tracking-widest font-bold">Skills Matched ({matchedCount}/{totalCount})</span>
                      {matchedCount > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {matchedSkillsList.map((sk) => (
                            <span key={sk} className="text-[9.5px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase truncate">
                              ✓ {sk}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10.5px] text-white/50 block mt-2">No starting skills match yet.</span>
                      )}
                    </div>

                    <div className="bg-red-500/5 p-3 border border-red-500/15 rounded">
                      <span className="text-[8px] text-red-400 block uppercase tracking-widest font-bold">Gaps to Bridge ({missingSkillsList.length})</span>
                      {missingSkillsList.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {missingSkillsList.map((sk) => (
                            <span key={sk} className="text-[9.5px] font-bold text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-[#000000]/10 uppercase truncate">
                              ✕ {sk}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10.5px] text-[#CCFF00] block mt-1.5 font-bold">★ Perfect match! Super job-ready.</span>
                      )}
                    </div>
                  </div>

                  {/* Job Match Score visualization */}
                  <div className="border-t border-white/5 pt-3 flex flex-col gap-2">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-white/50 tracking-wider">DYNAMIC JOB MATCH SCORE</span>
                      <span className="font-extrabold text-white">{matchScorePercentage}% MATCHED</span>
                    </div>
                    
                    {/* Visual Progress Meter representing score */}
                    <div className="w-full bg-white/10 h-2 rounded overflow-hidden relative">
                      <div className="bg-[#CCFF00] h-full transition-all duration-300" style={{ width: `${matchScorePercentage}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between text-[9.5px] text-white/40 font-mono">
                      <span>{missingSkillsList.length > 0 ? `${missingSkillsList.length} skillset requirements missing` : '100% SUBSCRIBED'}</span>
                      <span className="text-[#CCFF00] font-bold">
                        {matchScorePercentage === 100 ? 'READY TO APPLY FOR IMMEDIATE JOBS' : 'REQUIRES TARGET TRAINING COURSE'}
                      </span>
                    </div>
                  </div>

                  {/* Targeted learning path recommendation */}
                  {missingSkillsList.length > 0 && (
                    <div className="bg-[#CCFF00]/5 border border-[#CCFF00]/15 p-2.5 rounded text-[11px] text-white/80 leading-relaxed font-sans flex flex-col gap-2.5 mt-0.5">
                      <div className="flex items-center gap-1 text-[#CCFF00]">
                        <span className="font-bold text-[10px] font-mono uppercase bg-[#CCFF00]/15 px-1.5 py-0.5 rounded border border-[#CCFF00]/30 animate-pulse">RECOMMENDED COUPLING</span>
                      </div>
                      <div className="bg-white/5 border border-white/5 p-2 rounded">
                        <span className="text-[8px] font-mono uppercase text-white/45 block tracking-widest">Bridging Course Path</span>
                        <span className="text-xs font-black text-white block mt-0.5 uppercase">{career.recommendedCourse}</span>
                        <div className="flex justify-between text-[9px] text-[#CCFF00]/80 font-mono mt-1 font-bold">
                          <span>{career.courseProvider}</span>
                          <span>Est: {career.estHours}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/70">
                        Complete this brief course inside our <strong className="text-white font-bold">Learn Hub</strong> to instantly close these skill gaps, boost your Job Match Score, and auto-submit your application!
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Category Tabs list with dark kinetic layout backdrop */}
      <div className="w-full overflow-x-auto scrollbar-none flex gap-2 pb-1.5 pt-1 mb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 text-xs font-black uppercase tracking-widest rounded transition-all shrink-0 border ${
              selectedCategory === cat
                ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Styled Interactive Job Search Bar */}
      <div className="relative w-full">
        <input
          id="job-seach-input"
          type="text"
          placeholder="Search jobs or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-[13px] pl-9 pr-4 h-11 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none bg-[#0a0a0a] text-white font-mono uppercase tracking-wider"
        />
        <Search className="w-4 h-4 text-[#CCFF00] absolute left-3 top-3.5" />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="p-1 rounded bg-white/5 text-white/40 hover:text-white hover:bg-white/10 absolute right-3 top-2.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid / Stack of Job items */}
      <div className="flex flex-col gap-4 mt-1">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            const isSaved = savedJobs.includes(job.id);
            const matchesActiveSkills = job.matchesProfile || 
              job.tags.some((t) => userSkills.some((s) => s.toLowerCase() === t.toLowerCase())) || 
              userSkills.some((s) => s.toLowerCase() === job.category.toLowerCase() || job.title.toLowerCase().includes(s.toLowerCase()));

            return (
              <div 
                key={job.id}
                className="glass rounded-lg border border-white/10 p-5 flex flex-col gap-3 relative transition-all hover:border-[#CCFF00]/30"
              >
                {/* Accent Badges Header */}
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  {matchesActiveSkills ? (
                    <span className="bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1 font-mono animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      BEST MATCH FOR YOU
                    </span>
                  ) : job.closesSoon ? (
                    <span className="bg-red-950/40 text-red-300 border border-red-900/30 text-[10px] uppercase font-bold px-2.5 py-1 rounded flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      Closing Soon
                    </span>
                  ) : (
                    <span className="text-[10px] text-white/60 font-bold font-mono tracking-widest uppercase">
                      {job.category} Job
                    </span>
                  )}
                </div>

                {/* Job Title and overview */}
                <div className="flex gap-4 items-start flex-row justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[17px] sm:text-[18px] font-black text-white uppercase tracking-tight display-font leading-snug">
                      {job.title}
                    </h3>
                    
                    {/* Info meta row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-white/60 font-mono uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-white/30 shrink-0" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#CCFF00]">
                        <Banknote className="w-3.5 h-3.5 text-white/30 shrink-0" />
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Workplace illustration / brand logo */}
                  <img 
                    src={
                      job.id === 'job-1' ? officeCebu : 
                      job.id === 'job-2' ? cebuWarehouseJob : 
                      job.id === 'job-3' ? cebuResortJob : 
                      cebuRetailJob
                    }
                    alt={`${job.title} workplace`}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-white/10 shrink-0 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Short excerpt */}
                <p className="text-[14px] text-white/70 leading-relaxed font-sans">
                  {job.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {job.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-white/5 text-white/80 text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divided Action Controls */}
                <div className="w-full h-[1px] bg-white/10 my-1"></div>

                {/* Button Action Row */}
                <div className="w-full">
                  {job.id === 'job-2' ? (
                    // Double Button action representation (from screenshot 4)
                    <div className="grid grid-cols-2 gap-3 mt-1.5">
                      <button
                        onClick={() => handleSaveToggle(job.id, job.title)}
                        className={`h-[48px] rounded font-mono text-xs uppercase tracking-widest font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/30'
                            : 'border-white/15 hover:bg-white/5 text-white/80'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        <span>{isSaved ? 'Saved' : 'Save Job'}</span>
                      </button>

                      <button
                        onClick={() => handleApplyClick(job)}
                        className={`h-[48px] rounded font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
                          isApplied
                            ? 'bg-white/5 text-[#CCFF00] border border-white/10'
                            : 'bg-[#CCFF00] text-black hover:bg-[#b0db00]'
                        }`}
                      >
                        {isApplied ? 'Applied ✓' : 'Apply Now'}
                      </button>
                    </div>
                  ) : (
                    // Standard Single Button Action (from screenshot 4)
                    <button
                      onClick={() => handleApplyClick(job)}
                      className={`w-full h-[48px] rounded font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-all mt-1.5 cursor-pointer ${
                        isApplied
                          ? 'bg-white/5 text-[#CCFF00] border border-[#CCFF00]/30'
                          : 'bg-[#CCFF00] text-black hover:bg-[#b0db00]'
                      }`}
                    >
                      <span>{isApplied ? 'Application Sent ✓' : 'Apply Now'}</span>
                      {!isApplied && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass rounded-lg border border-white/10 p-8 text-center text-white/50">
            <p className="font-bold uppercase tracking-wide font-sans text-sm text-white">No jobs found</p>
            <p className="text-xs text-white/60 mt-1 font-sans">We couldn't find any jobs matching this search. Try a different category or other keywords!</p>
            <button 
              onClick={() => { setSelectedCategory('All Industries'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-white/5 text-[#CCFF00] border border-white/10 rounded font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Slide-Up Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0c0c0c] border border-white/15 max-w-sm w-full rounded-lg shadow-2xl p-6 flex flex-col gap-4 animate-scale-up text-white">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3.5">
              <div className="w-10 h-10 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 text-[#CCFF00]" />
              </div>
              <div className="leading-tight font-mono">
                <h3 className="font-bold text-white text-xs uppercase tracking-widest">
                  Confirm Application
                </h3>
                <span className="text-[10px] text-white/60 uppercase tracking-widest">Career Profile Attached</span>
              </div>
            </div>

            <div className="text-white/80 text-sm flex flex-col gap-2 leading-relaxed">
              <p className="text-[13px] font-sans">
                You're about to apply for <span className="font-extrabold text-[#CCFF00]">{showApplyModal.title}</span>!
              </p>
              <div className="bg-[#CCFF00]/5 border border-[#CCFF00]/25 rounded p-3 text-[11px] text-white flex items-start gap-2 pt-2.5">
                <Check className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5 stroke-[2]" />
                <span className="font-sans uppercase tracking-wide leading-relaxed text-[10px] text-white/90">
                  We have automatically attached your registered skills and certificates to help you stand out to the employer!
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-2 border-t border-white/10 pt-3">
              <button
                onClick={() => setShowApplyModal(null)}
                className="px-4 h-11 border border-white/10 rounded text-[11px] font-bold text-white uppercase tracking-wider font-mono hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={confirmApply}
                className="px-5 h-11 bg-[#CCFF00] hover:bg-[#b0db00] text-black rounded text-[11px] font-bold uppercase tracking-wider font-mono cursor-pointer"
              >
                Send My Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
