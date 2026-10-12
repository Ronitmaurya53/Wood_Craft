import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Plus, 
  CheckCircle, 
  LogOut, 
  Loader2, 
  Trash2, 
  Eye, 
  LayoutDashboard, 
  FolderKanban, 
  UserCheck, 
  Images, 
  Sparkles, 
  MapPin,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'manage' | 'profile'
  const [projectsList, setProjectsList] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Kitchen',
    area: siteConfig.serviceAreas[0],
    description: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Listen to Firestore for existing projects live
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjectsList(data);
      setLoadingProjects(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (idx) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== idx));
    setPreviews(previews.filter((_, i) => i !== idx));
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) throw new Error('Cloudinary upload failed');
    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert('Kam se kam ek photo select karein!');
      return;
    }

    setUploading(true);
    setSuccess(false);

    try {
      const uploadPromises = selectedFiles.map((f) => uploadToCloudinary(f));
      const uploadedUrls = await Promise.all(uploadPromises);

      await addDoc(collection(db, 'projects'), {
        title: formData.title,
        category: formData.category,
        area: formData.area,
        description: formData.description,
        image: uploadedUrls[0],
        gallery: uploadedUrls,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setFormData({
        title: '',
        category: 'Kitchen',
        area: siteConfig.serviceAreas[0],
        description: '',
      });
      setSelectedFiles([]);
      setPreviews([]);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id, title) => {
    const confirmDelete = window.confirm(`Kya aap "${title}" ko delete karna chahte hain?`);
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      alert('Delete karne me issue aaya: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header & Executive Profile Banner */}
      <div className="bg-charcoal-light/70 border border-charcoal-light rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-woodgold-dark via-woodgold to-warmbeige flex items-center justify-center text-charcoal-dark font-serif text-2xl font-bold shadow-lg">
            PW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-warmbeige">Master Craftsperson Portal</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-woodgold/20 text-woodgold border border-woodgold/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-warmbeige/70 mt-1 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-woodgold" />
              Logged in: <span className="font-semibold text-warmbeige">{auth.currentUser?.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase bg-charcoal border border-charcoal-light text-warmbeige hover:text-woodgold hover:border-woodgold/40 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase bg-red-950/40 border border-red-800/40 text-red-200 hover:bg-red-900/60 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-charcoal-light/40 border border-charcoal-light rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-woodgold/10 text-woodgold rounded-xl">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warmbeige/60 uppercase font-semibold">Active Live Works</p>
            <p className="font-serif text-2xl font-bold text-warmbeige mt-0.5">
              {loadingProjects ? '...' : projectsList.length}
            </p>
          </div>
        </div>

        <div className="bg-charcoal-light/40 border border-charcoal-light rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-woodgold/10 text-woodgold rounded-xl">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warmbeige/60 uppercase font-semibold">Media Storage</p>
            <p className="font-serif text-sm font-bold text-warmbeige mt-1">Cloudinary CDN</p>
          </div>
        </div>

        <div className="bg-charcoal-light/40 border border-charcoal-light rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-woodgold/10 text-woodgold rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warmbeige/60 uppercase font-semibold">Security State</p>
            <p className="font-serif text-sm font-bold text-woodgold mt-1">Encrypted Firestore</p>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-charcoal-light gap-2 pb-1">
        <button
          onClick={() => setActiveTab('upload')}
          type="button"
          className={`flex items-center gap-2 px-6 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'upload'
              ? 'bg-woodgold text-charcoal-dark shadow-md'
              : 'text-warmbeige/70 hover:text-warmbeige hover:bg-charcoal-light'
          }`}
        >
          <Plus className="w-4 h-4" />
          Upload New Project
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          type="button"
          className={`flex items-center gap-2 px-6 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'manage'
              ? 'bg-woodgold text-charcoal-dark shadow-md'
              : 'text-warmbeige/70 hover:text-warmbeige hover:bg-charcoal-light'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          Manage Works ({projectsList.length})
        </button>
      </div>

      {/* TAB 1: UPLOAD PROJECT FORM */}
      {activeTab === 'upload' && (
        <div className="bg-charcoal-light/60 border border-charcoal-light rounded-2xl p-6 sm:p-10 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-serif text-xl font-bold text-warmbeige">Publish Client Work to Portfolio</h2>
            <p className="text-xs text-warmbeige/60 mt-1">
              Photographs will be compressed and optimized via Cloudinary and synchronized with live clients.
            </p>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-woodgold/20 border border-woodgold text-warmbeige flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-woodgold shrink-0" />
              <span className="text-sm font-medium">Kaam successfully live publish ho gaya!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-warmbeige/80 font-semibold mb-2">
                Work Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 3BHK Modular Kitchen with Island & Acrylic Shutters"
                className="w-full px-4 py-3 rounded-lg bg-charcoal border border-charcoal-light text-warmbeige focus:border-woodgold focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-warmbeige/80 font-semibold mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-charcoal border border-charcoal-light text-warmbeige focus:border-woodgold focus:outline-none text-sm"
                >
                  <option value="Kitchen">Kitchen</option>
                  <option value="Wardrobes">Wardrobes</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Complete Home">Complete Home</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-warmbeige/80 font-semibold mb-2">
                  Execution Locality (Pune) *
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-charcoal border border-charcoal-light text-warmbeige focus:border-woodgold focus:outline-none text-sm"
                >
                  {siteConfig.serviceAreas.map((loc) => (
                    <option key={loc} value={`${loc}, Pune`}>
                      {loc}, Pune
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-warmbeige/80 font-semibold mb-2">
                Specifications, Plywood Grade & Hardware *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Century Marine Plywood BWP 710, Hafele soft-close tandem boxes, 1.2mm anti-scratch acrylic shutters..."
                className="w-full px-4 py-3 rounded-lg bg-charcoal border border-charcoal-light text-warmbeige focus:border-woodgold focus:outline-none text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-warmbeige/80 font-semibold mb-2">
                Multiple Project Photographs *
              </label>
              
              <div className="relative border-2 border-dashed border-charcoal-light hover:border-woodgold/60 rounded-xl p-8 text-center cursor-pointer transition-colors bg-charcoal/50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelection}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2 flex flex-col items-center">
                  <Upload className="w-8 h-8 text-woodgold" />
                  <p className="text-sm font-medium text-warmbeige">Click or Drag & Drop Multiple Photos</p>
                  <p className="text-xs text-warmbeige/50">PNG, JPG, WEBP. Select multiple photos at once.</p>
                </div>
              </div>

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-charcoal h-24 bg-charcoal-dark shadow-md">
                      <img src={src} alt="preview" className="w-full h-full object-cover" />
                      {!uploading && (
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {idx === 0 && (
                        <span className="absolute bottom-0 inset-x-0 bg-woodgold text-charcoal-dark text-[10px] font-bold text-center py-0.5">
                          Primary Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading Assets to Cloudinary & Publishing to Firestore...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Publish Live Project
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: MANAGE & DELETE EXISTING WORKS */}
      {activeTab === 'manage' && (
        <div className="bg-charcoal-light/60 border border-charcoal-light rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-serif text-xl font-bold text-warmbeige">Live Works Manager</h2>
            <p className="text-xs text-warmbeige/60 mt-1">
              Delete outdated projects or examine real-time client view assets.
            </p>
          </div>

          {loadingProjects ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-8 h-8 text-woodgold animate-spin" />
            </div>
          ) : projectsList.length === 0 ? (
            <p className="text-center py-12 text-sm text-warmbeige/60">
              Abhi tak koi custom project upload nahi kiya gaya hai.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsList.map((project) => (
                <div
                  key={project.id}
                  className="bg-charcoal border border-charcoal-light rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-charcoal-dark">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-charcoal/80 backdrop-blur-md text-[10px] text-warmbeige flex items-center gap-1 border border-charcoal-light">
                      <Images className="w-3 h-3 text-woodgold" />
                      <span>{project.gallery?.length || 1} Photos</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs text-woodgold">
                        <span className="font-semibold uppercase tracking-wider">{project.category}</span>
                        <span className="text-warmbeige/60 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-woodgold" />
                          {project.area}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-warmbeige mt-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-warmbeige/70 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-charcoal-light flex justify-between items-center">
                      <span className="text-[11px] text-warmbeige/40">
                        Live on Firestore
                      </span>
                      <button
                        onClick={() => handleDeleteProject(project.id, project.title)}
                        type="button"
                        className="p-2 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/60 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}