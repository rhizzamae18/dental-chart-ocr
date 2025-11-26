import { Save } from 'lucide-react'
import { useState } from 'react';
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

const PAGE_TABS = {
    1: [
        { id: 'patient-info', label: 'Patient Info' },
        { id: 'dental-history', label: 'Dental History' },
        { id: 'medical-history', label: 'Medical History' },
    ],
    2: [
        { id: 'consent-treatment', label: 'Treatment Consent' },
        { id: 'consent-procedures', label: 'Procedures' },
        { id: 'signatures', label: 'Signatures' },
    ],
    3: [
        { id: 'patient-info', label: 'Patient Info' },
        { id: 'dental-chart', label: 'Dental Chart' },
        { id: 'clinical-findings', label: 'Clinical Findings' },
    ],
    4: [
        { id: 'patient-info', label: 'Patient Info' },
        { id: 'treatment-records', label: 'Treatment Records' },
    ],
};

// ... all your imports stay the same ...

export const FormPanel = () => {
    const currentPage = useAppStore((state) => state.currentPage);
    const formData = useAppStore((state) => state.formData);
    const nextPage = useAppStore((state) => state.nextPage);
    const resetPage = useAppStore((state) => state.resetPage);

    const tabs = PAGE_TABS[currentPage as keyof typeof PAGE_TABS] || [];
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

    const handleSaveAndNext = () => {
        console.log('Saving Page', currentPage, 'data:', formData);

        if (currentPage >= 4) {
            alert('All 4 pages completed! 🎉\nData saved:\n' + JSON.stringify(formData, null, 2));
            return;
        }

        nextPage();
        resetPage();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Tab Navigation - Scrollable on mobile */}
            <div className="px-4 sm:px-6 pt-3 sm:pt-4 flex-shrink-0">
                <div className="flex gap-1 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                border-b-4 -mb-[1px]
                ${activeTab === tab.id
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
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

                {activeTab === 'consent-treatment' && <ConsentTreatmentForm />}
                {activeTab === 'consent-procedures' && <ConsentProceduresForm />}
                {activeTab === 'signatures' && <SignaturesForm />}

                {activeTab === 'patient-info' && currentPage === 3 && <PatientInfoForm />}
                {activeTab === 'dental-chart' && <DentalChartForm />}
                {activeTab === 'clinical-findings' && <ClinicalFindingsForm />}

                {activeTab === 'patient-info' && currentPage === 4 && <PatientInfoForm />}
                {activeTab === 'treatment-records' && <TreatmentRecordsForm />}
            </div>

            {/* Save Button - Fixed at bottom */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
                <button
                    onClick={handleSaveAndNext}
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    {currentPage >= 4 ? (
                        <>
                            <span>Save & Finish</span>
                            <span>✓</span>
                        </>
                    ) : (
                        <>
                        <div className='flex space-x-2 items-center'>
                            <Save className="h-5 w-5"/>
                            <h1>Save & Next Page →</h1>
                        </div>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};