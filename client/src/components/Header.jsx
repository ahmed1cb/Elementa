import { useState } from "react";
import {
  Layers,
  Users,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Bell,
  Plus,
} from "lucide-react";
import LogoIcon from "./LogoIcon";
import { useTheme } from "../hooks/useTheme";

export default function Header({ user = { name: "ahmed1cb", avatar: "AC" } }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-[8px] flex items-center justify-center">
            <LogoIcon />
          </div>
          <span className="font-display font-extrabold text-lg text-[var(--text)] tracking-tight">
            Elementa
          </span>
        </a>

        <div
          className={`hidden sm:flex flex-1 max-w-md items-center gap-2 px-3.5 py-2 rounded-[var(--radius-md)] border transition-all duration-200 ${
            searchFocused
              ? "border-[var(--accent)] bg-[var(--bg-secondary)] shadow-[0_0_0_3px_var(--accent-muted)]"
              : "border-[var(--border)] bg-[var(--bg-tertiary)]"
          }`}
        >
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search components, tags, users..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] font-body"
          />
          <kbd className="hidden lg:block text-[10px] px-1.5 py-0.5 rounded bg-[var(--border)] text-[var(--text-muted)] shrink-0">
            ⌘K
          </kbd>
        </div>

        <div className="hidden md:flex items-center gap-1 shrink-0">
          <a
            href="/components"
            className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-muted)] no-underline hover:text-[var(--text)] hover:bg-[var(--bg-tertiary)] transition-all"
          >
            <Layers size={15} />
            Components
          </a>
          <a
            href="/users"
            className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-muted)] no-underline hover:text-[var(--text)] hover:bg-[var(--bg-tertiary)] transition-all"
          >
            <Users size={15} />
            Top Users
          </a>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {/* Upload CTA */}
          <a
            href="/new"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[var(--accent)] text-white text-sm font-semibold rounded-[var(--radius-md)] no-underline hover:opacity-90 active:scale-[0.97] transition-all font-display"
          >
            <Plus size={15} />
            Share
          </a>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] cursor-pointer hover:text-[var(--text)] hover:border-[var(--accent)] transition-all bg-transparent"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Notifications */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] cursor-pointer hover:text-[var(--text)] hover:border-[var(--accent)] transition-all bg-transparent">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent)]" />
          </button>

          {/* Avatar */}
          <a
            href="/profile"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] hover:border-[var(--accent)] transition-all no-underline"
          >
            <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center font-display font-bold text-xs text-[var(--accent)]">
              {user.avatar}
            </div>
            <span className="hidden lg:block text-sm font-medium text-[var(--text)]">
              {user.name}
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] cursor-pointer bg-transparent"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 px-3 py-2.5 mb-2 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)]">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center font-display font-bold text-xs text-[var(--accent)]">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text)] font-display">
                @{user.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">View profile</p>
            </div>
          </div>
          {[
            { label: "Components", href: "/components" },
            { label: "Top Users", href: "/users" },
            { label: "Share a component", href: "/new" },
            { label: "Profile", href: "/profile" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3 py-2.5 rounded-[var(--radius-md)] text-sm text-[var(--text-muted)] no-underline hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)] transition-all"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
