// src/Grid.js
import React, { useEffect, useState } from 'react';
import './Grid.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createInitialGrid = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      color: null,
    }))
  );
};

const getRandomColumn = (cols) => {
  return Math.floor(Math.random() * cols);
};

const Grid = ({ rows, cols }) => {
  const [grid, setGrid] = useState(createInitialGrid(rows, cols));
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [selectedColumn, setSelectedColumn] = useState(getRandomColumn(cols));
  const [frameCount, setFrameCount] = useState(0);
  const [colorAlpha, setColorAlpha] = useState(255); // Initial full opacity

  useEffect(() => {
    const interval = setInterval(() => {
      if (frameCount >= 6) {
        setSelectedColumn(getRandomColumn(cols));
        setFrameCount(0);
        setCurrentColor(getRandomColor());
        setColorAlpha(255); // Reset alpha to full opacity for new color
      } else {
        setFrameCount((prevCount) => prevCount + 1);
        setColorAlpha((prevAlpha) => Math.max(prevAlpha - 30, 0)); // Decrease alpha gradually
      }

      setGrid((prevGrid) => {
        const newGrid = createInitialGrid(rows, cols);
        for (let row = rows - 1; row >= 0; row--) {
          for (let col = 0; col < cols; col++) {
            if (col === selectedColumn && row === 0) {
              newGrid[row][col] = { color: `${currentColor}${Math.round(colorAlpha).toString(16)}` };
            } else if (row > 0) {
              newGrid[row][col] = prevGrid[row - 1][col];
            }
          }
        }
        return newGrid;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [rows, cols, currentColor, selectedColumn, frameCount, colorAlpha]);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className="grid-cell"
              key={colIndex}
              style={{ backgroundColor: cell.color || 'black' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
