import { Trophy, Medal, Award, ChevronRight , Crown , Star , Flame } from "lucide-react";

const BADGE_CONFIG = {
  "top-contributor": {
    label: "Top Contributor",
    color: "#f5a623",
    icon: Crown,
  },
  "rising-star": { label: "Rising Star", color: "#5cb8f7", icon: Star },
  prolific: { label: "Prolific Builder", color: "#3ecf8e", icon: Flame },
};
function RankBadge({ rank }) {
  if (rank === 1)
    return (
      <div className="w-10 h-10 rounded-full bg-[#f5a623]/15 border-2 border-[#f5a623]/40 flex items-center justify-center shrink-0">
        <Trophy size={18} style={{ color: "#f5a623" }} />
      </div>
    );
  if (rank === 2)
    return (
      <div className="w-10 h-10 rounded-full bg-[#9ca3af]/15 border-2 border-[#9ca3af]/40 flex items-center justify-center shrink-0">
        <Medal size={18} style={{ color: "#9ca3af" }} />
      </div>
    );
  if (rank === 3)
    return (
      <div className="w-10 h-10 rounded-full bg-[#cd7f32]/15 border-2 border-[#cd7f32]/40 flex items-center justify-center shrink-0">
        <Award size={18} style={{ color: "#cd7f32" }} />
      </div>
    );
  return (
    <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center shrink-0">
      <span className="font-display font-bold text-sm text-[var(--text-muted)]">
        #{rank}
      </span>
    </div>
  );
}

// ── Top 3 Podium Cards ────────────────────────────────────────────────────────
function PodiumCard({ user, size = "md" }) {
  const isLarge = size === "lg";
  const BadgeIcon = user.badge ? BADGE_CONFIG[user.badge]?.icon : null;

  return (
    <div
      className={`relative flex flex-col items-center rounded-[var(--radius-xl)] border bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden ${
        isLarge
          ? "border-[var(--accent)]/40 p-6 pt-8"
          : "border-[var(--border)] p-5 pt-7"
      }`}
      style={
        isLarge
          ? {
              boxShadow: `0 0 0 1px ${user.accent}30, 0 8px 32px ${user.accent}14`,
            }
          : {}
      }
    >
      {/* Rank glow top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-[var(--radius-xl)]"
        style={{ background: user.accent }}
      />

      {/* Rank icon */}
      <div className="absolute top-3 right-3">
        <RankBadge rank={user.rank} />
      </div>

      {/* Avatar */}
      <div
        className={`rounded-full flex items-center justify-center font-display font-extrabold border-2 mb-3 ${
          isLarge ? "w-20 h-20 text-2xl" : "w-14 h-14 text-lg"
        }`}
        style={{
          background: `${user.accent}20`,
          borderColor: `${user.accent}50`,
          color: user.accent,
        }}
      >
        {user.avatar}
      </div>

      {/* Badge */}
      {user.badge && BadgeIcon && (
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold mb-2 font-display"
          style={{
            background: `${BADGE_CONFIG[user.badge].color}18`,
            color: BADGE_CONFIG[user.badge].color,
            border: `1px solid ${BADGE_CONFIG[user.badge].color}30`,
          }}
        >
          <BadgeIcon size={10} />
          {BADGE_CONFIG[user.badge].label}
        </div>
      )}

      {/* Name */}
      <p
        className={`font-display font-extrabold text-[var(--text)] tracking-tight mb-0.5 ${isLarge ? "text-lg" : "text-base"}`}
      >
        @{user.name}
      </p>
      <p className="text-xs text-[var(--text-muted)] mb-4">{user.fullName}</p>

      {/* Stats */}
      <div className="flex flex-col md:flex-row gap-2 w-full">
        {[
          { label: "Components", value: user.components },
          { label: "Likes", value: user.likes.toLocaleString() },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex  flex-col items-center grow-1 p-2 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)]"
          >
            <span className="font-display font-bold text-sm text-[var(--text)]">
              {value}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        {user.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg)] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── User Row ──────────────────────────────────────────────────────────────────
function UserRow({ user }) {
  const BadgeIcon = user.badge ? BADGE_CONFIG[user.badge]?.icon : null;

  return (
    <a
      href={`/profile/${user.name}`}
      className="group flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)] transition-all duration-200 no-underline cursor-pointer"
    >
      {/* Rank */}
      <RankBadge rank={user.rank} />

      {/* Avatar */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0 border-2"
        style={{
          background: `${user.accent}18`,
          borderColor: `${user.accent}40`,
          color: user.accent,
        }}
      >
        {user.avatar}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent-light)] transition-colors">
            @{user.name}
          </span>
          <span className="text-xs text-[var(--text-muted)] hidden sm:block">
            {user.fullName}
          </span>
          {user.badge && BadgeIcon && (
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-display"
              style={{
                background: `${BADGE_CONFIG[user.badge].color}15`,
                color: BADGE_CONFIG[user.badge].color,
                border: `1px solid ${BADGE_CONFIG[user.badge].color}28`,
              }}
            >
              <BadgeIcon size={9} />
              {BADGE_CONFIG[user.badge].label}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {user.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg)] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center gap-6 shrink-0">
        <div className="flex flex-col items-center">
          <span className="font-display font-bold text-sm text-[var(--text)]">
            {user.components}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            components
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-display font-bold text-sm text-[var(--text)]">
            {user.likes.toLocaleString()}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">likes</span>
        </div>
      </div>

      <ChevronRight
        size={16}
        className="text-[var(--border)] group-hover:text-[var(--accent)] transition-colors shrink-0"
      />
    </a>
  );
}

export { PodiumCard, UserRow , RankBadge };
