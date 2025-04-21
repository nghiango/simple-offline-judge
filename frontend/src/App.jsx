import Header from './Header';
import PanelsRow from './PanelsRow';
import IOSection from './IOSection';
import JudgeButtons from './JudgeButtons';
import ResultsSection from './ResultsSection';
import Footer from './Footer';
import { SettingsProvider } from './SettingsContext';
import CodeEditorPanel from './CodeEditorPanel';

function App() {
  return (
    <SettingsProvider>
      <div className="app-container">
        <div className="container">
          <Header />
          <main className="judge-main">
            <PanelsRow />
            <CodeEditorPanel />
            <IOSection />
            <JudgeButtons />
            <ResultsSection />
          </main>
          <Footer />
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;