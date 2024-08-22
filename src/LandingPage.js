import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import Map from './Map.svg';
import { FaMapMarkerAlt, FaTimes, FaLocationArrow, FaDirections, FaMinus, FaPlus } from 'react-icons/fa';

// Component for the popup window to search for directions
function DirectionPopup({ onClose }) {
  const handleSearch = () => {
    // Placeholder for search functionality
    onClose(); // Close the popup after search
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[300px] relative">
        <h2 className="text-lg mb-4 text-blue-600">Directions</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="From"
            className="w-full p-2 border rounded-l-md border-r-0"
          />
          <FaMapMarkerAlt className="text-blue-600 mx-2" />
          <input
            type="text"
            placeholder="To"
            className="w-full p-2 border rounded-r-md border-l-0"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Find Directions
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 underline cursor-pointer flex items-center justify-center mx-auto"
        >
          <FaTimes className="mr-2" /> Close
        </button>
      </div>
    </div>
  );
}

// Main landing page component
export default function LandingPage() {
  // State to control zoom level
  const [zoom, setZoom] = useState(100);
  // State to control dragging of the map
  const [isDragging, setIsDragging] = useState(false);
  // State to track the position of the map
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track the offset during dragging
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // State to control the visibility of the direction popup
  const [showPopup, setShowPopup] = useState(false);

  // Function to zoom in the map
  const zoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 200)); // Cap zoom level at 200%
  }, []);

  // Function to zoom out the map
  const zoomOut = useCallback(() => {
    setZoom((prevZoom) => {
      if (prevZoom <= 100) return prevZoom; // Prevent zooming out beyond 100%
      return Math.max(prevZoom - 10, 50); // Set minimum zoom level to 50%
    });
  }, []);

  // Function to handle double-click to enable/disable dragging
  const handleDoubleClick = useCallback((e) => {
    setIsDragging(!isDragging); // Toggle dragging mode
    if (!isDragging) {
      // Set initial offset when starting to drag
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [isDragging, position]);

  // Function to handle map position during dragging
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      setPosition({ x, y }); // Update map position
    }
  }, [isDragging, offset]);

  // Function to disable dragging when mouse button is released
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Placeholder for finding the current location
  const handleFindCurrentLocation = () => {
    // Implement find current location functionality
  };

  // Function to open the directions popup
  const handleGetDirections = () => {
    setShowPopup(true); // Show the popup when "Get Directions" is clicked
  };

  // Function to close the directions popup
  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div
      className="relative h-screen overflow-hidden bg-no-repeat bg-center bg-cover transition-colors duration-300 bg-gray-100 text-gray-900"
      style={{
        backgroundImage: `url(${Map})`,
        backgroundSize: `${zoom}% auto`, // Control map zoom
        backgroundPosition: `${position.x}px ${position.y}px`, // Control map position
        cursor: isDragging ? 'grabbing' : 'grab', // Change cursor style during dragging
        fontFamily: 'Outfit, sans-serif',
      }}
      onDoubleClick={handleDoubleClick} // Enable/disable dragging on double-click
      onMouseMove={handleMouseMove} // Move the map during dragging
      onMouseUp={handleMouseUp} // Stop dragging when the mouse is released
    >
      {/* Navbar component */}
      <Navbar />

      {/* Buttons for finding the current location and getting directions */}
      <div className="absolute top-[85%] left-4 transform -translate-y-1/2 flex flex-col space-y-4">
        <button
          onClick={handleFindCurrentLocation}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        >
          <FaLocationArrow className="text-xl" />
        </button>
        <button
          onClick={handleGetDirections}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        >
          <FaDirections className="text-xl" />
        </button>
      </div>

      {/* Zoom buttons placed on the right side with equal spacing */}
      <div className="absolute top-[85%] right-4 transform -translate-y-1/2 flex flex-col space-y-4">
        <button
          onClick={zoomOut}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        >
          <FaMinus className="text-xl" />
        </button>
        <button
          onClick={zoomIn}
          className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {/* Render the direction popup */}
      {showPopup && <DirectionPopup onClose={handleClosePopup} />}
    </div>
  );
}
