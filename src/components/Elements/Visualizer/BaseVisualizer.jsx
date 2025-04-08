import React, { useState, useRef, useEffect, useCallback } from 'react';
import "../../../styles/ElementStyle/VisualizerStyle/_baseVisualizer.scss";

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
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startHeightCode, setStartHeightCode] = useState(0);
  const [startHeightHistory, setStartHeightHistory] = useState(0);
  const [startWidthLeft, setStartWidthLeft] = useState(0);
  const [startWidthRight, setStartWidthRight] = useState(0);
  const codeDisplayRef = useRef(null);
  const stepHistoryRef = useRef(null);
  const visualizationSectionRef = useRef(null);
  const codeSectionRef = useRef(null);
  const overlayRef = useRef(null);
  const verticalResizeHandleRef = useRef(null);
  const contentRef = useRef(null);
  const horizontalResizeHandleRef = useRef(null);

  const handleRefresh = () => {
    setProgress(0);
    // Additional refresh logic can be passed through props if needed
  };

  const handleVerticalMouseDown = (e) => {
    e.preventDefault();
    if (codeDisplayRef.current && stepHistoryRef.current) {
      setStartY(e.clientY);
      setStartHeightCode(codeDisplayRef.current.offsetHeight);
      setStartHeightHistory(stepHistoryRef.current.offsetHeight);
      setIsDragging(true);
    }
  };

  const handleHorizontalMouseDown = (e) => {
    e.preventDefault();
    if (visualizationSectionRef.current && codeSectionRef.current) {
      setStartX(e.clientX);
      setStartWidthLeft(visualizationSectionRef.current.offsetWidth);
      setStartWidthRight(codeSectionRef.current.offsetWidth);
      setIsDraggingHorizontal(true);
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging && codeDisplayRef.current && stepHistoryRef.current) {
      const diff = e.clientY - startY;
      const newHeightCode = Math.max(100, startHeightCode + diff);
      const newHeightHistory = Math.max(100, startHeightHistory - diff);
      codeDisplayRef.current.style.height = `${newHeightCode}px`;
      stepHistoryRef.current.style.height = `${newHeightHistory}px`;
    }

    if (isDraggingHorizontal && visualizationSectionRef.current && codeSectionRef.current) {
      const diff = e.clientX - startX;
      const newWidthLeft = Math.max(300, startWidthLeft + diff);
      const newWidthRight = Math.max(300, startWidthRight - diff);
      visualizationSectionRef.current.style.width = `${newWidthLeft}px`;
      codeSectionRef.current.style.width = `${newWidthRight}px`;
    }
  }, [isDragging, isDraggingHorizontal, startY, startX, startHeightCode, startHeightHistory, startWidthLeft, startWidthRight]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingHorizontal(false);
  };

  // Add global event listeners for mouse move and mouse up
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging || isDraggingHorizontal) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    // Add event listeners to document
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, isDraggingHorizontal, handleMouseMove]);

  return (
    <div 
      ref={overlayRef}
      className={`visualizer-overlay ${isDragging || isDraggingHorizontal ? 'dragging' : ''}`}
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

        <div className="content" ref={contentRef}>
          {/* Left Section - Visualization */}
          <div className="visualization-section left-section" ref={visualizationSectionRef}>
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

          {/* Horizontal Resize Handle */}
          <div 
            className="horizontal-resize-handle"
            ref={horizontalResizeHandleRef}
            onMouseDown={handleHorizontalMouseDown}
          >
            <div className="handle-bar"></div>
          </div>

          {/* Right Section - Code Display */}
          <div className="code-section right-section" ref={codeSectionRef}>
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
              ref={verticalResizeHandleRef}
              onMouseDown={handleVerticalMouseDown}
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