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
  location: '',
  startDate: '',
  endDate: '',
  description: '',
});

const emptyEducation = () => ({
  school: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  grade: '',
  description: '',
});

const emptyProject = () => ({
  name: '',
  link: '',
  description: '',
  technologies: '',
});

const emptyCertification = () => ({
  name: '',
  issuer: '',
  issueDate: '',
  credentialUrl: '',
});

const JobSeeker = () => {
  const navigate = useNavigate();

  // Change only this if your backend base URL differs.
  const registerUrl = useMemo(
    () => 'http://localhost:8000/api/jobSeeker/register',
    []
  );

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    profilePhoto: null,
    resume: '', // backend expects a string (URL/text)
  });

  const [experience, setExperience] = useState([emptyExperience()]);
  const [education, setEducation] = useState([emptyEducation()]);
  const [projects, setProjects] = useState([emptyProject()]);
  const [certifications, setCertifications] = useState([emptyCertification()]);
  const [skills, setSkills] = useState([]); // array of { name }
  const [skillInput, setSkillInput] = useState('');

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addArrayItem = (setter, factory) => () => setter((prev) => [...prev, factory()]);
  const removeArrayItem = (setter) => (index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  const addSkillFromInput = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    setSkills((prev) => {
      const exists = prev.some((s) => s.name.toLowerCase() === trimmed.toLowerCase());
      if (exists) return prev;
      return [...prev, { name: trimmed }];
    });
    setSkillInput('');
  };

  const removeSkill = (name) => {
    setSkills((prev) => prev.filter((s) => s.name !== name));
  };

  const onSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkillFromInput();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();

      // base fields (required: fullname, email, username, password)
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') data.append(key, value);
      });

      // NOTE: backend currently stores these values as-is from req.body.
      // Sending JSON strings is the most reliable way with multipart/form-data.
      data.append('experience', JSON.stringify(experience.filter((x) => Object.values(x).some(Boolean))));
      data.append('education', JSON.stringify(education.filter((x) => Object.values(x).some(Boolean))));
      data.append('skills', JSON.stringify(skills));
      data.append('projects', JSON.stringify(projects.filter((x) => Object.values(x).some(Boolean))));
      data.append(
        'certifications',
        JSON.stringify(certifications.filter((x) => Object.values(x).some(Boolean)))
      );

      await axios.post(registerUrl, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/login', {
        state: { successMessage: 'Your account is created. Please log in.' },
      });
    } catch (err) {
      console.error('Job seeker registration failed:', err);
      setError(
        err.response?.data?.message ||
          'Registration failed. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const sectionLabel = (icon, title, subtitle) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="inline-flex items-center gap-2">
          {icon}
          {title}
        </span>
      </div>
      {subtitle ? <span className="text-[10px] text-neutral-500 normal-case">{subtitle}</span> : null}
    </div>
  );

  const inputClass =
    'w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70';

  const iconInputClass =
    'w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60';

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 shadow-[0_28px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row">
          {/* Left pitch */}
          <div className="hidden md:flex basis-2/5 flex-col justify-between border-r border-neutral-800/80 bg-linear-to-b from-neutral-900/90 via-neutral-950/40 to-neutral-950/90 px-8 py-7">
            <div>
              <button className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Job Seeker
              </button>
              <h1 className="mt-4 text-2xl font-semibold leading-tight text-white">
                Build a profile that
                <span className="bg-linear-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  {' '}
                  gets noticed.
                </span>
              </h1>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-400">
                Add your experience, education, skills, and projects once. Then apply faster and
                keep your details consistent everywhere.
              </p>
            </div>

            <div className="space-y-3 text-[12px] text-neutral-300/90">
              <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/70 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                      PROFILE SECTIONS
                    </p>
                    <p className="text-sm font-semibold text-white">Experience • Skills • Projects</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span>Secure by design • No spam</span>
                <span className="text-neutral-400">
                  GetUJob<span className="text-emerald-400">·</span>Network
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowRight className="h-3 w-3 rotate-180" />
                Back to home
              </Link>
              <span className="rounded-full border border-neutral-700/80 bg-neutral-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                Profile-first
              </span>
            </div>
          </div>

          {/* Right form */}
          <div className="flex-1 px-5 py-6 md:px-8 md:py-7">
            <div className="mb-4 flex items-start justify-between md:hidden">
              <div>
                <h2 className="text-xl font-semibold text-white">Create your job seeker profile</h2>
                <p className="mt-1 text-[12px] text-neutral-400">
                  Fill the basics, then add details that help recruiters.
                </p>
              </div>
              <Link
                to="/"
                className="ml-3 rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-400 hover:text-white"
              >
                Home
              </Link>
            </div>

            {/* Photo */}
            <div className="mb-5 flex items-center gap-3">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/70 flex items-center justify-center overflow-hidden">
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
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  PROFILE PHOTO
                </p>
                <p className="text-[13px] text-neutral-300">
                  Optional. JPG/PNG under {MAX_PHOTO_SIZE_MB}MB.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
                <div className="space-y-2.5">
                  {sectionLabel(<User className="h-3.5 w-3.5 text-neutral-500" />, 'Basics')}

                  <div className="relative group">
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
                </div>

                <div className="space-y-2.5">
                  <div className="h-[18px] md:h-auto" />

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

                  <div className="relative group">
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

              {/* Resume */}
              <div className="space-y-3">
                {sectionLabel(
                  <Link2 className="h-3.5 w-3.5 text-neutral-500" />,
                  'Resume',
                  'Optional link (PDF/Drive/Portfolio)'
                )}
                <input
                  type="url"
                  name="resume"
                  placeholder="Resume link (https://...)"
                  value={formData.resume}
                  onChange={handleBaseChange}
                  className={inputClass}
                />
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {sectionLabel(
                  <Layers className="h-3.5 w-3.5 text-neutral-500" />,
                  'Skills',
                  'Press Enter or comma to add'
                )}
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={onSkillKeyDown}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={addSkillFromInput}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </button>
                </div>

                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-[12px] text-neutral-200"
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
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-neutral-500">No skills added yet.</p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-3">
                {sectionLabel(<Briefcase className="h-3.5 w-3.5 text-neutral-500" />, 'Experience')}

                <div className="space-y-3">
                  {experience.map((item, idx) => (
                    <div
                      key={`exp-${idx}`}
                      className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-medium text-neutral-300">
                          Experience #{idx + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setExperience)(idx)}
                          disabled={experience.length === 1}
                          className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <input
                          value={item.title}
                          onChange={(e) =>
                            updateArrayItem(setExperience)(idx, 'title', e.target.value)
                          }
                          placeholder="Role / Title"
                          className={inputClass}
                        />
                        <input
                          value={item.company}
                          onChange={(e) =>
                            updateArrayItem(setExperience)(idx, 'company', e.target.value)
                          }
                          placeholder="Company"
                          className={inputClass}
                        />
                        <input
                          value={item.location}
                          onChange={(e) =>
                            updateArrayItem(setExperience)(idx, 'location', e.target.value)
                          }
                          placeholder="Location (Remote/City)"
                          className={inputClass}
                        />
                        <div className="grid grid-cols-2 gap-2.5">
                          <input
                            type="month"
                            value={item.startDate}
                            onChange={(e) =>
                              updateArrayItem(setExperience)(idx, 'startDate', e.target.value)
                            }
                            className={inputClass}
                          />
                          <input
                            type="month"
                            value={item.endDate}
                            onChange={(e) =>
                              updateArrayItem(setExperience)(idx, 'endDate', e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateArrayItem(setExperience)(idx, 'description', e.target.value)
                          }
                          placeholder="What did you do? Impact, metrics, scope..."
                          className={`${inputClass} md:col-span-2 min-h-[90px] resize-y`}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addArrayItem(setExperience, emptyExperience)}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add experience
                  </button>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                {sectionLabel(
                  <GraduationCap className="h-3.5 w-3.5 text-neutral-500" />,
                  'Education'
                )}

                <div className="space-y-3">
                  {education.map((item, idx) => (
                    <div
                      key={`edu-${idx}`}
                      className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-medium text-neutral-300">
                          Education #{idx + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setEducation)(idx)}
                          disabled={education.length === 1}
                          className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <input
                          value={item.school}
                          onChange={(e) =>
                            updateArrayItem(setEducation)(idx, 'school', e.target.value)
                          }
                          placeholder="School / University"
                          className={inputClass}
                        />
                        <input
                          value={item.degree}
                          onChange={(e) =>
                            updateArrayItem(setEducation)(idx, 'degree', e.target.value)
                          }
                          placeholder="Degree (B.Tech, BSc, ...)"
                          className={inputClass}
                        />
                        <input
                          value={item.fieldOfStudy}
                          onChange={(e) =>
                            updateArrayItem(setEducation)(idx, 'fieldOfStudy', e.target.value)
                          }
                          placeholder="Field of study"
                          className={inputClass}
                        />
                        <input
                          value={item.grade}
                          onChange={(e) =>
                            updateArrayItem(setEducation)(idx, 'grade', e.target.value)
                          }
                          placeholder="Grade / CGPA (optional)"
                          className={inputClass}
                        />
                        <div className="grid grid-cols-2 gap-2.5 md:col-span-2">
                          <input
                            type="month"
                            value={item.startDate}
                            onChange={(e) =>
                              updateArrayItem(setEducation)(idx, 'startDate', e.target.value)
                            }
                            className={inputClass}
                          />
                          <input
                            type="month"
                            value={item.endDate}
                            onChange={(e) =>
                              updateArrayItem(setEducation)(idx, 'endDate', e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateArrayItem(setEducation)(idx, 'description', e.target.value)
                          }
                          placeholder="Highlights, coursework, achievements..."
                          className={`${inputClass} md:col-span-2 min-h-[90px] resize-y`}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addArrayItem(setEducation, emptyEducation)}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add education
                  </button>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-3">
                {sectionLabel(<Layers className="h-3.5 w-3.5 text-neutral-500" />, 'Projects')}

                <div className="space-y-3">
                  {projects.map((item, idx) => (
                    <div
                      key={`proj-${idx}`}
                      className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-medium text-neutral-300">
                          Project #{idx + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setProjects)(idx)}
                          disabled={projects.length === 1}
                          className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
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
                          placeholder="Link (GitHub / Live demo)"
                          className={inputClass}
                        />
                        <input
                          value={item.technologies}
                          onChange={(e) =>
                            updateArrayItem(setProjects)(idx, 'technologies', e.target.value)
                          }
                          placeholder="Technologies (e.g. React, Node, MongoDB)"
                          className={`${inputClass} md:col-span-2`}
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateArrayItem(setProjects)(idx, 'description', e.target.value)
                          }
                          placeholder="What does it do? What did you build?"
                          className={`${inputClass} md:col-span-2 min-h-[90px] resize-y`}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addArrayItem(setProjects, emptyProject)}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add project
                  </button>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                {sectionLabel(<Layers className="h-3.5 w-3.5 text-neutral-500" />, 'Certifications')}

                <div className="space-y-3">
                  {certifications.map((item, idx) => (
                    <div
                      key={`cert-${idx}`}
                      className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-medium text-neutral-300">
                          Certification #{idx + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setCertifications)(idx)}
                          disabled={certifications.length === 1}
                          className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-[11px] text-neutral-400 hover:text-white disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <input
                          value={item.name}
                          onChange={(e) =>
                            updateArrayItem(setCertifications)(idx, 'name', e.target.value)
                          }
                          placeholder="Certification name"
                          className={inputClass}
                        />
                        <input
                          value={item.issuer}
                          onChange={(e) =>
                            updateArrayItem(setCertifications)(idx, 'issuer', e.target.value)
                          }
                          placeholder="Issuer"
                          className={inputClass}
                        />
                        <input
                          type="month"
                          value={item.issueDate}
                          onChange={(e) =>
                            updateArrayItem(setCertifications)(idx, 'issueDate', e.target.value)
                          }
                          className={inputClass}
                        />
                        <input
                          value={item.credentialUrl}
                          onChange={(e) =>
                            updateArrayItem(setCertifications)(idx, 'credentialUrl', e.target.value)
                          }
                          placeholder="Credential URL (optional)"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addArrayItem(setCertifications, emptyCertification)}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-[13px] text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add certification
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-3">
                {error ? (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[12px] text-red-300">
                    {error}
                  </div>
                ) : null}

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

                <p className="text-center text-[12px] text-neutral-500">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeeker;
