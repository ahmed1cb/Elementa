import { useState } from "react";
import {
  Layers,
  Heart,
  Eye,
  MapPin,
  Calendar,
  Settings,
  Pencil,
  Check,
  Plus,
  Star,
  Github,
  Twitter,
  Globe,
} from "lucide-react";

import ComponentCard from "./ComponentCard";
import EditModal from "./EditProfileModal";
const CURRENT_USER = {
  name: "ahmed1cb",
  fullName: "Ahmed Hassan",
  avatar: "AC",
  bio: "Full Stack Developer obsessed with clean UI & smooth interactions. Building Elementa 🚀",
  location: "Earth Plannet",
  website: "https://portfolio-p8ni.onrender.com",
  github: "ahmed1cb",
  joined: "January 2024",
  accent: "#7c6af7",
  twitter: "",
  stats: {
    components: 48,
    likes: 2341,
    views: 18400,
  },
};

const MY_COMPONENTS = [
  {
    id: 1,
    title: "Glassmorphism Card",
    tags: ["CSS", "UI"],
    likes: 284,
    views: 1420,
    accent: "#7c6af7",
    published: "Mar 10",
  },
  {
    id: 2,
    title: "Toast Notification",
    tags: ["JS", "UI"],
    likes: 310,
    views: 1750,
    accent: "#f05c5c",
    published: "Mar 3",
  },
  {
    id: 3,
    title: "Neon Input Field",
    tags: ["CSS"],
    likes: 198,
    views: 1100,
    accent: "#3ecf8e",
    published: "Feb 24",
  },
  {
    id: 4,
    title: "Loader Collection",
    tags: ["CSS", "Animation"],
    likes: 241,
    views: 1360,
    accent: "#5cb8f7",
    published: "Feb 18",
  },
  {
    id: 5,
    title: "Scroll Progress Bar",
    tags: ["JS", "CSS"],
    likes: 175,
    views: 920,
    accent: "#a78bfa",
    published: "Feb 10",
  },
  {
    id: 6,
    title: "Pricing Card",
    tags: ["CSS", "UI"],
    likes: 163,
    views: 840,
    accent: "#f5a623",
    published: "Feb 1",
  },
];

const TABS = [
  { id: "components", label: "Components", icon: Layers },
  { id: "liked", label: "Liked", icon: Heart },
];

export default function Profile() {
  const [user, setUser] = useState(CURRENT_USER);
  const [activeTab, setActiveTab] = useState("components");
  const [editOpen, setEditOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (form) => {
    setUser((u) => ({ ...u, ...form }));
    setEditOpen(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] font-body">
      {editOpen && (
        <EditModal
          user={user}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}

      <div
        className="h-40 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${user.accent}30 0%, ${user.accent}08 50%, transparent 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${user.accent}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${user.accent}15 0%, transparent 40%)`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border)]" />
      </div>

      <div className="max-w-5xl mx-auto px-5">
        {/* ── Profile Header ── */}
        <div className="relative -mt-14 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            {/* Avatar + name */}
            <div className="flex items-end gap-5">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center font-display font-extrabold text-3xl border-4 border-[var(--bg)] shrink-0 relative"
                style={{ background: `${user.accent}25`, color: user.accent }}
              >
                {user.avatar}
                {/* Online dot */}
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[var(--success)] border-2 border-[var(--bg)]" />
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display font-extrabold text-xl text-[var(--text)] tracking-tight">
                    {user.fullName}
                  </h1>
                  {/* Top contributor badge */}
                  <div
                    className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-display"
                    style={{
                      background: `${user.accent}18`,
                      color: user.accent,
                      border: `1px solid ${user.accent}30`,
                    }}
                  >
                    <Star size={9} fill={user.accent} />
                    Top Contributor
                  </div>
                </div>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  @{user.name}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pb-1">
              {saved && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--success)]/15 border border-[var(--success)]/30 text-[var(--success)] text-xs font-semibold font-display">
                  <Check size={13} />
                  Saved!
                </div>
              )}
              <a
                href="/new"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[var(--accent)] text-white text-sm font-semibold font-display rounded-[var(--radius-md)] no-underline hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <Plus size={14} />
                New component
              </a>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-transparent text-sm text-[var(--text-muted)] font-semibold font-display cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all"
              >
                <Pencil size={14} />
                Edit profile
              </button>
              <a
                href="/settings"
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] no-underline hover:border-[var(--accent)] hover:text-[var(--text)] transition-all"
              >
                <Settings size={15} />
              </a>
            </div>
          </div>

          {/* Bio & meta */}
          <div className="mt-5 max-w-xl">
            {user.bio && (
              <p className="text-sm text-[var(--text)] leading-relaxed mb-3">
                {user.bio}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {user.location && (
                <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <MapPin size={12} /> {user.location}
                </span>
              )}
              {user.website && (
                <a
                  href={user.website}
                  className="flex items-center gap-1.5 text-xs text-[var(--accent-light)] no-underline hover:underline"
                >
                  <Globe size={12} /> {user.website.replace("https://", "")}
                </a>
              )}
              {user.github && (
                <a
                  href={`https://github.com/${user.github}`}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] no-underline hover:text-[var(--text)] transition-colors"
                >
                  <Github size={12} /> {user.github}
                </a>
              )}
              {user.twitter && (
                <a
                  href={`https://twitter.com/${user.twitter}`}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] no-underline hover:text-[var(--text)] transition-colors"
                >
                  <Twitter size={12} /> @{user.twitter}
                </a>
              )}
              <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Calendar size={12} /> Joined {user.joined}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row  gap-3 mb-8">
          {[
            { label: "Components", value: user.stats.components, icon: Layers },
            {
              label: "Total likes",
              value: user.stats.likes.toLocaleString(),
              icon: Heart,
            },
            {
              label: "Total views",
              value: `${(user.stats.views / 1000).toFixed(1)}k`,
              icon: Eye,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex grow-1 flex-col items-center py-4 px-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] transition-all cursor-pointer"
            >
              {Icon && (
                <Icon size={15} className="text-[var(--accent)] mb-1.5" />
              )}
              <span className="font-display font-extrabold text-xl text-[var(--text)] tracking-tight">
                {value}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-0 border-b border-[var(--border)] mb-7">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold font-display cursor-pointer border-none bg-transparent transition-all relative ${
                activeTab === id
                  ? "text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <Icon size={14} />
              {label}
              {id === "components" && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: `${user.accent}20`, color: user.accent }}
                >
                  {MY_COMPONENTS.length}
                </span>
              )}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        {activeTab === "components" && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[var(--text-muted)]">
                {MY_COMPONENTS.length} components published
              </p>
              <a
                href="/new"
                className="flex items-center gap-1.5 text-sm text-[var(--accent-light)] no-underline hover:underline font-semibold"
              >
                <Plus size={13} /> Add new
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
              {MY_COMPONENTS.map((item) => (
                <ComponentCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {activeTab === "liked" && (
          <div className="flex flex-col items-center justify-center py-20 text-center pb-16">
            <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-4">
              <Heart size={22} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="font-display font-bold text-[var(--text)] text-base mb-1">
              No liked components yet
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              Browse the community and like components you find useful.
            </p>
            <a
              href="/components"
              className="mt-4 px-5 py-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-white text-sm font-semibold font-display no-underline hover:opacity-90 transition-all"
            >
              Browse components
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
