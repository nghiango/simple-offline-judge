import React from 'react';
import { useSettings } from './SettingsContext';

const ResultsSection = () => {
  const { result, loading } = useSettings();
  if (!result && !loading) return null;
  return (
    <section id="result-section" className="panel result-section">
      <h2 className="panel-title">Results</h2>
      {loading && (
        <div style={{textAlign: 'center'}}>
          <div className="loader" style={{marginBottom: 14}}></div>
          <div style={{color: '#1976d2', fontWeight: 600, fontSize: '1.12em', letterSpacing: '0.01em'}}>Judging...</div>
        </div>
      )}
      {result && (
        <div className="result-content" style={{whiteSpace: 'pre-wrap', marginTop: 12}}>{result}</div>
      )}
    </section>
  );
};

export default ResultsSection;
