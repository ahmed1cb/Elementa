import { useState, useMemo } from "react";
import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  Star,
  Upload,
  Trash2,
  Code2,
  X,
  CheckCheck,
} from "lucide-react";
import { NotificationRow, TYPE_CONFIG } from "./NotificationsPageContents";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    read: false,
    ts: "2 min ago",
    user: { name: "Randdev", avatar: "SD", accent: "#3ecf8e" },
    content: "liked your component",
    target: "Glassmorphism Card",
    targetType: "component",
  },
  {
    id: 2,
    type: "follow",
    read: false,
    ts: "14 min ago",
    user: { name: "kodev", avatar: "KT", accent: "#f05c5c" },
    content: "started following you",
    target: null,
    targetType: null,
  },
  {
    id: 3,
    type: "comment",
    read: false,
    ts: "1 hr ago",
    user: { name: "uxlayer", avatar: "LM", accent: "#f5a623" },
    content: "commented on your component",
    target: "Toast Notification",
    targetType: "component",
    extra: "Really clean implementation! Love the animation timing 🔥",
  },
  {
    id: 4,
    type: "like",
    read: false,
    ts: "2 hr ago",
    user: { name: "gridmaster", avatar: "PS", accent: "#a78bfa" },
    content: "liked your component",
    target: "Neon Input Field",
    targetType: "component",
  },
  {
    id: 5,
    type: "featured",
    read: false,
    ts: "3 hr ago",
    user: { name: "Elementa", avatar: "EL", accent: "#7c6af7" },
    content: "featured your component on the homepage",
    target: "Glassmorphism Card",
    targetType: "component",
  },
  {
    id: 6,
    type: "comment",
    read: true,
    ts: "Yesterday",
    user: { name: "m_codes", avatar: "MJ", accent: "#5cb8f7" },
    content: "commented on your component",
    target: "Scroll Progress Bar",
    targetType: "component",
    extra: "Could you add a version without the dependency?",
  },
  {
    id: 7,
    type: "follow",
    read: true,
    ts: "Yesterday",
    user: { name: "devhana", avatar: "HP", accent: "#3ecf8e" },
    content: "started following you",
    target: null,
    targetType: null,
  },
  {
    id: 8,
    type: "like",
    read: true,
    ts: "2 days ago",
    user: { name: "webwizard", avatar: "CR", accent: "#f05c5c" },
    content: "liked your component",
    target: "Loader Collection",
    targetType: "component",
  },
  {
    id: 9,
    type: "milestone",
    read: true,
    ts: "3 days ago",
    user: { name: "Elementa", avatar: "EL", accent: "#7c6af7" },
    content: "Your component reached 1,000 views!",
    target: "Glassmorphism Card",
    targetType: "component",
  },
  {
    id: 10,
    type: "comment",
    read: true,
    ts: "4 days ago",
    user: { name: "cssmagic", avatar: "YW", accent: "#f5a623" },
    content: "replied to your comment",
    target: "Animated Gradient Button",
    targetType: "component",
    extra: "Agreed, the cubic-bezier makes it feel premium.",
  },
];

const TABS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "likes", label: "Likes" },
  { id: "comments", label: "Comments" },
  { id: "follows", label: "Follows" },
];


export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "likes":
        return notifications.filter((n) => n.type === "like");
      case "comments":
        return notifications.filter((n) => n.type === "comment");
      case "follows":
        return notifications.filter((n) => n.type === "follow");
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const deleteOne = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-[var(--bg)] font-body">
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-[6px] bg-[var(--accent)]/15 flex items-center justify-center">
                <Bell size={14} className="text-[var(--accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest font-display">
                Inbox
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight mb-1">
              Notifications
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {unreadCount > 0 ? (
                <>
                  <strong className="text-[var(--text)]">{unreadCount}</strong>{" "}
                  unread notification{unreadCount !== 1 ? "s" : ""}
                </>
              ) : (
                "You're all caught up!"
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-xs font-semibold font-display text-[var(--text-muted)] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-transparent"
              >
                <CheckCheck size={13} />
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-xs font-semibold font-display text-[var(--text-muted)] cursor-pointer hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all bg-transparent"
              >
                <Trash2 size={13} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border)] mb-6 flex-wrap">
          {TABS.map(({ id, label }) => {
            const count =
              id === "unread"
                ? notifications.filter((n) => !n.read).length
                : id === "likes"
                  ? notifications.filter((n) => n.type === "like").length
                  : id === "comments"
                    ? notifications.filter((n) => n.type === "comment").length
                    : id === "follows"
                      ? notifications.filter((n) => n.type === "follow").length
                      : notifications.length;

            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold font-display cursor-pointer border-none transition-all flex-1 justify-center ${
                  activeTab === id
                    ? "bg-[var(--accent)] text-white"
                    : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {label}
                {count > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === id
                        ? "bg-white/20 text-white"
                        : "bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Notification list ── */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center mb-4">
                <Bell size={22} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="font-display font-bold text-[var(--text)] text-base mb-1">
                No notifications here
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {activeTab === "unread"
                  ? "You've read everything — nice!"
                  : "Nothing to show in this category."}
              </p>
            </div>
          ) : (
            filtered.map((notif) => (
              <NotificationRow
                key={notif.id}
                notif={notif}
                onRead={markRead}
                onDelete={deleteOne}
              />
            ))
          )}
        </div>

        {/* ── Legend ── */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            {Object.entries(TYPE_CONFIG).map(
              ([type, { icon: Icon, color }]) => (
                <div
                  key={type}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] capitalize"
                >
                  <Icon size={12} style={{ color }} />
                  {type}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
