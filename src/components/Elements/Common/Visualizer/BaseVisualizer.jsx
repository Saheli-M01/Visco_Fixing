import React, { useState, useRef } from 'react';
import "../../../../styles/ElementStyle/Common/Visualizer/_baseVisualizer.scss";

const BaseVisualizer = ({ 
  title,
  onClose,
  renderControls,
  renderVisualization,
  renderCode,
  renderStepHistory,
  languages = ['Python', 'C++', 'Java', 'JavaScript', 'C']
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeightCode, setStartHeightCode] = useState(0);
  const [startHeightHistory, setStartHeightHistory] = useState(0);
  const codeDisplayRef = useRef(null);
  const stepHistoryRef = useRef(null);

  const handleRefresh = () => {
    setProgress(0);
    // Additional refresh logic can be passed through props if needed
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (codeDisplayRef.current && stepHistoryRef.current) {
      setStartY(e.clientY);
      setStartHeightCode(codeDisplayRef.current.offsetHeight);
      setStartHeightHistory(stepHistoryRef.current.offsetHeight);
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && codeDisplayRef.current && stepHistoryRef.current) {
      const diff = e.clientY - startY;
      const newHeightCode = Math.max(100, startHeightCode + diff);
      const newHeightHistory = Math.max(100, startHeightHistory - diff);
      codeDisplayRef.current.style.height = `${newHeightCode}px`;
      stepHistoryRef.current.style.height = `${newHeightHistory}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`visualizer-overlay ${isDragging ? 'dragging' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="visualizer-container">
        <div className="header">
          <button className="refresh-button" onClick={handleRefresh}>
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="content">
          {/* Left Section - Visualization */}
          <div className="visualization-section">
            <div className="controls">
              {renderControls?.({
                speed,
                setSpeed,
                progress
              })}
            </div>

            <div className="visualization-area">
              {renderVisualization?.()}
            </div>
          </div>

          {/* Right Section - Code Display */}
          <div className="code-section">
            <h2>Code Display</h2>
            <div className="language-selector">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="select-dropdown"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="code-display" ref={codeDisplayRef}>
              <div className="code-content">
                {renderCode?.(selectedLanguage)}
              </div>
            </div>

            <div 
              className="resize-handle"
              onMouseDown={handleMouseDown}
            >
              <div className="handle-bar"></div>
            </div>

            <div className="step-history" ref={stepHistoryRef}>
              <h3>Step History:</h3>
              <div className="history-content">
                {renderStepHistory?.()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseVisualizer; 