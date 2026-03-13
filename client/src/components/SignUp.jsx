import { useState } from "react";
import PasswordStrengthBar from "./PasswordStrengthBar";
import FormInput from "./FormInput";
import LogoIcon from "./LogoIcon";
import { EyeClosed, Eye } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });
  const { toggleTheme } = useTheme();
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.username.trim()) e.username = "Username is required";
    else if (!/^[a-z0-9_]{3,20}$/.test(form.username))
      e.username = "3–20 chars: lowercase, numbers, underscores only";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirmPassword)
      e.confirmPassword = "You have to confirm the password";
    else if (form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords does not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)] font-body">
      <div className="hidden lg:flex w-[42%] min-h-screen flex-col justify-between p-12 relative overflow-hidden shrink-0 bg-[var(--accent)]">
        <div className="absolute w-[360px] h-[360px] rounded-full bg-white/[0.07] -top-[100px] -right-[100px] pointer-events-none" />
        <div className="absolute w-[240px] h-[240px] rounded-full bg-white/[0.05] bottom-[60px] -left-[80px] pointer-events-none" />

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-white/20 rounded-[9px] flex items-center justify-center">
            <LogoIcon />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Elementa
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="font-display font-bold text-[2.2rem] text-white leading-[1.15] tracking-tight mb-4">
            Build.
            <br />
            Share.
            <br />
            Inspire.
          </h2>
          <p className="text-white/65 text-sm leading-relaxed max-w-[280px]">
            Join thousands of developers sharing beautiful UI components, live
            previews, and code snippets.
          </p>
        </div>

        <ul className="flex flex-col gap-3 relative z-10 list-none p-0 m-0">
          {[
            "Live component previews",
            "Copy-paste ready snippets",
            "Community likes & comments",
            "Tag-based search & discovery",
          ].map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 text-sm text-white/80"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/45 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[440px]">
          <div className="mb-8">
            <h1 className="font-display font-bold text-[1.75rem] text-[var(--text)] tracking-tight mb-1.5">
              Create your account
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Already have one?{" "}
              <a
                href="/login"
                className="text-[var(--accent-light)] font-medium no-underline hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)]">
              register with email
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="First name"
                placeholder="Jhon"
                value={form.firstName}
                onChange={update("firstName")}
                error={errors.firstName}
              />
              <FormInput
                label="Last name"
                placeholder="Doe"
                value={form.lastName}
                onChange={update("lastName")}
                error={errors.lastName}
              />
            </div>

            <FormInput
              label="Username"
              placeholder="jhondoe"
              value={form.username}
              onChange={update("username")}
              error={errors.username}
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
              error={errors.email}
            />

            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              rightElement={
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[var(--text-muted)] cursor-pointer flex"
                >
                  {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                </span>
              }
            />

            <PasswordStrengthBar password={form.password} />

            <FormInput
              label="Confirm Password"
              type={showPassword2 ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              error={errors.confirmPassword}
              rightElement={
                <span
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="text-[var(--text-muted)] cursor-pointer flex"
                >
                  {showPassword2 ? <EyeClosed size={16} /> : <Eye size={16} />}
                </span>
              }
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={[
                "w-full mt-2 py-[13px] border-none rounded-[var(--radius-md)]",
                "font-display font-bold text-[0.95rem]",
                "flex items-center justify-center gap-2",
                "transition-all duration-200",
                isLoading
                  ? "bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
                  : "bg-[var(--accent)] text-white cursor-pointer hover:opacity-90 active:scale-[0.99]",
              ].join(" ")}
            >
              {isLoading ? (
                <>
                  <svg
                    width="16"
                    height="16"
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
                  Creating account...
                </>
              ) : (
                "Create my account"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
