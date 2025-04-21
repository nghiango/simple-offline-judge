import React from 'react';
import PanelsRow from './PanelsRow';
import CodeEditorPanel from './CodeEditorPanel';
import IOSection from './IOSection';
import JudgeButtons from './JudgeButtons';
import ResultsSection from './ResultsSection';

const JudgeForm = () => (
  <form id="judge-form" autoComplete="off">
    <PanelsRow />
    <CodeEditorPanel />
    <IOSection />
    <JudgeButtons />
    <ResultsSection />
  </form>
);

export default JudgeForm;
