# 🦷 Dental Chart IDP - Frontend

> Intelligent Document Processing system for converting handwritten dental forms into secure, searchable digital records using AI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [State Management](#state-management)
- [Development Workflow](#development-workflow)
- [What's Next](#whats-next)

---

## 🎯 Overview

This React-based frontend application allows dental clinics to digitize handwritten patient forms. Users upload images or PDFs of dental charts, and the system (once backend is integrated) will use AI to extract and structure the data into editable digital forms.

### User Flow
1. **Upload** - User uploads dental form (image/PDF) via drag-and-drop
2. **Processing** - AI analyzes and extracts data from the document
3. **Verification** - User reviews extracted data in split-screen interface
4. **Edit & Save** - User corrects data across 4 pages and saves

---

## ✨ Features

### ✅ Implemented
- **File Upload System** - Drag-and-drop and click-to-upload with validation
- **Multi-Page Forms** - 9 form sections across 4 dental chart pages
- **Split-Screen Verification** - Side-by-side image viewer and editable forms
- **State Management** - Zustand-powered global state
- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **Tab Navigation** - Organized form sections with tabs
- **Form Validation Setup** - React Hook Form + Zod integration

### 🚧 Pending
- **AI/Backend Integration** - Connect OCR API endpoints
- **Data Mapping** - Map extracted AI data to form fields
- **Export Functionality** - Save/export to PDF or JSON
- **Error Handling** - Comprehensive error states
- **Image Controls** - Zoom/pan for image viewer

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Build Tool** | Vite | 7.2.2 |
| **State Management** | Zustand | 5.0.8 |
| **Styling** | Tailwind CSS | 3.4.18 |
| **Forms** | React Hook Form | 7.66.1 |
| **Validation** | Zod | 4.1.12 |
| **Routing** | React Router DOM | 7.9.6 |
| **HTTP Client** | Axios | 1.13.2 |
| **Icons** | Lucide React | 0.554.0 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd dental-chart-idp-frontend-main

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

This project follows **Feature-Sliced Design** architecture:

```
src/
├── pages/              # Page-level components
│   └── main/
│       └── MainPage.tsx           # Main application page
│
├── widgets/            # Complex UI blocks
│   ├── header/                    # Application header
│   ├── form-panel/                # Form display and navigation
│   ├── image-viewer/              # Uploaded image display
│   ├── processing-status/         # Loading screen
│   └── verification-panel/        # Split-screen verification UI
│
├── features/           # Business logic features
│   ├── upload-chart/              # File upload functionality
│   └── edit-field/                # Form field components
│       ├── FormField.tsx          # Text input field
│       ├── RadioField.tsx         # Radio button field
│       └── forms/                 # 9 dental form templates
│
├── entities/           # Business entities (currently empty)
│
├── shared/             # Shared code
│   ├── store/
│   │   └── useAppStore.ts         # Zustand global state
│   └── lib/
│       └── utils.ts               # Utility functions
│
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Path Aliases

```typescript
@/*          → ./src/*
@/pages/*    → ./src/pages/*
@/widgets/*  → ./src/widgets/*
@/features/* → ./src/features/*
@/entities/* → ./src/entities/*
@/shared/*   → ./src/shared/*
@/lib/*      → ./src/shared/lib/*
```

---

## 🔑 Key Components

### MainPage (`src/pages/main/MainPage.tsx`)
Routes between three states based on `appState`:
- **empty** - Shows upload zone
- **loading** - Shows processing screen
- **verification** - Shows split-screen verification panel

### Upload Zone (`src/features/upload-chart/UploadZone.tsx`)
- Handles file upload via drag-and-drop or click
- Validates file types (images & PDFs)
- Transitions app to loading state
- **TODO**: Trigger AI API call on upload

### Verification Panel (`src/widgets/verification-panel/VerificationPanel.tsx`)
Split-screen layout:
- **Left (50%)**: Image viewer showing uploaded document
- **Right (50%)**: Form panel with editable fields

### Form Panel (`src/widgets/form-panel/FormPanel.tsx`)
Manages 9 forms across 4 pages with tab navigation:

**Page 1** - Patient Information
- Patient Info
- Dental History  
- Medical History

**Page 2** - Consent Forms
- Informed Consent Treatment
- Consent Procedures
- Signatures

**Page 3** - Clinical Data
- Dental Chart
- Clinical Findings

**Page 4** - Treatment
- Treatment Records

---

## 🗄 State Management

Global state is managed with **Zustand** in `src/shared/store/useAppStore.ts`:

```typescript
interface AppState {
  appState: 'empty' | 'loading' | 'verification';  // Current screen
  currentPage: number;                              // Page 1-4
  uploadedImage: File | null;                       // Uploaded file
  extractedData: Record<string, any> | null;        // AI extracted data
  formData: Record<string, any>;                    // User edited data
}

interface AppActions {
  setAppState: (state) => void;        // Change screen
  nextPage: () => void;                // Navigate to next page
  setUploadedImage: (file) => void;    // Store uploaded file
  setExtractedData: (data) => void;    // Store AI results
  updateFormData: (field, value) => void;  // Update form field
  resetPage: () => void;               // Reset to initial state
}
```

### Usage Example

```typescript
// In any component
import { useAppStore } from '@/shared/store/useAppStore';

const MyComponent = () => {
  const appState = useAppStore((state) => state.appState);
  const setAppState = useAppStore((state) => state.setAppState);
  
  // Use state and actions...
}
```

---

## 💻 Development Workflow

### Adding a New Form

1. Create form component in `src/features/edit-field/forms/`
2. Import in `src/widgets/form-panel/FormPanel.tsx`
3. Add tab configuration to `PAGE_TABS` constant
4. Add conditional rendering in FormPanel

### Integrating Backend API

The placeholder for AI integration is in `UploadZone.tsx`:

```typescript
const handleFile = (file: File) => {
  // ... validation ...
  
  setUploadedImage(file);
  setAppState('loading');
  
  // TODO: Add API call here
  // Example:
  // const formData = new FormData();
  // formData.append('file', file);
  // const response = await axios.post('/api/extract', formData);
  // setExtractedData(response.data);
  // setAppState('verification');
}
```

### Connecting Form Fields to Data

Forms currently use standalone `FormField` components. To connect to Zustand:

```typescript
import { useAppStore } from '@/shared/store/useAppStore';

const PatientInfoForm = () => {
  const formData = useAppStore((state) => state.formData);
  const updateFormData = useAppStore((state) => state.updateFormData);
  
  return (
    <FormField
      label="Patient Name"
      value={formData.patientName || ''}
      onChange={(value) => updateFormData('patientName', value)}
    />
  );
};
```

---

## 🎯 What's Next

### Priority 1: Backend Integration
- [ ] Set up API service layer with Axios
- [ ] Connect to OCR/AI endpoint
- [ ] Handle API responses and errors
- [ ] Map extracted data to form fields

### Priority 2: Data Management
- [ ] Implement proper TypeScript types for `formData` and `extractedData`
- [ ] Add data persistence (localStorage or API)
- [ ] Create export functionality (PDF/JSON)
- [ ] Add form auto-save

### Priority 3: UX Improvements
- [ ] Add comprehensive error handling
- [ ] Implement loading states
- [ ] Add image zoom/pan controls
- [ ] Improve mobile responsiveness
- [ ] Add confirmation dialogs

### Priority 4: Quality Assurance
- [ ] Add unit tests (Jest/Vitest)
- [ ] Add integration tests
- [ ] Implement E2E tests
- [ ] Add proper error boundaries

---

## 📝 Important Notes

### For the Next Developer

1. **State Structure** - The `formData` type is currently `Record<string, any>`. Define proper interfaces once backend contract is finalized.

2. **Form Validation** - React Hook Form and Zod are installed but not fully integrated. You'll need to add validation schemas for each form.

3. **API Integration Point** - Look for the comment in `UploadZone.tsx` line 23: `// (In the future, this is where we trigger the AI API call)`

4. **Form Templates** - All 9 forms exist as UI templates but don't have data bindings yet. Need to connect each field to the Zustand store.

5. **Responsive Design** - The UI is mobile-responsive but hasn't been extensively tested on all devices.

6. **TypeScript** - Maintain strict typing. Avoid using `any` types when possible.

---

## 📞 Support

For questions or issues during transition, refer to:
- This README
- Code comments in key files
- Transition documentation provided separately

---
