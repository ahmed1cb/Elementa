import { useEffect, useState } from "react";
import {
  Save,
  Upload,
  Eye,
  Code2,
  ChevronDown,
  Check,
  AlertTriangle,
  Maximize2,
  Minimize2,
  Layers,
  RefreshCw,
  Info,
  Type,
  AlignLeft,
  Plus,
  Terminal,
  Trash2 as TrashIcon,
} from "lucide-react";
import {
  CodeEditor,
  LivePreview,
  TagInput,
} from "./ComponentEditorPageContents";
import LogoIcon from "./LogoIcon";

const CATEGORIES = [
  "UI",
  "Animation",
  "Layout",
  "Navigation",
  "Forms",
  "Utility",
];

const INITIAL_HTML = `<div class="card">
  <div class="card__icon">✦</div>
  <h2 class="card__title">Elementa Card</h2>
  <p class="card__desc">A beautiful component ready to share with the community.</p>
  <button class="card__btn">Explore →</button>
</div>`;

const INITIAL_CSS = `.card {
  background: #1a1a2e;
  border: 1px solid rgba(124,106,247,0.3);
  border-radius: 16px;
  padding: 2rem;
  max-width: 320px;
  margin: 2rem auto;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(124,106,247,0.7);
}

.card__icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #7c6af7;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f0f0f4;
  margin: 0 0 0.5rem;
}

.card__desc {
  font-size: 0.875rem;
  color: #6b6b7a;
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.card__btn {
  padding: 0.6rem 1.4rem;
  background: #7c6af7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.card__btn:hover {
  opacity: 0.85;
}`;

const INITIAL_JS = ``;

export default function ComponentEditor() {
  const [html, setHtml] = useState(INITIAL_HTML);
  const [css, setCss] = useState(INITIAL_CSS);
  const [js, setJs] = useState(INITIAL_JS);
  const [headHtml, setHeadHtml] = useState("");
  const [activePane, setActivePane] = useState("html");
  const [previewFull, setPreviewFull] = useState(false);
  const [showHead, setShowHead] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [consoleOpen, setConsoleOpen] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "console") {
        setConsoleLogs((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            method: e.data.method,
            args: e.data.args,
            ts: new Date(e.data.ts).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          },
        ]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Clear logs on refresh
  const handleRefresh = () => {
    setConsoleLogs([]);
    setRefreshKey((k) => k + 1);
  };

  // Metadata
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [catOpen, setCatOpen] = useState(false);

  // Validation
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Component name is required";
    if (!description.trim()) e.desc = "Description is required";
    if (!category) e.category = "Pick a category";
    if (!html.trim()) e.html = "HTML cannot be empty";
    return e;
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setPublishing(true);
    // TODO: POST /api/components { name, description, category, tags, html, css, js, headHtml }
    await new Promise((r) => setTimeout(r, 1800));
    setPublishing(false);
    setPublished(true);
  };

  const inputCls = (err) =>
    `w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border ${
      err ? "border-[var(--danger)]" : "border-[var(--border)]"
    } bg-[var(--input-bg)] text-sm text-[var(--text)] font-body outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-muted)] transition-all placeholder:text-[var(--text-muted)]`;

  const labelCls =
    "block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-display";

  const PANES = [
    { id: "html", label: "HTML", color: "#f5a623" },
    { id: "css", label: "CSS", color: "#5cb8f7" },
    { id: "js", label: "JS", color: "#3ecf8e" },
  ];

  // ── Published success screen ──
  if (published) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center font-body">
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 rounded-full bg-[rgba(62,207,142,0.12)] flex items-center justify-center mx-auto mb-5">
            <Check
              size={28}
              strokeWidth={2.5}
              className="text-[var(--success)]"
            />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-2">
            Published!
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
            <strong className="text-[var(--text)]">{name}</strong> is now live
            on Elementa and visible to the community.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/components"
              className="px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-bold font-display rounded-[var(--radius-md)] no-underline hover:opacity-90 transition-all"
            >
              View components
            </a>
            <button
              onClick={() => {
                setPublished(false);
                setName("");
                setDescription("");
                setCategory("");
                setTags([]);
                setHtml(INITIAL_HTML);
                setCss(INITIAL_CSS);
                setJs(INITIAL_JS);
              }}
              className="px-5 py-2.5 border border-[var(--border)] text-sm font-bold font-display text-[var(--text-muted)] rounded-[var(--radius-md)] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-transparent"
            >
              Create another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--bg)] font-body overflow-hidden">
      <header className="shrink-0 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-4 px-5 py-3 border-b border-[var(--border)]">
          <a href="/" className="flex items-center gap-2 no-underline shrink-0">
            <div className="w-7 h-7 bg-[var(--accent)] rounded-[7px] flex items-center justify-center">
             <LogoIcon/>
            </div>
            <span className="font-display font-extrabold text-sm text-[var(--text)] tracking-tight hidden sm:block">
              Elementa
            </span>
          </a>

          <div className="w-px h-5 bg-[var(--border)]" />

          <div className="flex items-center gap-1.5">
            <Code2 size={14} className="text-[var(--accent)]" />
            <span className="font-display font-bold text-sm text-[var(--text)]">
              New Component
            </span>
          </div>

          <div className="flex-1" />

          {/* Status */}
          {Object.keys(errors).length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--danger)] font-semibold font-display">
              <AlertTriangle size={13} />
              Fix errors before publishing
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] text-xs font-semibold font-display text-[var(--text-muted)] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-transparent"
            >
              {saved ? (
                <>
                  <Check size={12} className="text-[var(--success)]" />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={12} />
                  Save draft
                </>
              )}
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[var(--radius-md)] text-xs font-bold font-display border-none transition-all ${
                publishing
                  ? "bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
                  : "bg-[var(--accent)] text-white cursor-pointer hover:opacity-90 active:scale-[0.97]"
              }`}
            >
              {publishing ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <Upload size={12} />
                  Publish
                </>
              )}
            </button>
          </div>
        </div>

        {/* Row 2 — metadata fields */}
        <div className="px-5 py-3 flex flex-col sm:flex-row gap-3">
          {/* Component name */}
          <div className="flex-1 min-w-0">
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-md)] border bg-[var(--input-bg)] transition-all focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-muted)] ${errors.name ? 'border-[var(--danger)]' : 'border-[var(--border)]'}"
              style={{
                borderColor: errors.name ? "var(--danger)" : "var(--border)",
              }}
            >
              <Type size={13} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Component name..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text)] font-display font-semibold placeholder:text-[var(--text-muted)] placeholder:font-normal"
              />
            </div>
            {errors.name && (
              <p className="text-[10px] text-[var(--danger)] mt-1 font-semibold">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex-[2] min-w-0">
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-md)] border bg-[var(--input-bg)] transition-all focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-muted)]"
              style={{
                borderColor: errors.desc ? "var(--danger)" : "var(--border)",
              }}
            >
              <AlignLeft
                size={13}
                className="text-[var(--text-muted)] shrink-0"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] font-body"
              />
            </div>
            {errors.desc && (
              <p className="text-[10px] text-[var(--danger)] mt-1 font-semibold">
                {errors.desc}
              </p>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setCatOpen((p) => !p)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-md)] border bg-[var(--input-bg)] text-sm cursor-pointer hover:border-[var(--accent)] transition-all font-body min-w-[140px] ${
                errors.category
                  ? "border-[var(--danger)]"
                  : "border-[var(--border)]"
              } ${category ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}
            >
              <Layers size={13} className="text-[var(--text-muted)]" />
              <span className="flex-1 text-left">{category || "Category"}</span>
              <ChevronDown
                size={12}
                className={`transition-transform text-[var(--text-muted)] ${catOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catOpen && (
              <div className="absolute right-0 top-full mt-1 z-30 w-44 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] shadow-lg overflow-hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setCatOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm text-left cursor-pointer border-none transition-colors font-body ${
                      category === cat
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            {errors.category && (
              <p className="text-[10px] text-[var(--danger)] mt-1 font-semibold">
                {errors.category}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex-1 min-w-[180px]">
            <TagInput tags={tags} onChange={setTags} />
          </div>
        </div>
      </header>

      {/* ══ MAIN GRID ════════════════════════════════════════════════════════ */}
      <div
        className={`flex-1 grid min-h-0 ${previewFull ? "grid-cols-1" : "grid-cols-2"}`}
        style={{ gridTemplateColumns: previewFull ? "1fr" : "1fr 1fr" }}
      >
        {/* ── LEFT: Code Editors ── */}
        {!previewFull && (
          <div className="flex flex-col border-r border-[var(--border)] min-h-0">
            <div className="flex items-center border-b border-[var(--border)] bg-[var(--bg-secondary)] shrink-0">
              {PANES.map(({ id, label, color }) => (
                <button
                  key={id}
                  onClick={() => setActivePane(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-display cursor-pointer border-none transition-all relative ${
                    activePane === id
                      ? "text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  } bg-transparent`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: color }}
                  />
                  {label}
                  {activePane === id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: color }}
                    />
                  )}
                </button>
              ))}

              <div className="flex-1" />

              {/* Custom <head> toggle */}
              <button
                onClick={() => setShowHead((p) => !p)}
                className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-semibold font-display cursor-pointer border-none transition-all mr-1 rounded-[var(--radius-sm)] ${
                  showHead
                    ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                    : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Plus size={11} />
                &lt;head&gt;
              </button>
            </div>

            {showHead && (
              <div className="shrink-0 border-b border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--border)]">
                  <Info size={11} className="text-[var(--text-muted)]" />
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Add external scripts/fonts (CDN links, Google Fonts, etc.)
                  </span>
                </div>
                <textarea
                  value={headHtml}
                  onChange={(e) => setHeadHtml(e.target.value)}
                  placeholder={`<link rel="stylesheet" href="https://fonts.googleapis.com/...">\n<script src="https://cdnjs.cloudflare.com/..."></script>`}
                  spellCheck={false}
                  className="w-full px-4 py-3 bg-transparent text-[var(--text)] font-mono text-xs leading-relaxed resize-none outline-none border-none"
                  style={{ height: "80px" }}
                />
              </div>
            )}

            {/* Code editor */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {activePane === "html" && (
                <CodeEditor value={html} onChange={setHtml} language="html" />
              )}
              {activePane === "css" && (
                <CodeEditor value={css} onChange={setCss} language="css" />
              )}
              {activePane === "js" && (
                <CodeEditor value={js} onChange={setJs} language="js" />
              )}
            </div>

            {errors.html && (
              <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-[var(--danger)]/10 border-t border-[var(--danger)]/20">
                <AlertTriangle size={12} className="text-[var(--danger)]" />
                <span className="text-xs text-[var(--danger)] font-semibold">
                  {errors.html}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── RIGHT: Preview + Console ── */}
        <div className="flex flex-col min-h-0">
          {/* Preview toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-secondary)] shrink-0">
            <div className="flex items-center gap-2">
              <Eye size={13} className="text-[var(--accent)]" />
              <span className="text-xs font-bold font-display text-[var(--text)]">
                Preview
              </span>
              <div className="flex gap-1 ml-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f05c5c]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f5a623]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3ecf8e]/70" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-sm)] text-[10px] font-semibold font-display text-[var(--text-muted)] cursor-pointer border-none bg-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)] transition-all"
              >
                <RefreshCw size={11} />
                Refresh
              </button>
              <button
                onClick={() => setPreviewFull((p) => !p)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-sm)] text-[10px] font-semibold font-display text-[var(--text-muted)] cursor-pointer border-none bg-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)] transition-all"
              >
                {previewFull ? (
                  <Minimize2 size={11} />
                ) : (
                  <Maximize2 size={11} />
                )}
                {previewFull ? "Split view" : "Full preview"}
              </button>
            </div>
          </div>

          {/* Preview iframe */}
          <div className="flex-1 min-h-0">
            <LivePreview
              html={html}
              css={css}
              js={js}
              headHtml={headHtml}
              refreshKey={refreshKey}
            />
          </div>

          {/* ── Custom Console ── */}
          <div
            className="shrink-0 border-t border-[var(--border)] flex flex-col"
            style={{
              height: consoleOpen ? "200px" : "34px",
              transition: "height 0.2s ease",
            }}
          >
            {/* Console header */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border)] bg-[var(--bg-secondary)] shrink-0">
              <button
                onClick={() => setConsoleOpen((p) => !p)}
                className="flex items-center gap-2 cursor-pointer border-none bg-transparent"
              >
                <Terminal size={12} className="text-[var(--accent)]" />
                <span className="text-[10px] font-bold font-display text-[var(--text)]">
                  Console
                </span>
                {consoleLogs.length > 0 && (
                  <span
                    className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold font-display"
                    style={{
                      background: consoleLogs.some((l) => l.method === "error")
                        ? "var(--danger)"
                        : "var(--accent)",
                      color: "white",
                    }}
                  >
                    {consoleLogs.length > 99 ? "99+" : consoleLogs.length}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setConsoleLogs([])}
                  className="flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] text-[10px] text-[var(--text-muted)] cursor-pointer border-none bg-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)] transition-all font-display"
                >
                  <TrashIcon size={10} />
                  Clear
                </button>
                <button
                  onClick={() => setConsoleOpen((p) => !p)}
                  className="w-5 h-5 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] cursor-pointer border-none bg-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)] transition-all"
                >
                  <span className="text-[10px] font-bold">
                    {consoleOpen ? "▾" : "▸"}
                  </span>
                </button>
              </div>
            </div>

            {consoleOpen && (
              <div
                className="flex-1 overflow-y-auto font-mono text-xs"
              >
                {consoleLogs.length === 0 ? (
                  <div
                    className="flex items-center justify-center h-full"
                    style={{ color: "#2a2a32" }}
                  >
                    <span>No output yet — run some JS to see logs here</span>
                  </div>
                ) : (
                  consoleLogs.map((log) => {
                    const STYLES = {
                      log: {
                        color: "#f0f0f4",
                        bg: "transparent",
                        icon: "›",
                        iconColor: "#44444f",
                      },
                      info: {
                        color: "#5cb8f7",
                        bg: "rgba(92,184,247,0.05)",
                        icon: "ℹ",
                        iconColor: "#5cb8f7",
                      },
                      warn: {
                        color: "#f5a623",
                        bg: "rgba(245,166,35,0.07)",
                        icon: "⚠",
                        iconColor: "#f5a623",
                      },
                      error: {
                        color: "#f05c5c",
                        bg: "rgba(240,92,92,0.08)",
                        icon: "✕",
                        iconColor: "#f05c5c",
                      },
                      debug: {
                        color: "#a78bfa",
                        bg: "transparent",
                        icon: "◆",
                        iconColor: "#a78bfa",
                      },
                    };
                    const s = STYLES[log.method] || STYLES.log;

                    return (
                      <div
                        key={log.id}
                        className="flex items-start gap-2.5 px-3 py-1.5 border-b"
                        style={{ background: s.bg, borderColor: "#0f0f12" }}
                      >
                        {/* Icon */}
                        <span
                          className="shrink-0 mt-px text-[11px] font-bold w-3 text-center"
                          style={{ color: s.iconColor }}
                        >
                          {s.icon}
                        </span>
                        {/* Args */}
                        <div className="flex-1 min-w-0 flex flex-wrap gap-x-2 gap-y-0.5">
                          {log.args.map((arg, i) => (
                            <span
                              key={i}
                              className="break-all whitespace-pre-wrap leading-relaxed"
                              style={{ color: s.color, fontSize: "11px" }}
                            >
                              {arg}
                            </span>
                          ))}
                        </div>
                        {/* Timestamp */}
                        <span
                          className="shrink-0 text-[10px] mt-px"
                          style={{ color: "#2a2a32" }}
                        >
                          {log.ts}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ STATUS BAR ═══════════════════════════════════════════════════════ */}
      <div className="shrink-0 flex items-center justify-between px-5 py-1.5 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[var(--text-muted)]">
            HTML{" "}
            <span className="text-[var(--text)]">
              {html.split("\n").length}L
            </span>
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            CSS{" "}
            <span className="text-[var(--text)]">
              {css.split("\n").length}L
            </span>
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            JS{" "}
            <span className="text-[var(--text)]">{js.split("\n").length}L</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {category && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold font-display"
              style={{
                background: "var(--accent-muted)",
                color: "var(--accent-light)",
              }}
            >
              {category}
            </span>
          )}
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] text-[var(--text-muted)]">
              #{tag}
            </span>
          ))}
          <div
            className="w-1.5 h-1.5 rounded-full bg-[var(--success)]"
            title="Auto-save on"
          />
        </div>
      </div>
    </div>
  );
}
