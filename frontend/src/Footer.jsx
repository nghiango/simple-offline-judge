import React from 'react';
const Footer = () => (
  <footer className="judge-footer">
    <div className="footer-content">
      <div className="footer-text">
        Upload your code and testcases, then judge against single or multiple test cases.
      </div>
      <div className="footer-links">
        <a
          href="https://github.com/nghiango/simple-offline-judge"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.05 1.54 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.13 9.13 0 0 1 2.5-.34c.85 0 1.71.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.58.69.48C19.13 20.58 22 16.76 22 12.26 22 6.58 17.52 2 12 2z" fill="currentColor"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </footer>
);
export default Footer;
