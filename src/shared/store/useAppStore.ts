import { create } from 'zustand';

// DEFINE THE TYPES
// This describes what shape our data has
interface AppState {
    // What screen are we showing?
    appState: 'empty' | 'loading' | 'verification';

    // Which page of the dental form (1-4)?
    currentPage: number;

    // The uploaded image file
    uploadedImage: File | null;

    // Data extracted by AI (we'll define this better later)
    extractedData: Record<string, any> | null;

    // User's edited form data
    formData: Record<string, any>;
}

// Functions to change the state
interface AppActions {
    // Change which screen we're showing
    setAppState: (state: 'empty' | 'loading' | 'verification') => void;

    // Move to next page (1 -> 2 -> 3 -> 4)
    nextPage: () => void;

    // Set the upload image
    setUploadedImage: (file: File) => void;

    // Set the AI extracted data
    setExtractedData: (data: Record<string, any>) => void;

    // Update form data when user edits
    updateFormData: (field: string, value: any) => void;

    // Reset everything (for next upload)
    resetPage: () => void;
}

// Create the store
export const useAppStore = create<AppState & AppActions>((set) => ({
    // Initial state (starting values)
    appState: 'empty',
    currentPage: 1,
    uploadedImage: null,
    extractedData: null,
    formData: {},

    // ACTIONS (functions to update state)
    setAppState: (state) =>
        set({ appState: state }),

    nextPage: () =>
        set((prev) => ({
            currentPage: prev.currentPage + 1
        })),

    setUploadedImage: (file) =>
        set({ uploadedImage: file }),

    setExtractedData: (data) =>
        set({ extractedData: data }),

    updateFormData: (field, value) =>
        set((prev) => ({
            formData: {
                ...prev.formData,
                [field]: value
            }
        })),

    resetPage: () =>
        set({
            appState: 'empty',
            uploadedImage: null,
            extractedData: null,
            formData: {}
        })
}))