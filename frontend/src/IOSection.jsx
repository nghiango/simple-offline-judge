import React from 'react';
import { useSettings } from './SettingsContext';

const IOSection = () => {
  const { inputText, setInputText, outputText, setOutputText } = useSettings();
  return (
    <div className="panels-row">
      <div className="panel io-panel">
        <h2 className="panel-title">Input (.in)</h2>
        <textarea
          id="input"
          name="input"
          placeholder="Paste your input here..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          style={{width: '100%', minHeight: 80, fontFamily: 'monospace', fontSize: 15, border: '1px solid #ccc', borderRadius: 4, padding: 8, background: '#fafafa'}}
        />
      </div>
      <div className="panel io-panel">
        <h2 className="panel-title">Expected Output (.out)</h2>
        <textarea
          id="output"
          name="output"
          placeholder="Paste your expected output here..."
          value={outputText}
          onChange={e => setOutputText(e.target.value)}
          style={{width: '100%', minHeight: 80, fontFamily: 'monospace', fontSize: 15, border: '1px solid #ccc', borderRadius: 4, padding: 8, background: '#fafafa'}}
        />
      </div>
    </div>
  );
};

export default IOSection;
