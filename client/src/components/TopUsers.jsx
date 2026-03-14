import { useState, useMemo } from "react";
import {
  Search,
  Users,
  Heart,
  Layers,
  Eye,
  TrendingUp,
  X,
} from "lucide-react";
import { PodiumCard, UserRow } from "./TopUsersPageContents";

const ALL_USERS = [
  {
    rank: 1,
    name: "ahmed1cb",
    fullName: "Ahmed Al-Rashid",
    avatar: "AC",
    components: 48,
    likes: 2341,
    views: 18400,
    followers: 312,
    badge: "top-contributor",
    joined: "Jan 2024",
    tags: ["CSS", "UI", "Animation"],
    accent: "#7c6af7",
  },
  {
    rank: 2,
    name: "randdev",
    fullName: "Rand Eriksson",
    avatar: "SE",
    components: 35,
    likes: 1890,
    views: 14200,
    followers: 244,
    badge: "rising-star",
    joined: "Feb 2024",
    tags: ["React", "JS", "UI"],
    accent: "#3ecf8e",
  },
  {
    rank: 3,
    name: "kodev",
    fullName: "Ko Tanaka",
    avatar: "KT",
    components: 29,
    likes: 1540,
    views: 11800,
    followers: 198,
    badge: "prolific",
    joined: "Jan 2024",
    tags: ["CSS", "Layout"],
    accent: "#f05c5c",
  },
  {
    rank: 4,
    name: "uxlayer",
    fullName: "Lena Müller",
    avatar: "LM",
    components: 24,
    likes: 1120,
    views: 9300,
    followers: 155,
    badge: null,
    joined: "Mar 2024",
    tags: ["Design", "CSS"],
    accent: "#f5a623",
  },
  {
    rank: 5,
    name: "m_codes",
    fullName: "Marcus Johnson",
    avatar: "MJ",
    components: 21,
    likes: 990,
    views: 8100,
    followers: 132,
    badge: null,
    joined: "Feb 2024",
    tags: ["JS", "Animation"],
    accent: "#5cb8f7",
  },
  {
    rank: 6,
    name: "gridmaster",
    fullName: "Priya Sharma",
    avatar: "PS",
    components: 18,
    likes: 870,
    views: 6900,
    followers: 108,
    badge: null,
    joined: "Mar 2024",
    tags: ["CSS", "Grid"],
    accent: "#a78bfa",
  },
  {
    rank: 7,
    name: "devhana",
    fullName: "Hana Park",
    avatar: "HP",
    components: 15,
    likes: 720,
    views: 5600,
    followers: 91,
    badge: null,
    joined: "Apr 2024",
    tags: ["HTML", "CSS"],
    accent: "#3ecf8e",
  },
  {
    rank: 8,
    name: "webwizard",
    fullName: "Carlos Romero",
    avatar: "CR",
    components: 14,
    likes: 680,
    views: 5100,
    followers: 84,
    badge: null,
    joined: "Apr 2024",
    tags: ["JS", "UI"],
    accent: "#f05c5c",
  },
  {
    rank: 9,
    name: "cssmagic",
    fullName: "Yuki Watanabe",
    avatar: "YW",
    components: 12,
    likes: 590,
    views: 4400,
    followers: 73,
    badge: null,
    joined: "May 2024",
    tags: ["CSS", "Animation"],
    accent: "#f5a623",
  },
  {
    rank: 10,
    name: "layoutpro",
    fullName: "Aisha Ndiaye",
    avatar: "AN",
    components: 11,
    likes: 510,
    views: 3900,
    followers: 65,
    badge: null,
    joined: "May 2024",
    tags: ["Layout", "CSS"],
    accent: "#7c6af7",
  },
];



const SORT_OPTIONS = [
  { id: "likes", label: "Most liked", icon: Heart },
  { id: "components", label: "Most components", icon: Layers },
  { id: "views", label: "Most viewed", icon: Eye },
  { id: "followers", label: "Most followers", icon: Users },
];


export default function TopUsersPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("likes");

  const filtered = useMemo(() => {
    let list = [...ALL_USERS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.fullName.toLowerCase().includes(q) ||
          u.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (sortBy === "likes") list.sort((a, b) => b.likes - a.likes);
    if (sortBy === "components")
      list.sort((a, b) => b.components - a.components);
    if (sortBy === "views") list.sort((a, b) => b.views - a.views);
    if (sortBy === "followers") list.sort((a, b) => b.followers - a.followers);

    return list;
  }, [search, sortBy]);

  const top3 = ALL_USERS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg)] font-body">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-[6px] bg-[var(--accent)]/15 flex items-center justify-center">
              <TrendingUp size={14} className="text-[var(--accent)]" />
            </div>
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest font-display">
              Leaderboard
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight mb-1.5">
            Top Contributors
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            The most active builders on Elementa this month
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 items-end">
          {/* 2nd */}
          <div className="sm:mb-0">
            <PodiumCard user={top3[1]} size="sm" />
          </div>
          <div className="sm:-mt-6 order-first sm:order-none">
            <PodiumCard user={top3[0]} size="lg" />
          </div>
          {/* 3rd */}
          <div>
            <PodiumCard user={top3[2]} size="sm" />
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-muted)] transition-all">
            <Search size={14} className="text-[var(--text-muted)] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by username, name or tag..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] font-body"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSortBy(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] text-xs font-semibold cursor-pointer border transition-all font-display ${
                  sortBy === id
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)]"
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[var(--text-muted)]">
            Showing{" "}
            <strong className="text-[var(--text)]">{filtered.length}</strong>{" "}
            developers
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="flex items-center gap-1 text-xs text-[var(--danger)] cursor-pointer border-none bg-transparent hover:underline"
            >
              <X size={11} /> Clear search
            </button>
          )}
        </div>

        {/* ── Full Leaderboard ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-4">
              <Users size={22} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="font-display font-bold text-[var(--text)] text-base mb-1">
              No users found
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Try a different search term.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-white text-sm font-semibold font-display border-none cursor-pointer hover:opacity-90 transition-all"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((user) => (
              <UserRow key={user.name} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
