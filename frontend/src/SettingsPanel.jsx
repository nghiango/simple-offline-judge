import React from 'react';
import { useSettings } from './SettingsContext';

const SettingsPanel = () => {
  const { language, setLanguage, judgeMode, setJudgeMode } = useSettings();

  return (
    <section className="panel settings-section">
      <h2 className="panel-title">Settings</h2>
      <div className="settings">
        <div className="setting-group">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="setting-group">
          <label htmlFor="judge-mode-select">Judge Mode:</label>
<select
  id="judge-mode-select"
  value={judgeMode}
  onChange={e => setJudgeMode(e.target.value)}
>
  <option value="single">Single</option>
  <option value="batch">Batch</option>
</select>
        </div>
      </div>
    </section>
  );
};

export default SettingsPanel;
