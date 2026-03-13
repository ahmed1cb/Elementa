function FormInput({ label, type = "text", placeholder, value, onChange, error, rightElement }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{
        display: "block",
        fontSize: "0.75rem",
        fontWeight: 500,
        color: "var(--text-muted)",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontFamily: "var(--font-body)",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: rightElement ? "11px 42px 11px 14px" : "11px 14px",
            background: "var(--input-bg)",
            border: `1px solid ${error ? "var(--danger)" : "var(--border)"}`,
            borderRadius: "var(--radius-md)",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            outline: "none",
            transition: "border 0.2s, box-shadow 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={e => {
            e.target.style.borderColor = error ? "var(--danger)" : "var(--accent)";
            e.target.style.boxShadow = error
              ? "0 0 0 3px rgba(240,92,92,0.12)"
              : "0 0 0 3px var(--accent-muted)";
          }}
          onBlur={e => {
            e.target.style.borderColor = error ? "var(--danger)" : "var(--border)";
            e.target.style.boxShadow = "none";
          }}
        />
        {rightElement && (
          <div style={{
            position: "absolute", right: "12px", top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)", cursor: "pointer",
            display: "flex", alignItems: "center",
          }}>
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p style={{ fontSize: "0.75rem", color: "var(--danger) !important", marginTop: "5px", fontFamily: "var(--font-body)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput