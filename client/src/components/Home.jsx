import { useState } from "react";
import {
  Layers,
  Users,
  Eye,
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Flame,
} from "lucide-react";
import ComponentCard from "./ComponentCard";

const FEATURED = [
  {
    id: 1,
    title: "Glassmorphism Card",
    author: "randdev",
    tags: ["CSS", "UI"],
    likes: 284,
    views: 1420,
    accent: "#7c6af7",
  },
  {
    id: 2,
    title: "Animated Gradient Button",
    author: "kodev",
    tags: ["CSS", "Animation"],
    likes: 193,
    views: 980,
    accent: "#3ecf8e",
  },
  {
    id: 3,
    title: "Dark Modal Dialog",
    author: "uxlayer",
    tags: ["JS", "UI"],
    likes: 341,
    views: 2100,
    accent: "#f05c5c",
  },
  {
    id: 4,
    title: "Responsive Navbar",
    author: "m_codes",
    tags: ["HTML", "CSS"],
    likes: 156,
    views: 870,
    accent: "#f5a623",
  },
  {
    id: 5,
    title: "Typewriter Effect",
    author: "gridmaster",
    tags: ["JS"],
    likes: 220,
    views: 1300,
    accent: "#5cb8f7",
  },
  {
    id: 6,
    title: "CSS Grid Layout",
    author: "devhana",
    tags: ["CSS", "Layout"],
    likes: 178,
    views: 940,
    accent: "#a78bfa",
  },
];

const TOP_USERS = [
  {
    rank: 1,
    name: "ahmed1cb",
    components: 48,
    likes: 2341,
    avatar: "AC",
    badge: "🔥",
  },
  {
    rank: 2,
    name: "randdev",
    components: 35,
    likes: 1890,
    avatar: "SD",
    badge: "⚡",
  },
  {
    rank: 3,
    name: "kodev",
    components: 29,
    likes: 1540,
    avatar: "KD",
    badge: "✦",
  },
  {
    rank: 4,
    name: "uxlayer",
    components: 24,
    likes: 1120,
    avatar: "UX",
    badge: null,
  },
  {
    rank: 5,
    name: "m_codes",
    components: 21,
    likes: 990,
    avatar: "MC",
    badge: null,
  },
];

const STATS = [
  {
    label: "Components",
    value: "12,400+",
    icon: Layers,
    trend: "+124 this week",
  },
  { label: "Developers", value: "3,800+", icon: Users, trend: "+56 this week" },
  {
    label: "Monthly views",
    value: "94,000+",
    icon: Eye,
    trend: "+12% vs last month",
  }
];

const TABS = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "newest", label: "Newest", icon: Clock },
  { id: "top", label: "Top rated", icon: TrendingUp },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("trending");

  const user = { name: "ahmed1cb", avatar: "AC" };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] font-body">
      <main className="flex-1">
        <section className="relative border-b border-[var(--border)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full opacity-[0.07]"
              style={{
                background:
                  "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-5 py-16 md:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] mb-6">
                <Sparkles size={11} className="text-[var(--accent)]" />
                Welcome back,{" "}
                <strong className="text-[var(--text)]">@{user.name}</strong> 👋
              </div>

              <h1 className="font-display font-extrabold text-[2.75rem] md:text-[3.5rem] leading-[1.08] tracking-tight text-[var(--text)] mb-5">
                Discover &amp; share
                <br />
                <span className="text-[var(--accent)]">UI components</span>
              </h1>

              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Browse thousands of HTML, CSS &amp; JavaScript components built
                by developers. Copy, preview, and share your own with the
                community.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="/new"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-display font-bold text-sm rounded-[var(--radius-md)] no-underline hover:opacity-90 active:scale-[0.97] transition-all"
                >
                  <Zap size={15} />
                  Share a component
                </a>
                <a
                  href="/components"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] font-display font-bold text-sm rounded-[var(--radius-md)] no-underline hover:border-[var(--accent)] transition-all"
                >
                  Browse all
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-5 py-8">
            <div className="flex flex-col md:flex-row gap-3">
              {STATS.map(({ label, value, icon: Icon, trend }) => (
                <div
                  key={label}
                  className="flex grow-1 items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] transition-all"
                >
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-extrabold text-xl text-[var(--text)] tracking-tight leading-tight">
                      {value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] truncate">
                      {label}
                    </div>
                    <div className="text-[10px] text-[var(--success)] mt-0.5 truncate">
                      {trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Components ── */}
        <section className="max-w-7xl mx-auto px-5 py-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-1">
                Components
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Hand-picked by the community
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border)]">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold cursor-pointer border-none transition-all font-display ${
                    activeTab === id
                      ? "bg-[var(--accent)] text-white"
                      : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map((item) => (
              <ComponentCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <a
              href="/components"
              className="flex items-center gap-2 px-6 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm text-[var(--text-muted)] no-underline hover:border-[var(--accent)] hover:text-[var(--text)] transition-all font-display font-semibold"
            >
              Load more components
              <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* ── Top Contributors ── */}
        <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-5 py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-1">
                  Top contributors
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  The most active builders this month
                </p>
              </div>
              <a
                href="/users"
                className="flex items-center gap-1.5 text-sm text-[var(--accent-light)] no-underline hover:underline font-semibold"
              >
                View all <ArrowRight size={14} />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {TOP_USERS.map((u) => (
                <a
                  key={u.name}
                  href={`/users/${u.name}`}
                  className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)] transition-all no-underline group"
                >
                  <span
                    className={`font-display font-extrabold text-lg w-7 text-center shrink-0 ${
                      u.rank === 1
                        ? "text-[var(--warning)]"
                        : u.rank === 2
                          ? "text-[var(--text-muted)]"
                          : u.rank === 3
                            ? "text-[#cd7f32]"
                            : "text-[var(--border)]"
                    }`}
                  >
                    {u.rank}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center font-display font-bold text-sm text-[var(--accent)] shrink-0">
                    {u.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent-light)] transition-colors">
                        @{u.name}
                      </span>
                      {u.badge && <span className="text-sm">{u.badge}</span>}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {u.components} components published
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="font-display font-bold text-sm text-[var(--text)]">
                        {u.likes.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        total likes
                      </span>
                    </div>
                    <Star
                      size={14}
                      className="text-[var(--warning)]"
                      fill="var(--warning)"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
