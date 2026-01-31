import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import "../styles/theme.css";

const API_URL = process.env.REACT_APP_API_URL;

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [speed] = useState(100);
  const [arraySize, setArraySize] = useState(30);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [history, setHistory] = useState([]);

  const timeoutsRef = useRef([]);

  const algorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort,
  };

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const generateNewArray = useCallback(() => {
    clearAllTimeouts();
    setSorting(false);
    const newArr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 300) + 20
    );
    setArray(newArr);
  }, [arraySize, clearAllTimeouts]);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/runs`);
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  }, []);

  const saveRun = async (algo, timeTaken, size) => {
    try {
      await axios.post(`${API_URL}/api/runs`, {
        algorithm: algo,
        timeTaken,
        arraySize: size,
      });
    } catch (err) {
      console.error("Error saving run:", err);
    }
  };

  useEffect(() => {
    generateNewArray();
    fetchHistory();
    return () => clearAllTimeouts();
  }, [arraySize, generateNewArray, fetchHistory, clearAllTimeouts]);

  const handleSort = async () => {
    setSorting(true);
    const sortFn = algorithms[algorithm];
    const animations = sortFn(array);
    let arr = [...array];

    animations.forEach((step, index) => {
      const timeout = setTimeout(() => {
        if (step.type === "swap") {
          const [i, j] = step.indices;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }, speed * index);

      timeoutsRef.current.push(timeout);
    });

    const totalTime = speed * animations.length + 50;
    const endTimeout = setTimeout(async () => {
      setSorting(false);
      await saveRun(algorithm, totalTime, array.length);
      fetchHistory();
    }, totalTime);

    timeoutsRef.current.push(endTimeout);
  };

  return (
    <div className="visualizer-wrapper no-footer">
      <header>
        <h1>⚙️ Sorting Visualizer</h1>
        <p>Visualize algorithms in motion — beautifully.</p>
      </header>

      <div className="controls">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="glass-btn"
          disabled={sorting}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </select>

        <button onClick={generateNewArray} className="glass-btn">
          🔄 New Array
        </button>

        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={sorting}
        />

        <button disabled={sorting} onClick={handleSort} className="glass-btn">
          🚀 Start Sorting
        </button>
      </div>

      <div className="bar-container small-gap">
        {array.map((val, idx) => (
          <motion.div
            key={idx}
            className="bar"
            style={{
              height: `${val}px`,
              background: `linear-gradient(180deg, #00ffff, #ff00ff)`,
              boxShadow: "0 0 10px #00ffff, 0 0 20px #ff00ff",
            }}
            layout
          />
        ))}
      </div>

      <h3>History (Backend Saved Runs):</h3>
      <ul>
        {history.map((run) => (
          <li key={run._id}>
            {run.algorithm} - {run.timeTaken}ms - Array Size: {run.arraySize}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortingVisualizer;
