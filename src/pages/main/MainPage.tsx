import { useAppStore } from "@/shared/store/useAppStore";
import { Header } from "@/widgets/header/Header";
import { UploadZone } from "@/features/upload-chart/UploadZone";
import { ProcessingScreen } from "@/widgets/processing-status/ProcessingScreen";
import { VerificationPanel } from "@/widgets/verification-panel/VerificationPanel";

export const MainPage = () => {
    const appState = useAppStore((state) => state.appState);

    return (
        <div className="h-screen flex flex-col overflow-hidden"> {/* ← Changed here */}
            {/* Header */}
            <Header />

            {/* Main content */}
            {(appState === 'empty' || appState === 'loading') && (
                <main className="flex-1 overflow-auto px-4 py-8"> {/* ← Added overflow-auto */}
                    <div className="max-w-7xl mx-auto">
                        {appState === 'empty' && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-5 px-4">
                                        Digitize Records{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                            in Seconds
                                        </span>
                                    </h2>
                                    <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                                        Upload handwritten dental forms and let our AI convert them into secure, searchable digital records.
                                    </p>
                                </div>
                                <UploadZone />
                            </div>
                        )}

                        {appState === 'loading' && <ProcessingScreen />}
                    </div>
                </main>
            )}

            {/* Verification - Full viewport */}
            {appState === 'verification' && (
                <main className="flex-1 overflow-hidden"> {/* ← Keep overflow-hidden */}
                    <VerificationPanel />
                </main>
            )}
        </div>
    );
};