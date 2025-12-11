import { Save, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';

// Page 1 Forms
import { PatientInfoForm } from '@/features/edit-field/forms/PatientInfoForm';
import { DentalHistoryForm } from '@/features/edit-field/forms/DentalHistoryForm';
import { MedicalHistoryForm } from '@/features/edit-field/forms/MedicalHistoryForm';

// Page 2 Forms
import { ConsentTreatmentForm } from '@/features/edit-field/forms/ConsentTreatmentForm';
import { ConsentProceduresForm } from '@/features/edit-field/forms/ConsentProceduresForm';
import { SignaturesForm } from '@/features/edit-field/forms/SignaturesForm';

// Page 3 Forms
import { DentalChartForm } from '@/features/edit-field/forms/DentalChartForm';
import { ClinicalFindingsForm } from '@/features/edit-field/forms/ClinicalFindingsForm';

// Page 4 Forms
import { TreatmentRecordsForm } from '@/features/edit-field/forms/TreatmentRecordsForm';
import { UploadNextPageModal } from '@/widgets/upload-next-page-modal/UploadNextPageModal';

const PAGE_TABS = {
    1: [
        { id: 'patient-info', label: 'Patient Info' },
        { id: 'dental-history', label: 'Dental History' },
        { id: 'medical-history', label: 'Medical History' },
    ],
    2: [
        { id: 'informed-treatment', label: 'Informed Consent' },
        { id: 'consent-procedures', label: 'Procedures' },
        { id: 'signatures', label: 'Signatures' },
    ],
    3: [
        { id: 'dental-chart', label: 'Dental Record Chart' },
        { id: 'clinical-findings', label: 'Clinical Findings' },
    ],
    4: [
        { id: 'treatment-records', label: 'Treatment Records' },
    ],
};

// ... all your imports stay the same ...

export const FormPanel = () => {
    const currentPage = useAppStore((state) => state.currentPage);
    const formData = useAppStore((state) => state.formData);
    const nextPage = useAppStore((state) => state.nextPage);
    const previousPage = useAppStore((state) => state.previousPage);
    const uploadMode = useAppStore((state) => state.uploadMode);
    const separatedPages = useAppStore((state) => state.separatedPages);
    const setSeparatedPages = useAppStore((state) => state.setSeparatedPages);


    const tabs = PAGE_TABS[currentPage as keyof typeof PAGE_TABS] || [];
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Reset to first tab when page changes
    useEffect(() => {
        setActiveTab(tabs[0]?.id || '');
    }, [currentPage]);

    const handleSaveAndNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        console.log('Saving Page', currentPage, 'data:', formData);

        if (currentPage >= 4) {
            alert('All 4 pages completed! 🎉\nData saved:\n' + JSON.stringify(formData, null, 2));
            window.location.reload();
            return;
        }

        // For image mode, show modal to upload next page
        if (uploadMode === 'images') {
            setShowUploadModal(true);
        } else {
            // PDF mode: just go to next page
            nextPage();
        }
    };

    const handleModalUpload = (file: File) => {
        // Convert file to data URL and add to separatedPages
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            const updatedPages = [...separatedPages];
            updatedPages[currentPage] = imageUrl; // currentPage is 1-indexed, so this sets page 2, 3, or 4
            setSeparatedPages(updatedPages);
            setShowUploadModal(false);
            nextPage();
        };
        reader.readAsDataURL(file);
    };


    const handleModalCancel = () => {
        setShowUploadModal(false);
    };

    return (
        <form onSubmit={handleSaveAndNext} className="flex flex-col h-full">
            {/* Tab Navigation - Scrollable on mobile */}
            <div className="px-4 sm:px-6 pt-3 sm:pt-4 flex-shrink-0">
                <div className="flex gap-1 border-b border-default overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                border-b-4 -mb-[1px]
                ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-text-primary'
                                }
              `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
                {/* All your form conditions stay the same */}
                {activeTab === 'patient-info' && currentPage === 1 && <PatientInfoForm />}
                {activeTab === 'dental-history' && <DentalHistoryForm />}
                {activeTab === 'medical-history' && <MedicalHistoryForm />}

                {activeTab === 'informed-treatment' && currentPage === 2 && <ConsentTreatmentForm />}
                {activeTab === 'consent-procedures' && <ConsentProceduresForm />}
                {activeTab === 'signatures' && <SignaturesForm />}

                {activeTab === 'dental-chart' && currentPage === 3 && <DentalChartForm />}
                {activeTab === 'clinical-findings' && <ClinicalFindingsForm />}

                {activeTab === 'treatment-records' && currentPage === 4 && <TreatmentRecordsForm />}
            </div>

            {/* Navigation Buttons - Fixed at bottom */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-default flex-shrink-0">
                <div className="flex gap-3">
                    {/* Previous Button */}
                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Save & Next Button */}
                    <button
                        type="submit"
                        className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white text-sm sm:text-base font-medium rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                    >
                        {currentPage >= 4 ? (
                            <>
                                <span>Save & Finish</span>
                                <span>✓</span>
                            </>
                        ) : (
                            <>
                                <div className='flex space-x-2 items-center'>
                                    <Save className="h-5 w-5" />
                                    <h1>Save & Next Page →</h1>
                                </div>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Upload Modal */}
            <UploadNextPageModal
                isOpen={showUploadModal}
                currentPage={currentPage + 1}
                onUpload={handleModalUpload}
                onCancel={handleModalCancel}
            />
        </form>
    );
};