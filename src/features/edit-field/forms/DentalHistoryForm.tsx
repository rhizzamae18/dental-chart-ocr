import { FormField } from '../FormField';

export const DentalHistoryForm = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-800 mb-4">
        Dental History
      </h4>

      <FormField 
        label="Previous Dentist" 
        fieldKey="previousDentist" 
        placeholder="Dr. Name"
      />

      <FormField 
        label="Last Dental Visit" 
        fieldKey="lastDentalVisit" 
        type="date"
      />

      <FormField 
        label="Whom may we thank for referring you?" 
        fieldKey="referredBy" 
        placeholder="Referral source"
      />

      <FormField 
        label="What is your reason for dental consultation?" 
        fieldKey="consultationReason" 
        type="textarea"
        placeholder="Describe your dental concerns..."
      />
    </div>
  );
};