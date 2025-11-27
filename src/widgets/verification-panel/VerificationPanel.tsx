import { useAppStore } from '@/shared/store/useAppStore';
import { ImageViewer } from '@/widgets/image-viewer/ImageViewer';
import { FormPanel } from '@/widgets/form-panel/FormPanel';

export const VerificationPanel = () => {
  const currentPage = useAppStore((state) => state.currentPage);

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* LEFT: Image Panel */}
      <div className="w-full lg:w-1/2 bg-gray-900 p-2 sm:p-4 flex flex-col h-1/3 lg:h-full">
        <ImageViewer />
      </div>

      {/* RIGHT: Form Panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col h-2/3 lg:h-full">
        {/* Header Section */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Verified Data
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Review and correct information from Page {currentPage}
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-1 overflow-hidden">
          <FormPanel />
        </div>
      </div>
    </div>
  );
};