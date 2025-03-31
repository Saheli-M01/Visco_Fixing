import React, { useEffect, useState } from 'react';
import '../../styles/CommonStyle/_loadingPage.scss';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  const codeLines = [
    "const app = new Application();",
    "await app.initialize();",
    "app.loadResources();",
    "app.setupComponents();",
    "app.start();",
    "// Loading complete"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= codeLines.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control close"></span>
              <span className="control minimize"></span>
              <span className="control maximize"></span>
            </div>
          </div>
          
          <div className="terminal-body">
            <div className="code-lines">
              {codeLines.map((line, index) => (
                <div 
                  key={index} 
                  className={`code-line ${index <= currentLine ? 'active' : ''}`}
                >
                  <span className="line-number">{index + 1}</span>
                  <span className="line-content">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="loading-bar-container">
          <div 
            className="loading-bar-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage; 