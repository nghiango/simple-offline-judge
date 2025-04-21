import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useSettings } from './SettingsContext';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';

export default function CodeEditor() {
  const { code, setCode, language } = useSettings();

  // Map context language to CodeMirror mode
  const modeMap = {
    python: 'python',
    cpp: 'text/x-c++src',
    c: 'text/x-csrc',
    java: 'text/x-java',
  };

  return (
    <div className="code-editor-panel">
      <CodeMirror
        value={code}
        options={{
          mode: modeMap[language] || 'python',
          theme: 'default',
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          tabSize: 4,
          indentUnit: 4,
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onBeforeChange={(_editor, _data, value) => setCode(value)}
      />
    </div>
  );
}
