import { useState } from 'react';
import { MapPin, Banknote, Briefcase, Bookmark, Check, ArrowRight, Search, Sparkles, Clock, X, BadgeCheck } from 'lucide-react';
import { Job } from '../types';

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
          placeholder="Search jobs, locations, or skills..."
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
