import { useState, useCallback, useEffect } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';
import { Upload, FileText, Images } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

type UploadMode = 'pdf' | 'images';

const PAGE_LABELS = [
  { page: 1, title: 'Patient Information & Medical History', description: 'Personal details, medical conditions, medications' },
  { page: 2, title: 'Dental History & Clinical Findings', description: 'Dental complaints, examination results, diagnosis' },
  { page: 3, title: 'Dental Chart & Treatment Records', description: 'Tooth diagram, procedures, treatment notes' },
  { page: 4, title: 'Consent Forms & Signatures', description: 'Treatment consent, procedure consent, signatures' },
];

export const UploadZone = () => {
  const setAppState = useAppStore((state) => state.setAppState);
  const setUploadMode = useAppStore((state) => state.setUploadMode);
  const setSeparatedPages = useAppStore((state) => state.setSeparatedPages);

  const [isDragging, setIsDragging] = useState(false);
  const [localUploadMode, setLocalUploadMode] = useState<UploadMode>('pdf');

  const handleFile = (file: File) => {
    if (!file) return;

    // Check if it's an image or PDF (basic validation)
    if (!file.type.match('image.*') && !file.type.match('application/pdf')) {
      alert('Please upload an image or PDF file.');
      return;
    }

    // Validate based on upload mode
    if (localUploadMode === 'pdf' && !file.type.match('application/pdf')) {
      alert('Please upload a PDF file in PDF mode.');
      return;
    }

    if (localUploadMode === 'images' && !file.type.match('image.*')) {
      alert('Please upload image files in Images mode.');
      return;
    }

    console.log("File received:", file.name); // Debugging

    // Set upload mode and process file
    if (localUploadMode === 'pdf') {
      setUploadMode('pdf');
      processPdf(file);
    } else {
      setUploadMode('images');
      // For image mode, store as first page in separatedPages
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSeparatedPages([imageUrl]);
        setAppState('verification');
      };
      reader.readAsDataURL(file);
    }
  };

  const processPdf = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

      const maxPages = Math.min(pdf.numPages, 4);
      const pageImages: string[] = [];

      setAppState('loading');

      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2.0 for better quality

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas,
          }).promise;

          const imageUrl = canvas.toDataURL('image/png');
          pageImages.push(imageUrl);
        }
      }

      // Save to store
      // access the store directly or use the hook if we can
      // but we are inside the component so we can use the injected setter
      // Wait... I missed imporitng setSeparatedPages. Let's fix imports first or add it here.
      // I will assume I will add `setSeparatedPages` to the hook at the top.
      // For now, I'll just place the logic here.

      // Note: references to setters need to be updated in the component body
      useAppStore.getState().setSeparatedPages(pageImages);

    } catch (error) {
      console.error("Error processing PDF:", error);
      alert("Failed to process PDF. Please try again or use image mode.");
      setAppState('empty');
    }
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
  }, [handleFile]);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto mt-6 sm:mt-10 space-y-6">
      {/* Upload Mode Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-primary mb-4 text-center">Choose Upload Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* PDF Mode */}
          <button
            onClick={() => setLocalUploadMode('pdf')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${localUploadMode === 'pdf'
              ? 'border-primary bg-primary-light shadow-md'
              : 'border-gray-200 hover:border-primary hover:bg-gray-50'
              }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${localUploadMode === 'pdf' ? 'bg-primary' : 'bg-gray-200'
                }`}>
                <FileText className={`w-6 h-6 ${localUploadMode === 'pdf' ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <div className="text-center">
                <p className="font-bold text-primary">Single PDF File</p>
                <p className="text-xs text-text-secondary mt-1">Upload one 4-page PDF document</p>
              </div>
            </div>
          </button>

          {/* Images Mode */}
          <button
            onClick={() => setLocalUploadMode('images')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${localUploadMode === 'images'
              ? 'border-primary bg-primary-light shadow-md'
              : 'border-gray-200 hover:border-primary hover:bg-gray-50'
              }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${localUploadMode === 'images' ? 'bg-primary' : 'bg-gray-200'
                }`}>
                <Images className={`w-6 h-6 ${localUploadMode === 'images' ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <div className="text-center">
                <p className="font-bold text-primary">4 Separate Images</p>
                <p className="text-xs text-text-secondary mt-1">Upload 4 individual image files</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Page Information Guide */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-primary mb-4 text-center">
          {localUploadMode === 'pdf' ? 'Your PDF should contain these 4 pages:' : 'Upload these 4 pages separately:'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAGE_LABELS.map((pageInfo) => (
            <div key={pageInfo.page} className="flex gap-3 p-3 rounded-lg bg-bg-secondary border border-gray-100">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                {pageInfo.page}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-primary text-sm">{pageInfo.title}</p>
                <p className="text-xs text-text-secondary mt-1">{pageInfo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
            relative border-2 border-dashed rounded-xl py-16 sm:py-24 transition-all duration-200 ease-in-out
            flex flex-col items-center justify-center cursor-pointer bg-white
            ${isDragging
            ? 'border-accent bg-accent-light scale-[1.02]'
            : 'border-border-default hover:border-primary'
          }
          `}
      >
        <input
          type="file"
          accept={localUploadMode === 'pdf' ? 'application/pdf' : 'image/*'}
          onChange={onFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="w-16 h-16 sm:w-20 sm:h-20 text-accent flex items-center justify-center mb-4">
          <Upload className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />
        </div>

        <p className="text-base sm:text-lg font-medium text-primary px-4 text-center">
          {isDragging ? 'Drop it like it\'s hot! 🔥' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs sm:text-sm text-text-secondary mt-2">
          {localUploadMode === 'pdf' ? 'PDF file (max. 10MB)' : 'PNG, JPG, or SVG (max. 10MB per file)'}
        </p>
      </div>
    </div>
  );
};
