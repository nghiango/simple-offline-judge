import React from 'react';
import { useSettings } from './SettingsContext';

const TestCasesPanel = () => {
  const { batchFiles, setBatchFiles, selectedTestCase, setSelectedTestCase } = useSettings();
  // Group files by base name (e.g., 'foo' for 'foo.in' and 'foo.out')
  const testCaseMap = batchFiles.reduce((map, file) => {
    const name = file.webkitRelativePath || file.name;
    const match = name.match(/^(.*)\.(in|out)$/);
    if (match) {
      const base = match[1];
      const ext = match[2];
      if (!map[base]) map[base] = {};
      map[base][ext] = file;
    }
    return map;
  }, {});

  // Determine the batch filename display (show number of files like legacy)
  const batchFilename = batchFiles.length > 0 ? `${batchFiles.length} files` : '';

  return (
    <section className="panel">
      <h2 className="panel-title">Test Cases</h2>
      {/* Always render batch-filename span, toggle with style */}
      <span
        id="batch-filename"
        className="upload-filename"
        style={{ display: batchFiles.length > 0 ? undefined : 'none' }}
      >
        {batchFilename}
      </span>
      <div className="drop-zone" id="batch-drop-zone">
        <input
          type="file"
          id="batch-folder"
          webkitdirectory="true"
          directory="true"
          multiple
          style={{ display: 'none' }}
          onChange={e => {
            setBatchFiles(Array.from(e.target.files));
          }}
        />
        <div className="drop-zone-content" onClick={() => document.getElementById('batch-folder').click()} style={{cursor: 'pointer'}}>
          <div className="upload-icon" style={{marginBottom: 8}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 20h16a2 2 0 002-2V8.24a2 2 0 00-.59-1.42L16.7 2.11a2 2 0 00-1.42-.59H4a2 2 0 00-2 2v14.5A1.5 1.5 0 004 20z" stroke="#1976d2" strokeWidth="1.5"/>
              <path d="M12 15V10m0-4v4m0 0l-3-3m3 3l3-3" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="drop-text">Drag and drop a folder containing test cases<br/>or <span className="browse-text">browse folder</span></div>
        </div>
      </div>
      {/* Always render batch-info, toggle with style */}
      <div
        id="batch-info"
        className="batch-info"
        style={{ display: batchFiles.length > 0 ? undefined : 'none' }}
      >
        <div className="batch-info-header">
          <span id="batch-count" className="batch-count">{Object.keys(testCaseMap).length} test cases</span>
          <button
            type="button"
            className="clear-batch-btn"
            id="clear-batch-btn"
            title="Clear All Uploaded Inputs/Outputs"
            onClick={() => setBatchFiles([])}
          >
            Clear All
          </button>
        </div>
        <div id="batch-testcases" className="batch-testcases">
          <div className="test-case-select">
            <label id="batch-case-label" htmlFor="batch-case-select">Select Test Case:</label>
            <select
              id="batch-case-select"
              value={selectedTestCase}
              disabled={Object.keys(testCaseMap).length === 0}
              onChange={e => setSelectedTestCase(e.target.value)}
            >
              <option value="" disabled>Select...</option>
              {Object.keys(testCaseMap).map(base => (
                <option key={base} value={base}>{base}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestCasesPanel;
