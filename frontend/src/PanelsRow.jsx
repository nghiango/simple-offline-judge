import React from 'react';
import TestCasesPanel from './TestCasesPanel';
import SettingsPanel from './SettingsPanel';

const PanelsRow = () => (
  <div className="panels-row">
    <TestCasesPanel />
    <SettingsPanel />
  </div>
);

export default PanelsRow;
