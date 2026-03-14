import { useState } from "react";
import { X, Hash } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
function CodeEditor({ value, onChange, language }) {
  const COLORS = { html: "#f5a623", css: "#5cb8f7", js: "#3ecf8e" };
  const MONACO_LANG = { html: "html", css: "css", js: "javascript" };
  const color = COLORS[language] || "var(--accent)";

  function handleEditorMount(editor, monaco) {
    monaco.editor.defineTheme("elementa-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "44444f", fontStyle: "italic" },
        { token: "keyword", foreground: "a89cf7" },
        { token: "string", foreground: "3ecf8e" },
        { token: "number", foreground: "f5a623" },
        { token: "tag", foreground: "f05c5c" },
        { token: "attribute.name", foreground: "5cb8f7" },
        { token: "attribute.value", foreground: "3ecf8e" },
        { token: "delimiter.html", foreground: "6b6b7a" },
        { token: "metatag.html", foreground: "f05c5c" },
      ],
      colors: {
        "editor.background": "#0c0c0e",
        "editor.foreground": "#f0f0f4",
        "editor.lineHighlightBackground": "#131316",
        "editorLineNumber.foreground": "#2a2a32",
        "editorLineNumber.activeForeground": "#6b6b7a",
        "editor.selectionBackground": "#7c6af730",
        "editor.inactiveSelectionBackground": "#7c6af718",
        "editorCursor.foreground": color,
        "editorIndentGuide.background1": "#2a2a32",
        "editorIndentGuide.activeBackground1": "#3e3e4a",
        "editorWidget.background": "#131316",
        "editorSuggestWidget.background": "#131316",
        "editorSuggestWidget.border": "#2a2a32",
        "editorSuggestWidget.selectedBackground": "#7c6af720",
        "input.background": "#16161b",
        "input.border": "#2a2a32",
        "scrollbarSlider.background": "#2a2a3280",
        "scrollbarSlider.hoverBackground": "#3e3e4a80",
        "scrollbarSlider.activeBackground": "#7c6af750",
      },
    });
    
    monaco.editor.setTheme("elementa-dark");

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border)] shrink-0"
        style={{ background: "#0c0c0e" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-widest font-display px-2 py-0.5 rounded-full"
          style={{
            color,
            background: `${color}18`,
            border: `1px solid ${color}28`,
          }}
        >
          {language}
        </span>
        <span className="text-[10px]" style={{ color: "#44444f" }}>
          {value.split("\n").length} lines
        </span>
      </div>

      {/* Monaco */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language={MONACO_LANG[language]}
          value={value}
          onChange={(val) => onChange(val ?? "")}
          onMount={handleEditorMount}
          loading={
            <div
              className="flex items-center justify-center h-full"
              style={{
                background: "#0c0c0e",
                color: "#44444f",
                fontSize: "12px",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Loading editor...
            </div>
          }
          
          options={{
            fontSize: 13,
            fontFamily:
              "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
            fontLigatures: true,
            lineHeight: 22,
            tabSize: 2,
            
            insertSpaces: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "gutter",
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            formatOnType: true,
            suggest: { showSnippets: true, showWords: true },
            quickSuggestions: { other: true, comments: false, strings: true },
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
              useShadows: false,
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderLineHighlightOnlyWhenFocus: true,
            lineNumbersMinChars: 3,
          }}
        />
      </div>
    </div>
  );
}

const CONSOLE_INJECTOR = `
<script>
(function() {
  var _methods = ['log','warn','error','info','debug'];
  _methods.forEach(function(method) {
    var original = console[method].bind(console);
    console[method] = function() {
      var args = Array.prototype.slice.call(arguments);
      var serialized = args.map(function(a) {
        try {
          if (a instanceof Error) return a.toString();
          if (typeof a === 'object' && a !== null) return JSON.stringify(a, null, 2);
          return String(a);
        } catch(e) { return '[unserializable]'; }
      });
      window.parent.postMessage({ type: 'console', method: method, args: serialized, ts: Date.now() }, '*');
    };
  });
  window.addEventListener('error', function(e) {
    window.parent.postMessage({ type: 'console', method: 'error', args: [e.message + (e.filename ? ' (' + e.lineno + ':' + e.colno + ')' : '')], ts: Date.now() }, '*');
  });
  window.addEventListener('unhandledrejection', function(e) {
    window.parent.postMessage({ type: 'console', method: 'error', args: ['Unhandled Promise rejection: ' + (e.reason || 'unknown')], ts: Date.now() }, '*');
  });
})();
<\/script>`;
function LivePreview({ html, css, js, headHtml, refreshKey = 0 }) {
  const buildDoc = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
${headHtml}
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0c0c0e; padding: 1rem; }
  ${css}
</style>
</head>
<body>
${CONSOLE_INJECTOR}
${html}
<script>${js}<\/script>
</body>
</html>`;

  return (
    <iframe
      key={refreshKey}
      title="Component Preview"
      sandbox="allow-scripts"
      srcDoc={buildDoc()}
      className="w-full h-full border-none bg-[#0c0c0e]"
    />
  );
}

function TagInput({ tags, onChange }) {
  const [input, setInput] = useState("");

  const addTag = (val) => {
    const tag = val.trim().replace(/[^a-zA-Z0-9+#.\-]/g, "");
    if (tag && !tags.includes(tag) && tags.length < 6) {
      onChange([...tags, tag]);
    }
    setInput("");
  };

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag));

  return (
    <div className="flex flex-wrap gap-1.5 items-center min-h-[42px] px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input-bg)] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-muted)] transition-all">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-display"
          style={{
            background: "var(--accent-muted)",
            color: "var(--accent-light)",
            border: "1px solid rgba(124,106,247,0.25)",
          }}
        >
          <Hash size={9} />
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="ml-0.5 cursor-pointer border-none bg-transparent text-[var(--accent-light)] hover:text-[var(--danger)] transition-colors"
          >
            <X size={9} />
          </button>
        </span>
      ))}
      {tags.length < 6 && (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(input);
            }
            if (e.key === "Backspace" && !input && tags.length)
              removeTag(tags[tags.length - 1]);
          }}
          placeholder={
            tags.length === 0 ? "Add tags (Enter to confirm)..." : ""
          }
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] font-body"
        />
      )}
    </div>
  );
}

export { TagInput, LivePreview, CodeEditor };
