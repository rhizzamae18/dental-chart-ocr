import { useState, useCallback } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';
import { Upload } from 'lucide-react';

export const UploadZone = () => {
  const setUploadedImage = useAppStore((state) => state.setUploadedImage);
  const setAppState = useAppStore((state) => state.setAppState);

  const [isDragging, setIsDragging] = useState(false);
  const handleFile = (file: File) => {
    if (!file) return;

    // Check if it's an image or PDF (basic validation)
    if (!file.type.match('image.*') && !file.type.match('application/pdf')) {
      alert('Please upload an image or PDF file.');
      return;
    }

    console.log("File received:", file.name); // Debugging
    setUploadedImage(file);

    setAppState('loading');

    // (In the future, this is where we trigger the AI API call)
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); // IMPORTANT: Prevents browser from opening the file
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Get the dropped file
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[65%] mx-auto mt-6 sm:mt-10">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
            relative border-2 border-indigo-400 border-dashed rounded-xl py-20 sm:py-32 lg:py-40 transition-all duration-200 ease-in-out
            flex flex-col items-center justify-center cursor-pointer
            ${isDragging
            ? 'border-blue-500 bg-blue-50 scale-[1.02]'
            : 'border-gray-300 hover:border-indigo-600 hover:bg-gray-50'
          }
          `}
      >
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={onFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <p className="text-base sm:text-lg font-medium text-gray-700 px-4 text-center">
          {isDragging ? 'Drop it like it\'s hot! 🔥' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          SVG, PNG, JPG or PDF (max. 10MB)
        </p>
      </div>
    </div>
  );
};