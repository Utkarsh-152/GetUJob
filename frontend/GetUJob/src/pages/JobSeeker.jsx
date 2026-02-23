import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Layers,
  Link2,
  Loader2,
  Lock,
  Mail,
  Minus,
  Plus,
  Upload,
  User,
} from 'lucide-react';

const MAX_PHOTO_SIZE_MB = 5;

const emptyExperience = () => ({
  title: '',
  company: '',
  duration: '',
  description: '',
});

const emptyEducation = () => ({
  school: '',
  degree: '',
  year: '',
  description: '',
});

const emptyProject = () => ({
  name: '',
  link: '',
  description: '',
});

const emptyCertification = () => ({
  name: '',
  issuer: '',
  year: '',
  url: '',
});

const JobSeeker = () => {
  const navigate = useNavigate();

  const registerUrl = useMemo(
    () => `${import.meta.env.VITE_BACKEND_URL}/api/jobSeeker/register`,
    []
  );

  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    profilePhoto: null,
    resume: '',
  });

  const [experience, setExperience] = useState([emptyExperience()]);
  const [education, setEducation] = useState([emptyEducation()]);
  const [projects, setProjects] = useState([emptyProject()]);
  const [certifications, setCertifications] = useState([emptyCertification()]);
  const [skills, setSkills] = useState([]); // { name }
  const [skillInput, setSkillInput] = useState('');

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full rounded-xl border border-neutral-800 bg-neutral-950/55 px-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70';

  const iconInputClass =
    'w-full rounded-xl border border-neutral-800 bg-neutral-950/55 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60';

  const cardClass =
    'rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl p-4 md:p-5';

  const handleBaseChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePhoto') {
      const file = files?.[0];
      if (!file) return;

      const fileSizeInMb = file.size / (1024 * 1024);
      if (fileSizeInMb > MAX_PHOTO_SIZE_MB) {
        setError(`Profile photo must be less than ${MAX_PHOTO_SIZE_MB}MB.`);
        return;
      }

      setError('');
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateArrayItem = (setter) => (index, key, value) => {
    setter((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const addArrayItem = (setter, factory) => () => setter((prev) => [...prev, factory()]);
  const removeArrayItem = (setter) => (index) => setter((prev) => prev.filter((_, i) => i !== index));

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    setSkills((prev) => {
      const exists = prev.some((s) => s.name.toLowerCase() === trimmed.toLowerCase());
      if (exists) return prev;
      return [...prev, { name: trimmed }];
    });
    setSkillInput('');
  };

  const onSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (name) => setSkills((prev) => prev.filter((s) => s.name !== name));

  const nonEmptyObjects = (arr) =>
    arr.filter((obj) => Object.values(obj).some((v) => String(v ?? '').trim() !== ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') data.append(key, value);
      });

      data.append('experience', JSON.stringify(nonEmptyObjects(experience)));
      data.append('education', JSON.stringify(nonEmptyObjects(education)));
      data.append('skills', JSON.stringify(skills));
      data.append('projects', JSON.stringify(nonEmptyObjects(projects)));
      data.append('certifications', JSON.stringify(nonEmptyObjects(certifications)));

      await axios.post(registerUrl, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/loginSeeker', {
        state: { successMessage: 'Your account is created. Please log in.' },
      });
    } catch (err) {
      console.error('Job seeker registration failed:', err);
      setError(
        err.response?.data?.message || 'Registration failed. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const SectionTitle = ({ icon, title, right }) => (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="inline-flex items-center gap-2">
          {icon}
          {title}
        </span>
      </div>
      {right}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans p-4 md:p-8 selection:bg-emerald-500/30">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors text-sm"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
            </Link>
            <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
              Job Seeker Registration
            </h1>
            <p className="mt-1 text-[13px] text-neutral-400">
              Full screen layout. No pitch panel—space is used for your profile sections.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[12px] text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT: essentials */}
          <div className="space-y-5">
            <div className={cardClass}>
              <SectionTitle icon={<User className="h-4 w-4 text-neutral-500" />} title="Basics" />

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
                <div className="relative group md:col-span-2">
                  <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    name="fullname"
                    required
                    placeholder="Full name"
                    value={formData.fullname}
                    onChange={handleBaseChange}
                    className={iconInputClass}
                  />
                </div>

                <div className="relative group">
                  <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="@username"
                    value={formData.username}
                    onChange={handleBaseChange}
                    className={iconInputClass}
                  />
                </div>

                <div className="relative group">
                  <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleBaseChange}
                    className={iconInputClass}
                  />
                </div>

                <div className="relative group md:col-span-2">
                  <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleBaseChange}
                    className={iconInputClass}
                  />
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <SectionTitle
                icon={<Upload className="h-4 w-4 text-neutral-500" />}
                title="Profile photo (optional)"
              />

              <div className="mt-4 flex items-center gap-3">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl border border-dashed border-neutral-700 bg-neutral-950/70 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full rounded-2xl object-cover"
                      />
                    ) : (
                      <Upload className="h-5 w-5 text-neutral-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    className="absolute inset-0 h-14 w-14 cursor-pointer opacity-0"
                    onChange={handleBaseChange}
                  />
                </div>
                <div className="text-[13px] text-neutral-300">
                  JPG/PNG under {MAX_PHOTO_SIZE_MB}MB.
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <SectionTitle
                icon={<Link2 className="h-4 w-4 text-neutral-500" />}
                title="Resume link (optional)"
              />
              <input
                type="url"
                name="resume"
                placeholder="https://..."
                value={formData.resume}
                onChange={handleBaseChange}
                className={`${inputClass} mt-4`}
              />
            </div>

            <div className={cardClass}>
              <SectionTitle
                icon={<Layers className="h-4 w-4 text-neutral-500" />}
                title="Skills"
                right={
                  <span className="text-[10px] text-neutral-500">Enter/comma to add</span>
                }
              />

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={onSkillKeyDown}
                  placeholder="React, Node.js, MongoDB"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-950/50 border border-neutral-800 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <span className="text-[12px] text-neutral-500">No skills added yet.</span>
                ) : (
                  skills.map((s) => (
                    <span
                      key={s.name}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-[12px] text-neutral-200"
                    >
                      {s.name}
                      <button
                        type="button"
                        onClick={() => removeSkill(s.name)}
                        className="text-neutral-400 hover:text-white"
                        aria-label={`Remove ${s.name}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className={cardClass}>
              <SectionTitle icon={<Layers className="h-4 w-4 text-neutral-500" />} title={`Certifications (${certifications.length})`} />

              <div className="mt-4 space-y-3">
                {certifications.map((item, idx) => (
                  <div key={`cert-${idx}`} className="rounded-xl border border-neutral-800 bg-neutral-950/35 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-neutral-400">#{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(setCertifications)(idx)}
                        disabled={certifications.length === 1}
                        className="text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <input
                        value={item.name}
                        onChange={(e) =>
                          updateArrayItem(setCertifications)(idx, 'name', e.target.value)
                        }
                        placeholder="Certification"
                        className={inputClass}
                      />
                      <input
                        value={item.issuer}
                        onChange={(e) =>
                          updateArrayItem(setCertifications)(idx, 'issuer', e.target.value)
                        }
                        placeholder="Issuer (optional)"
                        className={inputClass}
                      />
                      <input
                        value={item.year}
                        onChange={(e) =>
                          updateArrayItem(setCertifications)(idx, 'year', e.target.value)
                        }
                        placeholder="Year (optional)"
                        className={inputClass}
                      />
                      <input
                        value={item.url}
                        onChange={(e) =>
                          updateArrayItem(setCertifications)(idx, 'url', e.target.value)
                        }
                        placeholder="URL (optional)"
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addArrayItem(setCertifications, emptyCertification)}
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add certification
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: education/projects/certifications + experience */}
          <div className="space-y-5">
            <div className={cardClass}>
              <SectionTitle
                icon={<Briefcase className="h-4 w-4 text-neutral-500" />}
                title={`Experience (${experience.length})`}
              />

              <div className="mt-4 space-y-3">
                {experience.map((item, idx) => (
                  <div key={`exp-${idx}`} className="rounded-xl border border-neutral-800 bg-neutral-950/35 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-neutral-400">#{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(setExperience)(idx)}
                        disabled={experience.length === 1}
                        className="text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <input
                        value={item.title}
                        onChange={(e) => updateArrayItem(setExperience)(idx, 'title', e.target.value)}
                        placeholder="Role"
                        className={inputClass}
                      />
                      <input
                        value={item.company}
                        onChange={(e) => updateArrayItem(setExperience)(idx, 'company', e.target.value)}
                        placeholder="Company"
                        className={inputClass}
                      />
                      <input
                        value={item.duration}
                        onChange={(e) => updateArrayItem(setExperience)(idx, 'duration', e.target.value)}
                        placeholder="Duration (e.g. 2023–2025)"
                        className={`${inputClass} md:col-span-2`}
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateArrayItem(setExperience)(idx, 'description', e.target.value)
                        }
                        placeholder="Short description (optional)"
                        className={`${inputClass} md:col-span-2 min-h-[70px] resize-y`}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addArrayItem(setExperience, emptyExperience)}
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add experience
                </button>
              </div>
            </div>

            <div className={cardClass}>
              <SectionTitle
                icon={<GraduationCap className="h-4 w-4 text-neutral-500" />}
                title={`Education (${education.length})`}
              />

              <div className="mt-4 space-y-3">
                {education.map((item, idx) => (
                  <div key={`edu-${idx}`} className="rounded-xl border border-neutral-800 bg-neutral-950/35 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-neutral-400">#{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(setEducation)(idx)}
                        disabled={education.length === 1}
                        className="text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <input
                        value={item.school}
                        onChange={(e) => updateArrayItem(setEducation)(idx, 'school', e.target.value)}
                        placeholder="School/College"
                        className={inputClass}
                      />
                      <input
                        value={item.degree}
                        onChange={(e) => updateArrayItem(setEducation)(idx, 'degree', e.target.value)}
                        placeholder="Degree"
                        className={inputClass}
                      />
                      <input
                        value={item.year}
                        onChange={(e) => updateArrayItem(setEducation)(idx, 'year', e.target.value)}
                        placeholder="Year (optional)"
                        className={inputClass}
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateArrayItem(setEducation)(idx, 'description', e.target.value)
                        }
                        placeholder="Notes (optional)"
                        className={`${inputClass} md:col-span-2 min-h-[70px] resize-y`}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addArrayItem(setEducation, emptyEducation)}
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add education
                </button>
              </div>
            </div>

            <div className={cardClass}>
              <SectionTitle icon={<Layers className="h-4 w-4 text-neutral-500" />} title={`Projects (${projects.length})`} />

              <div className="mt-4 space-y-3">
                {projects.map((item, idx) => (
                  <div key={`proj-${idx}`} className="rounded-xl border border-neutral-800 bg-neutral-950/35 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-neutral-400">#{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(setProjects)(idx)}
                        disabled={projects.length === 1}
                        className="text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <input
                        value={item.name}
                        onChange={(e) => updateArrayItem(setProjects)(idx, 'name', e.target.value)}
                        placeholder="Project name"
                        className={inputClass}
                      />
                      <input
                        value={item.link}
                        onChange={(e) => updateArrayItem(setProjects)(idx, 'link', e.target.value)}
                        placeholder="Link (optional)"
                        className={inputClass}
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateArrayItem(setProjects)(idx, 'description', e.target.value)
                        }
                        placeholder="Short description (optional)"
                        className={`${inputClass} md:col-span-2 min-h-[70px] resize-y`}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addArrayItem(setProjects, emptyProject)}
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add project
                </button>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-[14px] font-semibold text-emerald-950 shadow-[0_18px_45px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating your profile...
                  </>
                ) : (
                  <>
                    Create job seeker account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[12px] text-neutral-500">
                Already have an account?{' '}
                <Link
                  to="/loginSeeker"
                  className="font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeeker;