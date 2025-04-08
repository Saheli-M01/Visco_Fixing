import React, { useState } from 'react';
import BaseVisualizer from '../../Visualizer/BaseVisualizer';
import "../../../../styles/ElementStyle/TopicStyle/SortStyle/_sortingVisualizer.scss";

const sortingAlgorithms = [
  // Comparison-Based Algorithms
  {
    name: "Bubble Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" },
    spaceComplexity: "O(1)",
  },
  {
    name: "Selection Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n²)" },
    spaceComplexity: "O(1)",
  },
  {
    name: "Insertion Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n²)", best: "O(n)" },
    spaceComplexity: "O(1)",
  },
  {
    name: "Merge Sort",
    timeComplexity: {
      worst: "O(n log n)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(n)",
  },
  {
    name: "Quick Sort",
    timeComplexity: {
      worst: "O(n²)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(log n)",
  },
  {
    name: "Heap Sort",
    timeComplexity: {
      worst: "O(n log n)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(1)",
  },
  {
    name: "Shell Sort",
    timeComplexity: {
      worst: "O(n²)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    spaceComplexity: "O(1)",
  },
  // Non-Comparison-Based Algorithms
  {
    name: "Counting Sort",
    timeComplexity: { worst: "O(n+k)", average: "O(n+k)", best: "O(n+k)" },
    spaceComplexity: "O(k)",
  },
  {
    name: "Radix Sort",
    timeComplexity: {
      worst: "O(d(n+k))",
      average: "O(d(n+k))",
      best: "O(d(n+k))",
    },
    spaceComplexity: "O(n+k)",
  },
  {
    name: "Bucket Sort",
    timeComplexity: { worst: "O(n²)", average: "O(n+k)", best: "O(n+k)" },
    spaceComplexity: "O(n+k)",
  },
];

const SortingVisualizer = ({ algorithm, onClose }) => {
  const [inputArray, setInputArray] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);

  const renderControls = ({ speed, setSpeed, progress }) => (
    <>
      <div className="algorithm-select">
        <label>Select Algorithm:</label>
        <select 
          value={selectedAlgorithm.name} 
          className="select-dropdown"
          onChange={(e) => {
            const newAlgo = sortingAlgorithms.find(algo => algo.name === e.target.value);
            setSelectedAlgorithm(newAlgo);
          }}
        >
          <optgroup label="Comparison-Based Algorithms">
            {sortingAlgorithms.slice(0, 7).map((algo) => (
              <option key={algo.name} value={algo.name}>
                {algo.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Non-Comparison-Based Algorithms">
            {sortingAlgorithms.slice(7).map((algo) => (
              <option key={algo.name} value={algo.name}>
                {algo.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="array-input">
        <label>Enter Array:</label>
        <div className="input-controls">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter up to 10 numbers (e.g., 64,34,25,12,22)"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
            />
            <div className="speed-control">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
              />
              <span>{speed}x</span>
            </div>
            <button className="play-button">
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-button">
          <i className="fa-solid fa-backward-step"></i> First
        </button>
        <button className="nav-button">
          <i className="fa-solid fa-chevron-left"></i> Prev
        </button>
        <button className="nav-button start-button">Start</button>
        <button className="nav-button">
          Next <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button className="nav-button">
          Last <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>
    </>
  );

  const renderVisualization = () => (
    <>
      <h3>Array Elements</h3>
      <div className="array-bars">
        {/* Array bars will be rendered here */}
      </div>
    </>
  );

  const renderCode = (selectedLanguage) => (
    <pre>
      <code className={`language-${selectedLanguage.toLowerCase()}`}>
        {`def ${selectedAlgorithm.name.toLowerCase().replace(/\s+/g, '_')}(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`}
      </code>
    </pre>
  );

  const renderStepHistory = () => (
    // Step history content will be added here
    null
  );

  return (
    <BaseVisualizer
      title="Sorting Visualization"
      onClose={onClose}
      renderControls={renderControls}
      renderVisualization={renderVisualization}
      renderCode={renderCode}
      renderStepHistory={renderStepHistory}
    />
  );
};

export default SortingVisualizer;

