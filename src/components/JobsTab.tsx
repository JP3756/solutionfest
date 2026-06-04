import { useState } from 'react';
import { MapPin, Banknote, Briefcase, Bookmark, Check, ArrowRight, Search, Sparkles, Clock, X, BadgeCheck } from 'lucide-react';
import { Job } from '../types';

interface JobsTabProps {
  isOffline: boolean;
  onSuccessToast: (msg: string) => void;
}

export default function JobsTab({ isOffline, onSuccessToast }: JobsTabProps) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('All Industries');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Job Application & Saving state
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showApplyModal, setShowApplyModal] = useState<Job | null>(null);

  const categories = ['All Industries', 'Tech', 'Logistics', 'Hospitality', 'Retail'];

  const initialJobs: Job[] = [
    {
      id: 'job-1',
      title: 'Data Privacy Officer',
      location: 'Cebu IT Park',
      salary: 'PHP 35k-45k',
      description: 'Looking for a certified DPO to manage compliance frameworks within our BP...',
      tags: ['Full-time', 'On-site', 'DPA 2012'],
      matchesProfile: true,
      category: 'Tech'
    },
    {
      id: 'job-2',
      title: 'Warehouse Logistics Assistant',
      location: 'Mandaue Logistics Hub',
      salary: 'PHP 18k-22k',
      description: 'seeking organized individuals for inventory management and supply cha...',
      tags: ['Contract', 'Shift Work'],
      category: 'Logistics'
    },
    {
      id: 'job-3',
      title: 'Guest Services Manager',
      location: 'Lapu-Lapu Resort Strip',
      salary: 'PHP 25k-30k',
      description: 'Overseee guest satisfaction and front-of-house operations at a premium 5-star...',
      tags: ['Full-time', 'On-site', 'Hospitality'],
      closesSoon: true,
      category: 'Hospitality'
    },
    {
      id: 'job-4',
      title: 'Retail Store Manager',
      location: 'Banilad Retail Center',
      salary: 'PHP 20k-25k',
      description: 'Lead store operations for a global fashion brand. Responsible for...',
      tags: ['Full-time', 'On-site', 'Retail Management'],
      matchesProfile: true,
      category: 'Retail'
    }
  ];

  const handleApplyClick = (job: Job) => {
    if (appliedJobs.includes(job.id)) {
      onSuccessToast(`You have already applied for ${job.title}!`);
      return;
    }
    // Launch Digital Passport Confirmation Modal
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
      onSuccessToast(`Applied! Digital Skills Passport transmitted securely to the recruitment team.`);
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
      {/* Category Tabs list with dark kinetic layout backdrop */}
      <div className="w-full overflow-x-auto scrollbar-none flex gap-2 pb-1.5 pt-1 -mx-4 px-4 sticky top-[30px] sm:top-[38px] bg-black z-40">
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
          placeholder="Search jobs, areas or skills in Cebu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-[13px] pl-10 pr-4 h-11 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none bg-[#0a0a0a] text-white font-mono uppercase tracking-wider"
        />
        <Search className="w-4 h-4 text-[#CCFF00] absolute left-3.5 top-3.5" />
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

            return (
              <div 
                key={job.id}
                className="glass rounded-lg border border-white/10 p-5 flex flex-col gap-3 relative transition-all hover:border-[#CCFF00]/30"
              >
                {/* Accent Badges Header */}
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  {job.matchesProfile ? (
                    <span className="bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1 font-mono animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      SYSTEM MATCH PRIORITY
                    </span>
                  ) : job.closesSoon ? (
                    <span className="bg-red-950/40 text-red-300 border border-red-900/30 text-[10px] uppercase font-bold px-2.5 py-1 rounded flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      CLOSES SOON
                    </span>
                  ) : (
                    <span className="text-[10px] text-white/40 font-bold font-mono tracking-widest uppercase">
                      // {job.category.toUpperCase()} SECTOR
                    </span>
                  )}
                </div>

                {/* Job Title and overview */}
                <div>
                  <h3 className="text-[18px] font-black text-white uppercase tracking-tight display-font leading-snug">
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
                        className={`h-[48px] rounded font-mono text-xs uppercase tracking-widest font-black border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/30'
                            : 'border-white/15 hover:bg-white/5 text-white/80'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        <span>{isSaved ? 'SAVED' : 'SAVE JOB'}</span>
                      </button>

                      <button
                        onClick={() => handleApplyClick(job)}
                        className={`h-[48px] rounded font-mono text-xs uppercase tracking-widest font-black transition-all cursor-pointer ${
                          isApplied
                            ? 'bg-white/5 text-[#CCFF00] border border-white/10'
                            : 'bg-[#CCFF00] text-black hover:bg-[#b0db00]'
                        }`}
                      >
                        {isApplied ? 'APPLIED ✓' : 'PASS APPLY'}
                      </button>
                    </div>
                  ) : (
                    // Standard Single Button Action (from screenshot 4)
                    <button
                      onClick={() => handleApplyClick(job)}
                      className={`w-full h-[48px] rounded font-mono text-xs uppercase tracking-widest font-black flex items-center justify-center gap-1.5 transition-all mt-1.5 cursor-pointer ${
                        isApplied
                          ? 'bg-white/5 text-[#CCFF00] border border-[#CCFF00]/30'
                          : 'bg-[#CCFF00] text-black hover:bg-[#b0db00]'
                      }`}
                    >
                      <span>{isApplied ? 'APPLICATION SENT ✓' : 'APPLY WITH PASSPORT'}</span>
                      {!isApplied && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass rounded-lg border border-white/10 p-8 text-center text-white/50">
            <p className="font-extrabold uppercase tracking-widest font-mono text-sm text-white">No listings indexed</p>
            <p className="text-xs text-white/40 mt-1 uppercase font-mono">Industry parameters returned zero records.</p>
            <button 
              onClick={() => { setSelectedCategory('All Industries'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-white/5 text-[#CCFF00] border border-white/10 rounded font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
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
                <h3 className="font-black text-white text-xs uppercase tracking-widest">
                  Secure Verify & Apply
                </h3>
                <span className="text-[10px] text-white/50 uppercase tracking-widest">TALENT VERIFICATION BLOCK</span>
              </div>
            </div>

            <div className="text-white/80 text-sm flex flex-col gap-2 leading-relaxed">
              <p className="text-[13px] font-sans">
                You are about to direct-submit your validated resume elements to <span className="font-extrabold text-[#CCFF00]">{showApplyModal.title}</span>.
              </p>
              <div className="bg-[#CCFF00]/5 border border-[#CCFF00]/25 rounded p-3 text-[11px] text-white flex items-start gap-2 pt-2.5">
                <Check className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5 stroke-[3]" />
                <span className="font-mono uppercase tracking-wide leading-relaxed text-[10px]">
                  Your verified **Skills Passport** (Communication, Problem Solving credentials index) is attached automatically to establish employer candidate priority.
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
                className="px-5 h-11 bg-[#CCFF00] hover:bg-[#b0db00 ] text-black rounded text-[11px] font-black uppercase tracking-wider font-mono cursor-pointer"
              >
                Transmit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
