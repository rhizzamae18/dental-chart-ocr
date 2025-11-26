import { FormField } from '../FormField';
import { RadioField } from '../RadioField';

export const MedicalHistoryForm = () => {
    return (
        <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-800 mb-4">
                Medical History
            </h4>

            <FormField
                label="Name of Physician"
                fieldKey="physicianName"
                placeholder="Dr. Name"
            />

            <FormField
                label="Specialty (if applicable)"
                fieldKey="physicianSpecialty"
                placeholder="Specialty"
            />

            <FormField
                label="Office Address"
                fieldKey="physicianAddress"
                type="textarea"
                placeholder="Physician's office address"
            />

            <FormField
                label="Office Number"
                fieldKey="physicianPhone"
                placeholder="Contact number"
            />

            <div className="border-t border-gray-200 pt-4 mt-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    Health Questions
                </h5>

                <RadioField
                    label="Are you in good health?"
                    fieldKey="goodHealth"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <RadioField
                    label="Are you under medical treatment now?"
                    fieldKey="underTreatment"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <FormField
                    label="If yes, what is the condition being treated?"
                    fieldKey="treatmentCondition"
                    type="textarea"
                    placeholder="Describe condition..."
                />

                <RadioField
                    label="Have you had any serious illness or surgical operation?"
                    fieldKey="seriousIllness"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <FormField
                    label="If yes, what illness or operation?"
                    fieldKey="illnessDetails"
                    type="textarea"
                    placeholder="Describe illness or operation..."
                />

                <RadioField
                    label="Have you been hospitalized?"
                    fieldKey="hospitalized"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <FormField
                    label="If yes, when and why?"
                    fieldKey="hospitalizationDetails"
                    type="textarea"
                    placeholder="When and why were you hospitalized..."
                />

                <RadioField
                    label="Are you taking any prescription/non-prescription medication?"
                    fieldKey="medications"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <FormField
                    label="If yes, please specify medications"
                    fieldKey="medicationsList"
                    type="textarea"
                    placeholder="List medications..."
                />

                <RadioField
                    label="Do you use tobacco products?"
                    fieldKey="tobacco"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <RadioField
                    label="Do you use alcohol, cocaine or other dangerous drugs?"
                    fieldKey="substanceUse"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    Allergies
                </h5>

                <FormField
                    label="Are you allergic to any of the following?"
                    fieldKey="allergies"
                    type="textarea"
                    placeholder="Local Anesthetic, Penicillin, Antibiotics, Aspirin, Latex, Sulfa drugs, Others..."
                />
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    For Women Only
                </h5>

                <RadioField
                    label="Are you pregnant?"
                    fieldKey="pregnant"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                        { label: "N/A", value: "na" },
                    ]}
                    layout='vertical'
                />

                <RadioField
                    label="Are you nursing?"
                    fieldKey="nursing"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    layout='vertical'
                />

                <RadioField
                    label="Are you taking birth control pills?"
                    fieldKey="birthControl"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                        { label: "N/A", value: "na" },
                    ]}
                    layout='vertical'
                />
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    Medical Conditions
                </h5>

                <RadioField
                    label="Blood Type"
                    fieldKey="bloodType"
                    options={[
                        { label: "A", value: "A" },
                        { label: "B", value: "B" },
                        { label: "AB", value: "AB" },
                        { label: "O", value: "O" },
                        { label: "Unknown", value: "unknown" }
                    ]}
                    layout='vertical'
                />

                <FormField
                    label="Blood Pressure"
                    fieldKey="bloodPressure"
                    placeholder="e.g., 120/80"
                />

                <FormField
                    label="Do you have or have you had any of the following?"
                    fieldKey="medicalConditions"
                    type="textarea"
                    placeholder="High Blood Pressure, Heart Disease, Cancer/Tumors, Diabetes, Hepatitis/Liver Disease, etc."
                />
            </div>
        </div>
    );
};