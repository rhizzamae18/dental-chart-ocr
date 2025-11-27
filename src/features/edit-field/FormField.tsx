import { useAppStore } from '@/shared/store/useAppStore';

interface FormFieldProps {
  label: string;        // "Patient Name"
  fieldKey: string;     // "patientName" (key in the data)
  type?: 'text' | 'number' | 'date' | 'textarea';
  placeholder?: string;
}

export const FormField = ({
  label,
  fieldKey,
  type = 'text',
  placeholder
}: FormFieldProps) => {

  // Read from store
  const extractedData = useAppStore((state) => state.extractedData);
  const formData = useAppStore((state) => state.formData);
  const updateFormData = useAppStore((state) => state.updateFormData);

  // Get the value: use edited value if exists, otherwise use extracted value
  const value = formData[fieldKey] ?? extractedData?.[fieldKey] ?? '';

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData(fieldKey, e.target.value);
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>

      {/* Input or Textarea */}
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
        />
      )}
    </div>
  );
};