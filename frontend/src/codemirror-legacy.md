# CodeMirror Legacy Integration

This project uses CodeMirror 5 via `react-codemirror2` for both legacy (static HTML) and modern React frontends.

- For static HTML (templates/index.html), CodeMirror is loaded via CDN and initialized on a `<textarea>`.
- For React, `CodeEditor.jsx` uses `react-codemirror2` with consistent options and styling.

## Key Points
- Theme: `material`
- Font: `JetBrains Mono`
- Features: line numbers, bracket matching, auto close brackets, active line highlighting
- Language modes: Python, C, C++, Java (extendable)

This ensures a consistent code editing experience for users across both legacy and modern versions.
