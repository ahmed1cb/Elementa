import { Code2, Heart, MessageSquare, Star, Upload, UserPlus, X } from "lucide-react";

export const TYPE_CONFIG = {
  like: { icon: Heart, color: "#f05c5c", bg: "rgba(240,92,92,0.1)" },
  comment: {
    icon: MessageSquare,
    color: "#5cb8f7",
    bg: "rgba(92,184,247,0.1)",
  },
  follow: { icon: UserPlus, color: "#3ecf8e", bg: "rgba(62,207,142,0.1)" },
  featured: { icon: Star, color: "#f5a623", bg: "rgba(245,166,35,0.1)" },
  milestone: { icon: Upload, color: "#7c6af7", bg: "rgba(124,106,247,0.1)" },
};

export function NotificationRow({ notif, onRead, onDelete }) {
  const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.like;
  const Icon = cfg.icon;

  return (
    <div
      onClick={() => !notif.read && onRead(notif.id)}
      className={`group relative flex items-start gap-4 px-5 py-4 border-b border-[var(--border)] cursor-pointer transition-all duration-200 hover:bg-[var(--bg-tertiary)] ${
        !notif.read ? "bg-[var(--accent)]/[0.03]" : ""
      }`}
    >
      {/* Unread dot */}
      {!notif.read && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
      )}

      {/* Avatar + type icon */}
      <div className="relative shrink-0 mt-0.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm border-2"
          style={{
            background: `${notif.user.accent}20`,
            borderColor: `${notif.user.accent}40`,
            color: notif.user.accent,
          }}
        >
          {notif.user.avatar}
        </div>
        {/* Type badge */}
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[var(--bg)]"
          style={{ background: cfg.bg, borderColor: "var(--bg-secondary)" }}
        >
          <Icon size={10} style={{ color: cfg.color }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-[var(--text)] leading-relaxed">
            <span className="font-display font-bold text-[var(--text)] hover:text-[var(--accent-light)] cursor-pointer transition-colors">
              @{notif.user.name}
            </span>{" "}
            <span
              className={
                notif.read ? "text-[var(--text-muted)]" : "text-[var(--text)]"
              }
            >
              {notif.content}
            </span>
            {notif.target && (
              <>
                {" — "}
                <span
                  className="inline-flex items-center gap-1 font-semibold cursor-pointer hover:text-[var(--accent-light)] transition-colors"
                  style={{ color: "var(--accent-light)" }}
                >
                  <Code2 size={11} />
                  {notif.target}
                </span>
              </>
            )}
          </p>
          {/* Timestamp + delete */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[var(--text-subtle)]">
              {notif.ts}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(notif.id);
              }}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-all cursor-pointer border-none bg-transparent"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Comment preview */}
        {notif.extra && (
          <div
            className="mt-2 px-3 py-2 rounded-[var(--radius-md)] text-xs text-[var(--text-muted)] leading-relaxed italic border-l-2"
            style={{
              background: "var(--bg-tertiary)",
              borderLeftColor: cfg.color,
            }}
          >
            "{notif.extra}"
          </div>
        )}
      </div>
    </div>
  );
}
