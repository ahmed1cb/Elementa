import { Heart } from "lucide-react";
import LogoIcon from "./LogoIcon";

const FOOTER_LINKS = {
  Platform: [
    { label: "Components", href: "/components" },
    { label: "Top Users", href: "/users" },
    { label: "Share", href: "/new" },
  ],
  Account: [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Notifications", href: "/notifications" },
  ],
  Project: [
    { label: "GitHub", href: "https://github.com/ahmed1cb/elementa" },
    { label: "MIT License", href: "/license" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-12">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-[8px] flex items-center justify-center">
               <LogoIcon/>
              </div>
              <span className="font-display font-extrabold text-base text-[var(--text)] tracking-tight">
                Elementa
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[200px]">
              The open-source platform for sharing HTML, CSS & JS components.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display font-bold text-xs text-[var(--text)] uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}
                      className="text-sm text-[var(--text-muted)] no-underline hover:text-[var(--text)] transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Elementa. Released under the MIT License Made By AHmed Hassan , Ui design by Claude Ai.
          </p>
        </div>
      </div>
    </footer>
  );
}