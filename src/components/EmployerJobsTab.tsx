import { useState, useEffect, FormEvent } from 'react';
import { 
  Plus, 
  MapPin, 
  Banknote, 
  X, 
  Check, 
  TrendingUp, 
  Briefcase, 
  Users, 
  Clock, 
  Sparkles, 
  Trash2,
  Phone,
  Mail,
  Sliders
} from 'lucide-react';
import { Job, JobApplication, User } from '../types';

interface EmployerJobsTabProps {
  user: User | null;
  onSuccessToast: (msg: string) => void;
}

export default function EmployerJobsTab({ user, onSuccessToast }: EmployerJobsTabProps) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState<'Tech' | 'Logistics' | 'Hospitality' | 'Retail'>('Tech');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const skillCatalog = [
    'Customer Support',
    'Polite Communication',
    'Basic Computer Skills',
    'English Conversation',
    'Retail Sales & Cashiering',
    'Data Typing & Entry',
    'Office Filing & Clerical',
    'Willing to Learn'
  ];

  const loadData = () => {
    // Load jobs
    const savedJobs = localStorage.getItem('cebu_jobs_list');
    const jobsList: Job[] = savedJobs ? JSON.parse(savedJobs) : [
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
      }
    ];
    setJobs(jobsList);

    // Load applications
    const savedApps = localStorage.getItem('cebu_applications_list');
    const appsList: JobApplication[] = savedApps ? JSON.parse(savedApps) : [];
    setApplications(appsList);
  };

  useEffect(() => {
    loadData();
    // Keep list synchronized when storage changes
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handlePostSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !location || !salary || !description) {
      onSuccessToast('Please fill out all listed fields.');
      return;
    }

    const newJob: Job = {
      id: `employer-job-${Date.now()}`,
      title,
      location,
      salary,
      description,
      category,
      tags: [...selectedTags, 'Immediate Start', 'No Degree Required']
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('cebu_jobs_list', JSON.stringify(updatedJobs));

    // Reset Form Fields
    setTitle('');
    setLocation('');
    setSalary('');
    setDescription('');
    setSelectedTags([]);
    setShowPostModal(false);

    onSuccessToast(`Successfully published "${title}" vacant opening! Candidates will now see it active.`);
  };

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteJob = (id: string, jobTitle: string) => {
    if (confirm(`Are you sure you want to retire the job listing for "${jobTitle}"?`)) {
      const updated = jobs.filter(j => j.id !== id);
      setJobs(updated);
      localStorage.setItem('cebu_jobs_list', JSON.stringify(updated));
      onSuccessToast('Job opening retired successfully.');
    }
  };

  const handleUpdateAppStatus = (appId: string, status: 'Pending' | 'Shortlisted' | 'Contacted' | 'Rejected') => {
    const updatedApps = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, status };
      }
      return app;
    });
    setApplications(updatedApps);
    localStorage.setItem('cebu_applications_list', JSON.stringify(updatedApps));
    onSuccessToast(`Applicant recruitment status updated to ${status}.`);
    if (selectedApp?.id === appId) {
      setSelectedApp((prev) => (prev ? { ...prev, status } : null));
    }
  };

  // Only display vacancies matching the recruiter's industry or custom employer jobs
  const myVacancies = jobs.filter(j => j.id.startsWith('employer-') || j.category === user?.industry || j.category === 'Tech');

  return (
    <div className="flex flex-col gap-5 animate-fade-in text-white pb-12" id="employer-vacancy-management">
      
      {/* Dynamic Action Trigger Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-lg">
        <div>
          <span className="text-[9px] font-bold text-[#CCFF00] tracking-[0.2em] font-mono block">Recruitment Base</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-sans">Active Vacancies</h3>
          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">Manage {myVacancies.length} published slots</span>
        </div>
        
        <button
          onClick={() => setShowPostModal(true)}
          className="h-10 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-mono font-bold text-[10.5px] uppercase tracking-wider px-3 rounded flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2]" />
          <span>Post Job</span>
        </button>
      </div>

      {/* Recruited vacancy lists */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest font-mono">My Listings & Aligned Applicants</span>

        {myVacancies.length === 0 ? (
          <div className="text-center p-8 bg-zinc-950/20 border border-white/10 rounded-lg text-xs text-white/50">
            No active positions posted. Click "Post Job" above to launch your first opening!
          </div>
        ) : (
          myVacancies.map((job) => {
            const jobApps = applications.filter(a => a.jobId === job.id);
            const isCustomJob = job.id.startsWith('employer-');
            return (
              <div key={job.id} className="glass border border-white/10 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h4 className="text-[13px] font-black uppercase text-white tracking-wider">{job.title}</h4>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-0.5 leading-none uppercase">{job.category} • {job.location}</span>
                  </div>

                  {isCustomJob && (
                    <button
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-white/5 rounded"
                      title="Retire listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Salary indicators */}
                <div className="flex items-center gap-4 text-[10px] text-zinc-300 font-mono bg-black/40 px-3 py-1.5 rounded border border-white/5 w-fit">
                  <div className="flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-[8px] font-mono bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] px-1.5 py-0.5 rounded font-black">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Received applications indicator */}
                <div className="border-t border-white/5 pt-3 mt-1">
                  <span className="text-[8.5px] font-bold text-[#CCFF00] uppercase tracking-wider font-mono mb-2 block flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Applicants Sourced ({jobApps.length})
                  </span>

                  {jobApps.length === 0 ? (
                    <span className="text-[10px] text-white/50 block font-sans">No applications received yet. Jobs are advertised to local seekers across all devices!</span>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {jobApps.map((app) => (
                        <div 
                          key={app.id}
                          className="flex justify-between items-center bg-black/30 border border-white/5 p-2 rounded text-[10px] font-sans"
                        >
                          <div>
                            <span className="font-bold text-white block uppercase">{app.candidateName}</span>
                            <span className="text-[8.5px] font-mono text-zinc-400 block mt-0.5 lowercase">{app.candidateEmail}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase font-mono border ${
                              app.status === 'Shortlisted' 
                                ? 'bg-amber-950/45 text-amber-300 border-amber-850/40' 
                                : app.status === 'Contacted'
                                ? 'bg-emerald-950/45 text-emerald-300 border-emerald-850/40'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                            }`}>
                              {app.status}
                            </span>
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="text-xs font-mono text-[#CCFF00] font-bold cursor-pointer hover:underline"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Recruiter application manager overlay */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-[350px] max-w-full bg-[#0d0d0d] border border-white/15 rounded-xl shadow-2xl p-5 flex flex-col gap-4 relative">
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-1 rounded-md bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div>
              <span className="text-[8px] font-bold text-[#CCFF00] tracking-[0.2em] font-mono uppercase block">Recruitment Supervisor</span>
              <h4 className="text-sm font-black text-white uppercase mt-1">Review Candidate Submission</h4>
              <span className="text-[10px] text-zinc-400 font-mono mt-0.5 uppercase block font-medium">Applied for: {selectedApp.jobTitle}</span>
            </div>

            {/* Candidate details */}
            <div className="bg-white/5 border border-white/5 rounded p-3 text-[11px] font-mono flex flex-col gap-2">
              <span className="text-white font-bold uppercase">{selectedApp.candidateName}</span>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Mail className="w-3.5 h-3.5" />
                <span>{selectedApp.candidateEmail}</span>
              </div>
              
              <div className="border-t border-white/5 pt-2 mt-1">
                <span className="text-[9px] text-[#CCFF00] uppercase font-bold block mb-1">Candidate Profile Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedApp.candidateSkills.map(s => (
                    <span key={s} className="text-[8.5px] font-mono bg-black text-zinc-300 px-1.5 py-0.5 rounded border border-white/5">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Application status triggers */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00] font-mono">Disposition Command</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleUpdateAppStatus(selectedApp.id, 'Shortlisted')}
                  className={`py-2 rounded text-[10px] font-black uppercase font-mono border cursor-pointer ${
                    selectedApp.status === 'Shortlisted'
                      ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]'
                      : 'bg-white/5 text-white/60 border-white/5'
                  }`}
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateAppStatus(selectedApp.id, 'Contacted')}
                  className={`py-2 rounded text-[10px] font-black uppercase font-mono border cursor-pointer ${
                    selectedApp.status === 'Contacted'
                      ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]'
                      : 'bg-white/5 text-white/60 border-white/5'
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedApp(null)}
              className="w-full h-10 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-black uppercase tracking-wider text-[11px] font-mono rounded cursor-pointer"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      )}

      {/* Post job vacancy modal overlay */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handlePostSubmit}
            className="w-[360px] max-w-full bg-[#0d0d0d] border border-white/15 rounded-xl shadow-2xl p-5 flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              type="button"
              onClick={() => setShowPostModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md bg-white/5 text-white/60 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div>
              <span className="text-[8px] font-bold text-[#CCFF00] tracking-[0.2em] font-mono uppercase block">Corporate Publishing</span>
              <h4 className="text-sm font-black text-white uppercase mt-1">Post a New Vacancy</h4>
              <span className="text-[10px] text-zinc-400 font-sans block mt-0.5">Advertise across the Cebu candidate platform</span>
            </div>

            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Vacancy Title</label>
              <input
                type="text"
                placeholder="e.g. CSR Billing Coordinator"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-white bg-black/80 font-medium text-xs font-mono h-9 px-3 border border-white/10 rounded focus:border-[#CCFF00] outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Work Area / Cebu Location</label>
              <input
                type="text"
                placeholder="e.g. Cebu IT Park, Lahug"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-white bg-black/80 font-medium text-xs font-mono h-9 px-3 border border-white/10 rounded focus:border-[#CCFF00] outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Monthly Compensation</label>
              <input
                type="text"
                placeholder="e.g. PHP 17,000 - 22,000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full text-white bg-black/80 font-medium text-xs font-mono h-9 px-3 border border-white/10 rounded focus:border-[#CCFF00] outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Industry Sector</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-white bg-black/85 font-medium text-xs font-mono h-9 px-3 border border-white/10 rounded focus:border-[#CCFF00] outline-none cursor-pointer"
              >
                <option value="Tech">Tech / BPO</option>
                <option value="Logistics">Logistics & Shipping</option>
                <option value="Hospitality">Hospitality & Tourism</option>
                <option value="Retail">Retail & General Sales</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Job Description</label>
              <textarea
                placeholder="Summarize key tasks, working hours, and requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full text-white bg-black/80 font-medium text-xs font-mono p-3 border border-white/10 rounded focus:border-[#CCFF00] outline-none resize-none"
                required
              ></textarea>
            </div>

            {/* Tags check lists */}
            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Select Aligned Skill Requirements</label>
              <div className="flex flex-wrap gap-1 max-h-[85px] overflow-y-auto pr-0.5">
                {skillCatalog.map(skill => {
                  const isChecked = selectedTags.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleTag(skill)}
                      className={`text-[8.5px] font-mono leading-none border uppercase font-bold px-2 py-1.5 rounded cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00]' 
                          : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-black uppercase text-[10.5px] tracking-widest rounded-lg transition-all mt-3 cursor-pointer"
            >
              Confirm and Advertise Slot
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
