import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Trash2,
  AlertTriangle,
  Check,
  ChevronRight,
  Palette,
  Shield,
  LogOut,
} from "lucide-react";
import { ThemeCard, Section, DeleteModal } from "./SettingsPageContents";
import { useTheme } from "../hooks/useTheme";

const THEMES = [
  {
    id: "dark",
    label: "Dark",
    desc: "Easy on the eyes at night",
    icon: Moon,
    preview: {
      bg: "#0c0c0e",
      surface: "#131316",
      accent: "#7c6af7",
      text: "#f0f0f4",
      border: "#2a2a32",
    },
  },
  {
    id: "light",
    label: "Light",
    desc: "Clean and bright",
    icon: Sun,
    preview: {
      bg: "#f8f8fc",
      surface: "#ffffff",
      accent: "#5b4de8",
      text: "#111118",
      border: "#e0e0ea",
    },
  },
];

const ACCENT_COLORS = [
  { id: "purple", label: "Purple", value: "#7c6af7" },
  { id: "blue", label: "Blue", value: "#3b82f6" },
  { id: "green", label: "Green", value: "#3ecf8e" },
  { id: "rose", label: "Rose", value: "#f43f5e" },
  { id: "amber", label: "Amber", value: "#f5a623" },
  { id: "cyan", label: "Cyan", value: "#06b6d4" },
];

export default function Settings() {
  const { setTheme, theme } = useTheme();

  let colors = localStorage.colors;
  if (colors) {
    colors = JSON.parse(colors);
  }
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedAccent, setSelectedAccent] = useState(
    colors?.accent
      ? ACCENT_COLORS.find((i) => i.value === colors.accent).id
      : "purple",
  );

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleThemeSave = () => {
    setTheme(selectedTheme);

    const accent = ACCENT_COLORS.find((a) => a.id === selectedAccent)?.value;
    localStorage.setItem(
      "colors",
      JSON.stringify({
        accent: accent,
      }),
    );
    if (accent) document.documentElement.style.setProperty("--accent", accent);

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    alert("Account deleted. (wire up your API here)");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] font-body">
      {deleteOpen && (
        <DeleteModal
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-[6px] bg-[var(--accent)]/15 flex items-center justify-center">
              <Shield size={14} className="text-[var(--accent)]" />
            </div>
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest font-display">
              Preferences
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight mb-1">
            Settings
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Manage your Elementa experience
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* ── Theme Section ── */}
          <Section
            icon={Palette}
            title="Appearance"
            desc="Customize how Elementa looks for you"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase  tracking-wider mb-3 font-display">
                Color theme
              </p>
              <div className="flex gap-3">
                {THEMES.map((t) => (
                  <ThemeCard
                    key={t.id}
                    theme={t}
                    selected={theme == t.id}
                    onSelect={setSelectedTheme}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 font-display">
                Accent color
              </p>
              <div className="flex flex-wrap gap-2.5">
                {ACCENT_COLORS.map(({ id, label, value }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedAccent(id)}
                    title={label}
                    className={`w-9 h-9 rounded-full cursor-pointer border-2 transition-all flex items-center justify-center ${
                      selectedAccent === value
                        ? "border-[var(--text)] scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ background: value }}
                  >
                    {selectedAccent === id && (
                      <Check size={14} color="white" strokeWidth={3} />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Selected:{" "}
                <span
                  className="font-semibold"
                  style={{
                    color: ACCENT_COLORS.find((a) => a.id === selectedAccent)
                      ?.value,
                  }}
                >
                  {ACCENT_COLORS.find((a) => a.id === selectedAccent)?.label}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
              <button
                onClick={handleThemeSave}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-bold font-display rounded-[var(--radius-md)] border-none cursor-pointer hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <Check size={14} />
                Apply changes
              </button>
              {saved && (
                <div className="flex items-center gap-1.5 text-sm text-[var(--success)] font-semibold font-display">
                  <Check size={14} />
                  Saved!
                </div>
              )}
            </div>
          </Section>

          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
            {[
              {
                label: "Sign out",
                desc: "Sign out of your account",
                href: "/logout",
                icon: LogOut,
                danger: true,
              },
            ].map(({ label, desc, href, icon: Icon, danger }) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-4 px-5 py-4 border-b border-[var(--border)] last:border-0 no-underline group transition-colors ${
                  danger
                    ? "hover:bg-[var(--danger)]/5"
                    : "hover:bg-[var(--bg-tertiary)]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${
                    danger ? "bg-[var(--danger)]/10" : "bg-[var(--accent)]/10"
                  }`}
                >
                  <Icon
                    size={14}
                    className={
                      danger ? "text-[var(--danger)]" : "text-[var(--accent)]"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold font-display ${danger ? "text-[var(--danger)]" : "text-[var(--text)]"}`}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {desc}
                  </p>
                </div>
                <ChevronRight
                  size={15}
                  className={`shrink-0 transition-colors ${
                    danger
                      ? "text-[var(--danger)]/40 group-hover:text-[var(--danger)]"
                      : "text-[var(--border)] group-hover:text-[var(--accent)]"
                  }`}
                />
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
