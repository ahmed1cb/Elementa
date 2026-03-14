import { useState } from "react";
import { Trash2, AlertTriangle, Check, X } from "lucide-react";

function DeleteModal({ onClose, onConfirm }) {
  const [input, setInput] = useState("");
  const confirmed = input === "delete my account";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-md bg-[var(--bg-secondary)] rounded-[var(--radius-xl)] border border-[var(--danger)]/30 overflow-hidden"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--danger)]/15 flex items-center justify-center">
              <AlertTriangle size={15} className="text-[var(--danger)]" />
            </div>
            <h2 className="font-display font-bold text-base text-[var(--text)] tracking-tight">
              Delete account
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer border-none bg-transparent"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--danger)]/8 border border-[var(--danger)]/20">
            <p className="text-sm text-[var(--text)] leading-relaxed">
              This action is{" "}
              <strong className="text-[var(--danger)]">
                permanent and irreversible
              </strong>
              . All your components, likes, and profile data will be deleted
              forever.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 font-display">
              Type{" "}
              <span className="text-[var(--danger)] normal-case tracking-normal font-mono">
                delete my account
              </span>{" "}
              to confirm
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="delete my account"
              className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input-bg)] text-sm text-[var(--text)] font-body outline-none focus:border-[var(--danger)] focus:shadow-[0_0_0_3px_rgba(240,92,92,0.12)] transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-[var(--border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm text-[var(--text-muted)] font-semibold font-display cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-transparent"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmed && onConfirm()}
            disabled={!confirmed}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold font-display border-none transition-all ${
              confirmed
                ? "bg-[var(--danger)] text-white cursor-pointer hover:opacity-90 active:scale-[0.97]"
                : "bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
            }`}
          >
            <Trash2 size={13} />
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, desc, children, danger = false }) {
  return (
    <div
      className={`rounded-[var(--radius-xl)] border bg-[var(--bg-secondary)] overflow-hidden ${
        danger ? "border-[var(--danger)]/25" : "border-[var(--border)]"
      }`}
    >
      {/* Section header */}
      <div
        className={`flex items-center gap-3 px-6 py-4 border-b ${
          danger
            ? "border-[var(--danger)]/20 bg-[var(--danger)]/5"
            : "border-[var(--border)]"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center ${
            danger ? "bg-[var(--danger)]/15" : "bg-[var(--accent)]/10"
          }`}
        >
          <Icon
            size={15}
            className={danger ? "text-[var(--danger)]" : "text-[var(--accent)]"}
          />
        </div>
        <div>
          <h2
            className={`font-display font-bold text-sm tracking-tight ${
              danger ? "text-[var(--danger)]" : "text-[var(--text)]"
            }`}
          >
            {title}
          </h2>
          {desc && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{desc}</p>
          )}
        </div>
      </div>
      {/* Section body */}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function ThemeCard({ theme, selected, onSelect }) {
  const Icon = theme.icon;
  const p = theme.preview;

  return (
    <button
      onClick={() => onSelect(theme.id)}
      className={`relative flex flex-col rounded-[var(--radius-lg)] border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 bg-transparent text-left w-full ${
        selected
          ? "border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]"
          : "border-[var(--border)] hover:border-[var(--accent)]/50"
      }`}
    >
      {/* Mini UI preview */}
      <div
        className="p-3 h-24 relative overflow-hidden"
        style={{ background: p.bg }}
      >
        {/* Fake navbar */}
        <div
          className="flex items-center gap-1.5 mb-2 px-1.5 py-1 rounded-md"
          style={{ background: p.surface, border: `1px solid ${p.border}` }}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: p.accent }}
          />
          <div
            className="flex-1 h-1.5 rounded-full"
            style={{ background: p.border }}
          />
          <div
            className="w-4 h-1.5 rounded-full"
            style={{ background: p.accent, opacity: 0.6 }}
          />
        </div>
        {/* Fake cards */}
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 rounded-md"
              style={{ background: p.surface, border: `1px solid ${p.border}` }}
            >
              <div
                className="h-1.5 rounded-full m-1.5"
                style={{
                  background: i === 1 ? p.accent : p.border,
                  opacity: i === 1 ? 0.8 : 1,
                }}
              />
            </div>
          ))}
        </div>
        {/* Selected check */}
        {selected && (
          <div
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <Check size={11} color="white" />
          </div>
        )}
      </div>

      {/* Label */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 border-t"
        style={{ borderColor: p.border, background: p.surface }}
      >
        <Icon
          size={13}
          style={{ color: selected ? "var(--accent)" : "var(--text-muted)" }}
        />
        <div>
          <p
            className="font-display font-bold text-xs"
            style={{ color: p.text }}
          >
            {theme.label}
          </p>
          <p
            className="text-[10px] mt-0.5"
            style={{ color: p.text, opacity: 0.5 }}
          >
            {theme.desc}
          </p>
        </div>
      </div>
    </button>
  );
}

export { ThemeCard, Section, DeleteModal };
