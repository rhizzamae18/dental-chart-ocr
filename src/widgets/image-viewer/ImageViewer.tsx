import { useAppStore } from '@/shared/store/useAppStore';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export const ImageViewer = () => {
  const uploadedImage = useAppStore((state) => state.uploadedImage);

  const imageUrl = uploadedImage ? URL.createObjectURL(uploadedImage) : null;

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No image uploaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Zoom Controls - Fixed at top */}
      <div className="flex items-center justify-center gap-2 mb-4 flex-shrink-0">
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        <span className="text-white text-sm font-medium px-3">100%</span>
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          <Maximize className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Image Container - Takes remaining space */}
      <div className="flex-1 overflow-auto bg-black rounded-lg flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Uploaded dental chart"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};