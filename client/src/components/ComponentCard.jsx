import { useState } from "react";
import { Code2, Eye, Heart, Copy } from "lucide-react";

function ComponentCard({ item }) {
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
    setLiked((l) => !l);
    setLikes((l) => (liked ? l - 1 : l + 1));
  };

  return (
    <div className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      {/* Preview */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `${item.accent}12` }}
      >
        <div
          className="w-16 h-16 rounded-[var(--radius-lg)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${item.accent}22`,
            border: `1.5px solid ${item.accent}44`,
          }}
        >
          <Code2 size={26} style={{ color: item.accent }} />
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-md)] text-white text-xs font-semibold border-none cursor-pointer hover:opacity-90 active:scale-[0.97] transition-all"
            style={{ background: item.accent }}
          >
            <Copy size={13} />
            {copied ? "Copied!" : "Copy code"}
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-md)] bg-white/10 border border-white/20 text-white text-xs font-semibold cursor-pointer hover:bg-white/20 transition-all">
            <Eye size={13} />
            Preview
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-display font-bold text-[var(--text)] text-sm tracking-tight mb-1 leading-tight">
            {item.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            by{" "}
            <span className="text-[var(--accent-light)]">@{item.author}</span>
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-tertiary)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent-light)] transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs cursor-pointer border-none bg-transparent transition-all px-2 py-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-tertiary)] ${
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
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Eye size={12} />
            {item.views.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ComponentCard;
