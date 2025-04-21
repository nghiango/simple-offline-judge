import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState('python');
  const [judgeMode, setJudgeMode] = useState('single');
  const [code, setCode] = useState('');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [batchFiles, setBatchFiles] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState('');

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const value = {
    language,
    setLanguage,
    judgeMode,
    setJudgeMode,
    code,
    setCode,
    inputText,
    setInputText,
    outputText,
    setOutputText,
    batchFiles,
    setBatchFiles,
    selectedTestCase,
    setSelectedTestCase,
    result,
    setResult,
    loading,
    setLoading,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
