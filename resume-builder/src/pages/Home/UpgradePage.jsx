import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ThemeSelector from "../ResumeUpdate/ThemeSelector";

const UpgradePage = () => {
    const [selectedTheme, setSelectedTheme] = useState({
        colorPalette: [],
        theme: "01",
    });

    const handleClose = () => {
        // Navigate back to dashboard or stay on page
        window.history.back();
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Choose Your Template
                </h1>
                <p className="text-gray-600">
                    Select a template and customize colors for your resume. Upgrade to Premium to unlock all templates!
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <ThemeSelector
                    selectedTheme={selectedTheme}
                    setSelectedTheme={setSelectedTheme}
                    resumeData={null}
                    onClose={handleClose}
                />
            </div>
        </DashboardLayout>
    );
};

export default UpgradePage;
