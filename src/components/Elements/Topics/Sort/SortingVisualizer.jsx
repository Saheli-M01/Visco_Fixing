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
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm ? algorithm.name : sortingAlgorithms[0].name);

  const renderControls = ({ 
    speed, 
    setSpeed, 
    progress,
    isPlaying,
    handleFirst,
    handlePrev,
    handleStart,
    handleNext,
    handleLast,
    togglePlayPause
  }) => {
    return (
      <>
        <div className="algorithm-select">
          <label>Select Algorithm:</label>
          <select 
            className="select-dropdown"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
          >
            {sortingAlgorithms.map(algo => (
              <option key={algo.name} value={algo.name}>{algo.name}</option>
            ))}
          </select>
        </div>

        <div className="array-input">
          <label>Input Array:</label>
          <div className="input-controls">
            <div className="input-group">
              <input 
                type="text" 
                value={inputArray} 
                onChange={(e) => setInputArray(e.target.value)}
                placeholder="Enter comma-separated numbers"
              />
              <div className="speed-control">
                <input 
                  type="range" 
                  min="0.1" 
                  max="2" 
                  step="0.1" 
                  value={speed} 
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
                <span>{speed}x</span>
              </div>
              <button className="play-button" onClick={togglePlayPause}>
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button className="nav-button" onClick={handleFirst}>
            <i className="fa-solid fa-backward-step"></i>
            First
          </button>
          <button className="nav-button" onClick={handlePrev}>
            <i className="fa-solid fa-backward"></i>
            Prev
          </button>
          <button className="nav-button start-button" onClick={handleStart}>
            <i className="fa-solid fa-play"></i>
            Start
          </button>
          <button className="nav-button" onClick={handleNext}>
            <i className="fa-solid fa-forward"></i>
            Next
          </button>
          <button className="nav-button" onClick={handleLast}>
            <i className="fa-solid fa-forward-step"></i>
            Last
          </button>
        </div>
      </>
    );
  };

  const renderVisualization = () => (
    <>
      <h3>Array Elements</h3>
      <div className="array-bars">
        {/* Array bars will be rendered here */}
      </div>
    </>
  );

  const renderCode = (language) => {
    // Get the selected algorithm object
    const algo = sortingAlgorithms.find(a => a.name === selectedAlgorithm) || sortingAlgorithms[0];
    
    // Generate code based on the selected language and algorithm
    let code = '';
    
    switch (language) {
      case 'Python':
        code = `def ${algo.name.toLowerCase().replace(/\s+/g, '_')}(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`;
        break;
      case 'JavaScript':
        code = `function ${algo.name.toLowerCase().replace(/\s+/g, '')}(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;
        break;
      case 'Java':
        code = `public static void ${algo.name.toLowerCase().replace(/\s+/g, '')}(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;
        break;
      case 'C++':
        code = `void ${algo.name.toLowerCase().replace(/\s+/g, '')}(int arr[], int n) {
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;
        break;
      case 'C':
        code = `void ${algo.name.toLowerCase().replace(/\s+/g, '')}(int arr[], int n) {
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;
        break;
      default:
        code = `// ${algo.name} implementation in ${language}`;
    }
    
    return (
      <pre>
        <code className={`language-${language.toLowerCase()}`}>
          {code}
        </code>
      </pre>
    );
  };

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

