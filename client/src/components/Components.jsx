import { useState, useMemo } from "react";
import {
  Search,
  Layers,
  LayoutGrid,
  List,
  Flame,
  Clock,
  TrendingUp,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { ListRow } from "./ComponentsPageContents";
import ComponentCard from "./ComponentCard";

const ALL_COMPONENTS = [
  {
    id: 1,
    title: "Glassmorphism Card",
    author: "randdev",
    category: "UI",
    tags: ["CSS", "UI"],
    likes: 284,
    views: 1420,
    accent: "#7c6af7",
    date: "2024-03-10",
  },
  {
    id: 2,
    title: "Animated Gradient Button",
    author: "kodev",
    category: "Animation",
    tags: ["CSS", "Animation"],
    likes: 193,
    views: 980,
    accent: "#3ecf8e",
    date: "2024-03-08",
  },
  {
    id: 3,
    title: "Dark Modal Dialog",
    author: "uxlayer",
    category: "UI",
    tags: ["JS", "UI"],
    likes: 341,
    views: 2100,
    accent: "#f05c5c",
    date: "2024-03-07",
  },
  {
    id: 4,
    title: "Responsive Navbar",
    author: "m_codes",
    category: "Navigation",
    tags: ["HTML", "CSS"],
    likes: 156,
    views: 870,
    accent: "#f5a623",
    date: "2024-03-06",
  },
  {
    id: 5,
    title: "Typewriter Effect",
    author: "gridmaster",
    category: "Animation",
    tags: ["JS"],
    likes: 220,
    views: 1300,
    accent: "#5cb8f7",
    date: "2024-03-05",
  },
  {
    id: 6,
    title: "CSS Grid Layout",
    author: "devhana",
    category: "Layout",
    tags: ["CSS", "Layout"],
    likes: 178,
    views: 940,
    accent: "#a78bfa",
    date: "2024-03-04",
  },
  {
    id: 7,
    title: "Toast Notification",
    author: "ahmed1cb",
    category: "UI",
    tags: ["JS", "UI"],
    likes: 310,
    views: 1750,
    accent: "#f05c5c",
    date: "2024-03-03",
  },
  {
    id: 8,
    title: "Sidebar Navigation",
    author: "randdev",
    category: "Navigation",
    tags: ["HTML", "CSS", "JS"],
    likes: 267,
    views: 1540,
    accent: "#3ecf8e",
    date: "2024-03-02",
  },
  {
    id: 9,
    title: "Skeleton Loader",
    author: "kodev",
    category: "UI",
    tags: ["CSS", "Animation"],
    likes: 198,
    views: 1100,
    accent: "#7c6af7",
    date: "2024-03-01",
  },
  {
    id: 10,
    title: "Parallax Hero",
    author: "uxlayer",
    category: "Layout",
    tags: ["JS", "CSS"],
    likes: 145,
    views: 820,
    accent: "#f5a623",
    date: "2024-02-28",
  },
  {
    id: 11,
    title: "Dropdown Menu",
    author: "m_codes",
    category: "Navigation",
    tags: ["JS", "CSS"],
    likes: 233,
    views: 1280,
    accent: "#5cb8f7",
    date: "2024-02-27",
  },
  {
    id: 12,
    title: "Flip Card Effect",
    author: "gridmaster",
    category: "Animation",
    tags: ["CSS"],
    likes: 189,
    views: 1030,
    accent: "#a78bfa",
    date: "2024-02-26",
  },
];

const CATEGORIES = ["All", "UI", "Animation", "Layout", "Navigation", "Forms"];

const SORT_OPTIONS = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "newest", label: "Newest", icon: Clock },
  { id: "top", label: "Top rated", icon: TrendingUp },
];

export default function Components() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("trending");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...ALL_COMPONENTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.author.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (category !== "All") {
      list = list.filter((c) => c.category === category);
    }

    if (sort === "trending") list.sort((a, b) => b.views - a.views);
    if (sort === "newest")
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "top") list.sort((a, b) => b.likes - a.likes);

    return list;
  }, [search, category, sort]);

  const activeSortLabel = SORT_OPTIONS.find((s) => s.id === sort)?.label;

  return (
    <div className="min-h-screen bg-[var(--bg)] font-body">
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-[6px] bg-[var(--accent)]/15 flex items-center justify-center">
              <Layers size={14} className="text-[var(--accent)]" />
            </div>
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest font-display">
              Library
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight mb-1.5">
            Components
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {ALL_COMPONENTS.length} components shared by the community
          </p>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col gap-3 mb-8">
          {/* Row 1 — Search + Sort + View toggle */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-muted)] transition-all">
              <Search size={15} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, author, or tag..."
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

            {/* Sort dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSortOpen((p) => !p)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-muted)] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all font-body"
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:block">{activeSortLabel}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 z-20 w-44 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] shadow-lg overflow-hidden">
                  {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => {
                        setSort(id);
                        setSortOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left cursor-pointer border-none transition-colors font-body ${
                        sort === id
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)]"
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-0.5 p-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-8 h-8 flex items-center justify-center rounded-[6px] cursor-pointer border-none transition-all ${
                  viewMode === "grid"
                    ? "bg-[var(--accent)] text-white"
                    : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`w-8 h-8 flex items-center justify-center rounded-[6px] cursor-pointer border-none transition-all ${
                  viewMode === "list"
                    ? "bg-[var(--accent)] text-white"
                    : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Row 2 — Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all font-display ${
                  category === cat
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
            {/* Active filter summary */}
            {(search || category !== "All") && (
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-xs text-[var(--text-muted)]">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="flex items-center gap-1 text-xs text-[var(--danger)] cursor-pointer border-none bg-transparent hover:underline"
                >
                  <X size={11} /> Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-4">
              <Search size={22} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="font-display font-bold text-[var(--text)] text-base mb-1">
              No results found
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              Try a different search term or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-white text-sm font-semibold font-display border-none cursor-pointer hover:opacity-90 transition-all"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <ComponentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <ListRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
