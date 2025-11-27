import { useAppStore } from '@/shared/store/useAppStore';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useState, useRef } from 'react';

export const ImageViewer = () => {
  const uploadedImage = useAppStore((state) => state.uploadedImage);

  // STATE: Track zoom level (starts at 1 = 100%)
  const [zoom, setZoom] = useState(1);

  // REF: Reference to the container for fullscreen;
  const containerRef = useRef<HTMLDivElement>(null);

  // HANDLER: Zoom In (increase by 25%)
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.25, 3)); // Cap at 300%
  }

  // HANDLER: Zoom Out (decrease by 25%)
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.25, 0.5)); // Minimum at 50%
  }

  // HANDLER: Toggle Fullscreen
  const handleFullScreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  const imageUrl = uploadedImage ? URL.createObjectURL(uploadedImage) : null;

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No image uploaded</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      {/* Zoom Controls - Fixed at top */}
      <div className="flex items-center justify-center gap-2 mb-4 py-2 flex-shrink-0">
        <button
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        <span className="text-white text-sm font-medium px-3">{Math.round(zoom * 100)}%</span>
        <button
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        <button
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          onClick={handleFullScreen}
        >
          <Maximize className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Image Container - Takes remaining space */}
      <div className="flex-1 overflow-auto bg-black rounded-lg flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Uploaded dental chart"
          className="max-w-full max-h-full object-contain"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};