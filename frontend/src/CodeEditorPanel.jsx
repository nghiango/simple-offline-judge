import React from 'react';
import { useSettings } from './SettingsContext';
import CodeEditor from './CodeEditor';

const CodeEditorPanel = () => {
  const { language } = useSettings();
  return (
    <section className="panel code-editor-panel">
      <h2 className="panel-title">Code Editor</h2>
      <div style={{marginBottom: 8}}>Language: <b>{language}</b></div>
      <div className='code-editor-container'>
        <CodeEditor />
      </div>
    </section>
  );
};

export default CodeEditorPanel;
