import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import Map from './Map.svg';

export default function LandingPage() {
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const zoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 200));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 50));
  }, []);

  const handleDoubleClick = useCallback((e) => {
    setIsDragging(!isDragging);
    if (!isDragging) {
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [isDragging, position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      setPosition({ x, y });
    }
  }, [isDragging, offset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const clearFrom = () => setFromValue('');
  const clearTo = () => setToValue('');

  return (
    <div
      className="relative h-screen overflow-hidden bg-no-repeat bg-center bg-cover transition-colors duration-300 bg-gray-100 text-gray-900"
      style={{
        backgroundImage: `url(${Map})`,
        backgroundSize: `${zoom}% auto`,
        backgroundPosition: `${position.x}px ${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        fontFamily: 'Outfit, sans-serif',
      }}
      onDoubleClick={handleDoubleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Navbar />

      <div className="absolute top-15 left-0 h-full w-80 bg-gray-50 bg-opacity-90 shadow-md border-r border-gray-300 p-4 flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            placeholder="From"
            className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <button
            onClick={clearFrom}
            className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300"
          > 
            Clear
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            placeholder="To"
            className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <button
            onClick={clearTo}
            className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col space-y-4">
        <button
          onClick={zoomOut}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        >
          Zoom Out
        </button>
        <button
          onClick={zoomIn}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        >
          Zoom In
        </button>
      </div>
    </div>
  );
}
