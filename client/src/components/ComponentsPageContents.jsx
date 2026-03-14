import { Code2, Eye, Heart, Copy } from "lucide-react";
import { useState } from "react";

function ListRow({ item }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);

  const handleCopy = (e) => {
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((p) => !p);
    setLikes((p) => (liked ? p - 1 : p + 1));
  };

  return (
    <div className="group flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)] transition-all duration-200 cursor-pointer">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{
          background: `${item.accent}18`,
          border: `1.5px solid ${item.accent}38`,
        }}
      >
        <Code2 size={20} style={{ color: item.accent }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-display font-bold text-sm text-[var(--text)] tracking-tight truncate">
            {item.title}
          </h3>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium"
            style={{
              background: `${item.accent}18`,
              color: item.accent,
              border: `1px solid ${item.accent}30`,
            }}
          >
            {item.category}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-2">
          by <span className="text-[var(--accent-light)]">@{item.author}</span>
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
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
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-xs cursor-pointer border-none bg-transparent transition-all px-2 py-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg)] ${
            liked ? "text-[var(--danger)]" : "text-[var(--text-muted)]"
          }`}
        >
          <Heart
            size={13}
            fill={liked ? "var(--danger)" : "none"}
            strokeWidth={liked ? 0 : 2}
          />
          {likes.toLocaleString()}
        </button>
        <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
          <Eye size={12} />
          {item.views.toLocaleString()}
        </span>
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-white text-xs font-semibold border-none cursor-pointer hover:opacity-90 transition-all"
          style={{ background: item.accent }}
        >
          <Copy size={12} />
          {copied ? "Copied!" : "Copy"}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] text-xs font-semibold cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-transparent">
          <Eye size={12} />
          Preview
        </button>
      </div>
    </div>
  );
}

export { ListRow };
