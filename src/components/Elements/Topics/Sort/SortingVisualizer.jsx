import React, { useState, useEffect } from "react";
import "../../../../styles/ElementStyle/TopicStyle/SortStyle/_sort.scss";

const SortingVisualizer = ({ algorithm, onClose }) => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // Generate a new random array
  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsPaused(false);
  };

  // Initialize array on component mount
  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  // Handle array size change
  const handleArraySizeChange = (e) => {
    setArraySize(parseInt(e.target.value));
  };

  // Handle sorting speed change
  const handleSpeedChange = (e) => {
    setSortingSpeed(100 - parseInt(e.target.value));
  };

  // Generate sorting steps based on the selected algorithm
  const generateSortingSteps = () => {
    const newArray = [...array];
    const newSteps = [];
    
    // Different sorting algorithms
    switch (algorithm.name) {
      case "Bubble Sort":
        bubbleSort(newArray, newSteps);
        break;
      case "Selection Sort":
        selectionSort(newArray, newSteps);
        break;
      case "Insertion Sort":
        insertionSort(newArray, newSteps);
        break;
      case "Merge Sort":
        mergeSort(newArray, 0, newArray.length - 1, newSteps);
        break;
      case "Quick Sort":
        quickSort(newArray, 0, newArray.length - 1, newSteps);
        break;
      case "Heap Sort":
        heapSort(newArray, newSteps);
        break;
      case "Shell Sort":
        shellSort(newArray, newSteps);
        break;
      case "Counting Sort":
        countingSort(newArray, newSteps);
        break;
      case "Radix Sort":
        radixSort(newArray, newSteps);
        break;
      case "Bucket Sort":
        bucketSort(newArray, newSteps);
        break;
      default:
        // Default to bubble sort if algorithm not found
        bubbleSort(newArray, newSteps);
    }
    
    setSteps(newSteps);
    setIsSorting(true);
    setCurrentStep(0);
  };

  // Bubble Sort implementation
  const bubbleSort = (arr, steps) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Add step with comparison
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: [],
          swapped: false
        });
        
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          // Add step with swap
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            sorted: [],
            swapped: true
          });
        }
      }
      
      // Mark the last element as sorted
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: [n - i - 1],
        swapped: false
      });
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Selection Sort implementation
  const selectionSort = (arr, steps) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < n; j++) {
        // Add step with comparison
        steps.push({
          array: [...arr],
          comparing: [minIdx, j],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          swapped: false
        });
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      if (minIdx !== i) {
        // Swap elements
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        
        // Add step with swap
        steps.push({
          array: [...arr],
          comparing: [i, minIdx],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          swapped: true
        });
      }
      
      // Mark the current element as sorted
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        swapped: false
      });
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Insertion Sort implementation
  const insertionSort = (arr, steps) => {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      
      // Add step with comparison
      steps.push({
        array: [...arr],
        comparing: [i],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        swapped: false
      });
      
      while (j >= 0 && arr[j] > key) {
        // Add step with comparison
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          swapped: false
        });
        
        arr[j + 1] = arr[j];
        j--;
      }
      
      arr[j + 1] = key;
      
      // Add step with insertion
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        swapped: true
      });
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Merge Sort implementation
  const mergeSort = (arr, left, right, steps) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      // Add step with division
      steps.push({
        array: [...arr],
        comparing: [left, mid, right],
        sorted: [],
        swapped: false
      });
      
      mergeSort(arr, left, mid, steps);
      mergeSort(arr, mid + 1, right, steps);
      
      merge(arr, left, mid, right, steps);
    }
  };

  // Merge function for Merge Sort
  const merge = (arr, left, mid, right, steps) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temporary arrays
    const L = new Array(n1);
    const R = new Array(n2);
    
    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }
    
    // Merge the temporary arrays back into arr
    let i = 0;
    let j = 0;
    let k = left;
    
    while (i < n1 && j < n2) {
      // Add step with comparison
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        sorted: Array.from({ length: left }, (_, idx) => idx),
        swapped: false
      });
      
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      
      // Add step with insertion
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: k + 1 }, (_, idx) => idx),
        swapped: true
      });
      
      k++;
    }
    
    // Copy the remaining elements of L, if any
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      
      // Add step with insertion
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: k }, (_, idx) => idx),
        swapped: true
      });
    }
    
    // Copy the remaining elements of R, if any
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      
      // Add step with insertion
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: k }, (_, idx) => idx),
        swapped: true
      });
    }
    
    // Mark the merged section as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: right + 1 }, (_, idx) => idx),
      swapped: false
    });
  };

  // Quick Sort implementation
  const quickSort = (arr, low, high, steps) => {
    if (low < high) {
      // Add step with division
      steps.push({
        array: [...arr],
        comparing: [low, high],
        sorted: [],
        swapped: false
      });
      
      const pi = partition(arr, low, high, steps);
      
      quickSort(arr, low, pi - 1, steps);
      quickSort(arr, pi + 1, high, steps);
    }
  };

  // Partition function for Quick Sort
  const partition = (arr, low, high, steps) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Add step with comparison
      steps.push({
        array: [...arr],
        comparing: [j, high],
        sorted: [],
        swapped: false
      });
      
      if (arr[j] < pivot) {
        i++;
        
        // Swap elements
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        
        // Add step with swap
        steps.push({
          array: [...arr],
          comparing: [i, j],
          sorted: [],
          swapped: true
        });
      }
    }
    
    // Swap elements
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    // Add step with swap
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      sorted: [i + 1],
      swapped: true
    });
    
    return i + 1;
  };

  // Heap Sort implementation
  const heapSort = (arr, steps) => {
    const n = arr.length;
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, steps);
    }
    
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Add step with comparison
      steps.push({
        array: [...arr],
        comparing: [0, i],
        sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
        swapped: false
      });
      
      // Move current root to end
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      
      // Add step with swap
      steps.push({
        array: [...arr],
        comparing: [0, i],
        sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
        swapped: true
      });
      
      // Call max heapify on the reduced heap
      heapify(arr, i, 0, steps);
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Heapify function for Heap Sort
  const heapify = (arr, n, i, steps) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Add step with comparison
    steps.push({
      array: [...arr],
      comparing: [i, left, right],
      sorted: [],
      swapped: false
    });
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    
    // If largest is not root
    if (largest !== i) {
      // Swap elements
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      
      // Add step with swap
      steps.push({
        array: [...arr],
        comparing: [i, largest],
        sorted: [],
        swapped: true
      });
      
      // Recursively heapify the affected sub-tree
      heapify(arr, n, largest, steps);
    }
  };

  // Shell Sort implementation
  const shellSort = (arr, steps) => {
    const n = arr.length;
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // Do a gapped insertion sort for this gap size
      for (let i = gap; i < n; i++) {
        // Add step with comparison
        steps.push({
          array: [...arr],
          comparing: [i, i - gap],
          sorted: [],
          swapped: false
        });
        
        // Save arr[i] in temp and make a hole at position i
        const temp = arr[i];
        
        // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
        let j;
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          // Add step with comparison
          steps.push({
            array: [...arr],
            comparing: [j, j - gap],
            sorted: [],
            swapped: false
          });
          
          arr[j] = arr[j - gap];
          
          // Add step with shift
          steps.push({
            array: [...arr],
            comparing: [],
            sorted: [],
            swapped: true
          });
        }
        
        // Put temp (original arr[i]) in its correct location
        arr[j] = temp;
        
        // Add step with insertion
        steps.push({
          array: [...arr],
          comparing: [],
          sorted: [j],
          swapped: true
        });
      }
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Counting Sort implementation
  const countingSort = (arr, steps) => {
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    // Create a count array to store count of each element
    const count = new Array(range).fill(0);
    
    // Store count of each element
    for (let i = 0; i < n; i++) {
      count[arr[i] - min]++;
      
      // Add step with counting
      steps.push({
        array: [...arr],
        comparing: [i],
        sorted: [],
        swapped: false
      });
    }
    
    // Modify count[i] so that count[i] contains actual position of this element in output array
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }
    
    // Create the output array
    const output = new Array(n);
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      // Add step with placement
      steps.push({
        array: [...arr],
        comparing: [i],
        sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
        swapped: false
      });
      
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
      
      // Add step with placement
      steps.push({
        array: [...output],
        comparing: [],
        sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
        swapped: true
      });
    }
    
    // Copy the output array to arr, so that arr now contains sorted elements
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      
      // Add step with copy
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        swapped: true
      });
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Radix Sort implementation
  const radixSort = (arr, steps) => {
    const n = arr.length;
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      // Add step with digit selection
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: [],
        swapped: false
      });
      
      countingSortForRadix(arr, n, exp, steps);
    }
  };

  // Counting Sort for Radix Sort
  const countingSortForRadix = (arr, n, exp, steps) => {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
      
      // Add step with counting
      steps.push({
        array: [...arr],
        comparing: [i],
        sorted: [],
        swapped: false
      });
    }
    
    // Change count[i] so that count[i] contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      // Add step with placement
      steps.push({
        array: [...arr],
        comparing: [i],
        sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
        swapped: false
      });
      
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
      
      // Add step with placement
      steps.push({
        array: [...output],
        comparing: [],
        sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
        swapped: true
      });
    }
    
    // Copy the output array to arr, so that arr now contains sorted elements
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      
      // Add step with copy
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        swapped: true
      });
    }
  };

  // Bucket Sort implementation
  const bucketSort = (arr, steps) => {
    const n = arr.length;
    
    // Create n empty buckets
    const buckets = Array.from({ length: n }, () => []);
    
    // Add step with bucket creation
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: [],
      swapped: false
    });
    
    // Put array elements in different buckets
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor(arr[i] / 10) * 10;
      buckets[bucketIndex].push(arr[i]);
      
      // Add step with bucket placement
      steps.push({
        array: [...arr],
        comparing: [i],
        sorted: [],
        swapped: false
      });
    }
    
    // Sort individual buckets
    for (let i = 0; i < n; i++) {
      buckets[i].sort((a, b) => a - b);
      
      // Add step with bucket sorting
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: [],
        swapped: false
      });
    }
    
    // Concatenate all buckets into arr
    let index = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        arr[index++] = buckets[i][j];
        
        // Add step with concatenation
        steps.push({
          array: [...arr],
          comparing: [],
          sorted: Array.from({ length: index }, (_, idx) => idx),
          swapped: true
        });
      }
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      swapped: false
    });
  };

  // Visualize the sorting steps
  useEffect(() => {
    let timeout;
    
    if (isSorting && currentStep < steps.length) {
      timeout = setTimeout(() => {
        if (!isPaused) {
          setArray(steps[currentStep].array);
          setCurrentStep(currentStep + 1);
        }
      }, sortingSpeed);
    } else if (currentStep >= steps.length) {
      setIsSorting(false);
    }
    
    return () => clearTimeout(timeout);
  }, [isSorting, currentStep, steps, sortingSpeed, isPaused]);

  // Handle play/pause
  const togglePlayPause = () => {
    if (isSorting) {
      setIsPaused(!isPaused);
    } else {
      generateSortingSteps();
    }
  };

  // Handle reset
  const resetVisualization = () => {
    generateNewArray();
  };

  return (
    <div className="sorting-visualizer">
      <div className="visualizer-header">
        <h2>{algorithm.name} Visualization</h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="visualizer-controls">
        <div className="control-group">
          <label htmlFor="array-size">Array Size: {arraySize}</label>
          <input
            type="range"
            id="array-size"
            min="5"
            max="50"
            value={arraySize}
            onChange={handleArraySizeChange}
            disabled={isSorting}
          />
        </div>
        
        <div className="control-group">
          <label htmlFor="sorting-speed">Speed: {sortingSpeed}ms</label>
          <input
            type="range"
            id="sorting-speed"
            min="1"
            max="100"
            value={100 - sortingSpeed}
            onChange={handleSpeedChange}
            disabled={isSorting}
          />
        </div>
        
        <div className="control-buttons">
          <button 
            className="control-btn" 
            onClick={resetVisualization}
            disabled={isSorting && !isPaused}
          >
            <i className="fas fa-redo"></i> Reset
          </button>
          
          <button 
            className="control-btn" 
            onClick={togglePlayPause}
          >
            {isSorting ? (
              isPaused ? (
                <><i className="fas fa-play"></i> Resume</>
              ) : (
                <><i className="fas fa-pause"></i> Pause</>
              )
            ) : (
              <><i className="fas fa-play"></i> Start</>
            )}
          </button>
        </div>
      </div>
      
      <div className="visualizer-container">
        <div className="array-container">
          {array.map((value, idx) => {
            const isComparing = steps[currentStep - 1]?.comparing.includes(idx);
            const isSorted = steps[currentStep - 1]?.sorted.includes(idx);
            const isSwapped = steps[currentStep - 1]?.swapped && isComparing;
            
            return (
              <div
                key={idx}
                className={`array-bar ${isComparing ? 'comparing' : ''} ${isSorted ? 'sorted' : ''} ${isSwapped ? 'swapped' : ''}`}
                style={{
                  height: `${value * 3}px`,
                  width: `${100 / arraySize}%`,
                  margin: `0 ${100 / arraySize / 2}%`
                }}
              >
                <span className="bar-value">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="algorithm-info">
        <h3>Algorithm Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <h4>Time Complexity</h4>
            <p>Worst: {algorithm.timeComplexity.worst}</p>
            <p>Average: {algorithm.timeComplexity.average}</p>
            <p>Best: {algorithm.timeComplexity.best}</p>
          </div>
          <div className="info-item">
            <h4>Space Complexity</h4>
            <p>{algorithm.spaceComplexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
