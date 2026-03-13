function PasswordStrengthBar({ password }) {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;

  return (
    <div style={{ marginTop: "-0.5rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "5px" }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: "3px", borderRadius: "99px",
            background: i <= score ? color : "var(--border)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <p style={{
        fontSize: "0.72rem",
        color: color,
        fontFamily: "var(--font-body)",
        fontWeight: 500,
      }}>
        {label} password
      </p>
    </div>
  );
}

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "var(--danger)" };
  if (score <= 2) return { score, label: "Fair", color: "var(--warning)" };
  if (score <= 3) return { score, label: "Good", color: "var(--info)" };
  return { score, label: "Strong", color: "var(--success)" };
}

export {getPasswordStrength}
export default PasswordStrengthBar