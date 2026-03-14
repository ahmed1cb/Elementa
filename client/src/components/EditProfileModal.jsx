import { useState } from "react";
import { Check, X } from "lucide-react";

function EditModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    fullName: user.fullName,
    bio: user.bio,
    location: user.location,
    website: user.website,
    github: user.github,
    twitter: user.twitter,
  });

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input-bg)] text-sm text-[var(--text)] font-body outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-muted)] transition-all placeholder:text-[var(--text-muted)]";
  const labelCls =
    "block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-display";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-lg bg-[var(--bg-secondary)] rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-display font-bold text-base text-[var(--text)] tracking-tight">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer border-none bg-transparent"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className={labelCls}>Display name</label>
            <input
              className={inputCls}
              value={form.fullName}
              onChange={update("fullName")}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className={labelCls}>Bio</label>
            <textarea
              className={`${inputCls} resize-none`}
              rows={3}
              value={form.bio}
              onChange={update("bio")}
              placeholder="Tell the community about yourself..."
            />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input
              className={inputCls}
              value={form.location}
              onChange={update("location")}
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className={labelCls}>Website</label>
            <input
              className={inputCls}
              value={form.website}
              onChange={update("website")}
              placeholder="https://yoursite.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>GitHub</label>
              <input
                className={inputCls}
                value={form.github}
                onChange={update("github")}
                placeholder="username"
              />
            </div>
            <div>
              <label className={labelCls}>Twitter / X</label>
              <input
                className={inputCls}
                value={form.twitter}
                onChange={update("twitter")}
                placeholder="username"
              />
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-[var(--border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm text-[var(--text-muted)] font-semibold font-display cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-transparent"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-white text-sm font-semibold font-display cursor-pointer hover:opacity-90 active:scale-[0.97] transition-all border-none"
          >
            <Check size={14} />
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditModal;
