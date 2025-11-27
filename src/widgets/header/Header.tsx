import { useAppStore } from "@/shared/store/useAppStore";
import { FileText } from "lucide-react";

export const Header = () => {
    const appState = useAppStore((state) => state.appState);
    const currentPage = useAppStore((state) => state.currentPage);

    return <>
        {appState !== 'loading' && (
            <header className="flex items-center justify-between p-3 sm:p-5 sticky top-0 z-50 bg-white border-b">
                {/* Left side: Logo */}
                <div className="flex items-center space-x-2">
                    <div className="bg-primary p-1.5 sm:p-2 rounded-xl sm:rounded-m">
                        <FileText className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-primary">
                            Dental Chart Digitizer
                        </h1>
                        <span className="text-xs font-bold sm:text-sm bg-primary-light text-primary px-2 py-0.5 sm:py-1 rounded-full inline-block w-fit flex-shrink-0">
                            AI Powered
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xs sm:text-sm font-medium text-text-secondary hidden sm:inline">
                        Page {currentPage} of 4
                    </span>
                    <span className="text-xs font-medium text-text-secondary sm:hidden">
                        {currentPage}/4
                    </span>
                    <div className="flex gap-1 sm:gap-1.5">
                        {[1, 2, 3, 4].map((page) => (
                            <div
                                key={page}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${page <= currentPage
                                        ? 'bg-primary'
                                        : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </header>
        )}
    </>
}