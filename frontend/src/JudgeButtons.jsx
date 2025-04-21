import React from 'react';
import { useSettings } from './SettingsContext';

const JudgeButtons = () => {
  const {
    judgeMode, language, setLoading, setResult, code, inputText, outputText, batchFiles, loading
  } = useSettings();
  const handleJudge = async () => {
    setLoading(true);
    setResult('');
    try {
      const formData = new FormData();
      formData.append('code', code);
      formData.append('input', inputText);
      formData.append('output', outputText);
      formData.append('language', language);
      formData.append('mode', judgeMode);
      const resp = await fetch('/run', { method: 'POST', body: formData });
      const data = await resp.json();
      setResult(data.result || JSON.stringify(data));
    } catch (err) {
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJudgeAll = async () => {
    setLoading(true);
    setResult('');
    try {
      // For batch judging, run for each test case in batchFiles
      if (!batchFiles.length) {
        setResult('No batch files uploaded.');
        setLoading(false);
        return;
      }
      // Group files by base
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
      const results = [];
      for (const base of Object.keys(testCaseMap)) {
        const tc = testCaseMap[base];
        if (!tc.in || !tc.out) {
          results.push({ name: base, result: 'Missing .in or .out file', status: 'error' });
          continue;
        }
        const inputText = await tc.in.text();
        const outputText = await tc.out.text();
        const formData = new FormData();
        formData.append('code', code);
        formData.append('input', inputText);
        formData.append('output', outputText);
        formData.append('language', language);
        formData.append('mode', judgeMode);
        try {
          const resp = await fetch('/run', { method: 'POST', body: formData });
          const data = await resp.json();
          results.push({ name: base, result: data.result, status: 'ok' });
        } catch (err) {
          results.push({ name: base, result: 'Error: ' + err, status: 'error' });
        }
      }
      setResult(results.map(r => `${r.name}: ${r.result}`).join('\n'));
    } catch (err) {
      setResult('Batch judging failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel judge-buttons-panel">
      <button className="judge-btn" onClick={handleJudge} disabled={loading}>Judge</button>
      <button className="judge-btn" style={{marginLeft: 8}} onClick={handleJudgeAll} disabled={loading}>Judge All</button>
      <div style={{marginTop: 10, color: '#555', fontSize: '0.95em'}}>
        <b>Mode:</b> {judgeMode} &nbsp; | &nbsp; <b>Language:</b> {language}
      </div>
    </section>
  );
};

export default JudgeButtons;
