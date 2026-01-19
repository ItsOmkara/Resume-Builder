import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Navbar from "../components/layouts/Navbar";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import {
    Upload,
    FileText,
    AlertCircle,
    CheckCircle,
    XCircle,
    Loader,
    RefreshCw,
    Lightbulb,
    AlertTriangle,
    Hash,
} from "lucide-react";
import toast from "react-hot-toast";

const ATSChecker = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file) => {
        setError(null);
        setAnalysisResult(null);

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            setError("Please upload a PDF or DOCX file only.");
            return;
        }

        if (file.size > maxSize) {
            setError("File size must be less than 5MB.");
            return;
        }

        setFile(file);
    };

    const analyzeResume = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        setProgress(0);
        setError(null);

        // Start progress animation (10 seconds total)
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return 95;
                }
                return prev + 1;
            });
        }, 100);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axiosInstance.post(API_PATHS.ATS.ANALYZE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            clearInterval(progressInterval);
            setProgress(100);
            setAnalysisResult(response.data);
            toast.success("Resume analysis complete!");
        } catch (err) {
            clearInterval(progressInterval);
            const errorMessage = err.response?.data?.error || "Failed to analyze resume. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setFile(null);
        setAnalysisResult(null);
        setProgress(0);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-emerald-500";
        if (score >= 60) return "text-amber-500";
        return "text-red-500";
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return "from-emerald-500 to-emerald-400";
        if (score >= 60) return "from-amber-500 to-amber-400";
        return "from-red-500 to-red-400";
    };

    // Circular progress component
    const CircularProgress = ({ score, size = 180, strokeWidth = 12 }) => {
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (score / 100) * circumference;

        return (
            <div className="relative inline-flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"} />
                            <stop offset="100%" stopColor={score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171"} />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
                    <span className="text-gray-500 text-sm font-medium">out of 100</span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-6 py-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">ATS Resume Checker</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Upload your resume to get an instant ATS compatibility score and personalized
                            improvement suggestions powered by AI.
                        </p>
                    </div>

                    {/* Upload Section */}
                    {!isAnalyzing && !analysisResult && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div
                                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${isDragging
                                        ? "border-coral bg-coral/5"
                                        : error
                                            ? "border-red-300 bg-red-50"
                                            : "border-gray-300 hover:border-coral/50 hover:bg-gray-50"
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept=".pdf,.docx"
                                    className="hidden"
                                />

                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${file ? "bg-emerald-100" : "bg-coral/10"
                                            }`}
                                    >
                                        {file ? (
                                            <CheckCircle className="w-8 h-8 text-emerald-500" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-coral" />
                                        )}
                                    </div>

                                    {file ? (
                                        <div className="mb-4">
                                            <p className="text-lg font-semibold text-gray-900 mb-1">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-lg font-semibold text-gray-900 mb-2">
                                                Drag and drop your resume here
                                            </p>
                                            <p className="text-gray-500 mb-4">or click to browse</p>
                                        </>
                                    )}

                                    {error && (
                                        <div className="flex items-center gap-2 text-red-600 mb-4">
                                            <XCircle className="w-5 h-5" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            {file ? "Change File" : "Browse Files"}
                                        </button>
                                        {file && (
                                            <button
                                                onClick={analyzeResume}
                                                className="px-6 py-2.5 bg-coral text-white rounded-lg font-medium hover:bg-coral-dark transition-colors flex items-center gap-2"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Analyze Resume
                                            </button>
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-400 mt-4">
                                        Supported formats: PDF, DOCX • Max size: 5MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading Animation */}
                    {isAnalyzing && (
                        <div className="bg-white rounded-2xl shadow-lg p-10">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center">
                                        <Loader className="w-12 h-12 text-coral animate-spin" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
                                <p className="text-gray-500 mb-6 text-center max-w-md">
                                    Our AI is checking ATS compatibility, keywords, sections, and formatting...
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full max-w-md">
                                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                                        <span>Progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-coral to-orange-400 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Analysis Steps */}
                                <div className="mt-8 space-y-3 w-full max-w-md">
                                    <div className={`flex items-center gap-3 ${progress > 10 ? "text-emerald-600" : "text-gray-400"}`}>
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm">Extracting resume content</span>
                                    </div>
                                    <div className={`flex items-center gap-3 ${progress > 30 ? "text-emerald-600" : "text-gray-400"}`}>
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm">Analyzing sections and formatting</span>
                                    </div>
                                    <div className={`flex items-center gap-3 ${progress > 50 ? "text-emerald-600" : "text-gray-400"}`}>
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm">Checking keyword optimization</span>
                                    </div>
                                    <div className={`flex items-center gap-3 ${progress > 70 ? "text-emerald-600" : "text-gray-400"}`}>
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm">Evaluating ATS compatibility</span>
                                    </div>
                                    <div className={`flex items-center gap-3 ${progress > 90 ? "text-emerald-600" : "text-gray-400"}`}>
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm">Generating recommendations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    {analysisResult && (
                        <div className="space-y-6">
                            {/* Score Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <CircularProgress score={analysisResult.overallScore} />

                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {analysisResult.overallScore >= 80
                                                ? "Excellent! Your resume is ATS-ready"
                                                : analysisResult.overallScore >= 60
                                                    ? "Good job! Some improvements needed"
                                                    : "Needs work! Review suggestions below"}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Your resume scored {analysisResult.overallScore}/100 for ATS compatibility.
                                        </p>

                                        {/* Sub-scores */}
                                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                            <div className="bg-gray-50 rounded-lg px-4 py-3">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide">Format Score</p>
                                                <p className={`text-2xl font-bold ${getScoreColor(analysisResult.formatScore)}`}>
                                                    {analysisResult.formatScore}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg px-4 py-3">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide">Content Score</p>
                                                <p className={`text-2xl font-bold ${getScoreColor(analysisResult.contentScore)}`}>
                                                    {analysisResult.contentScore}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Issues */}
                            {analysisResult.issues && analysisResult.issues.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Issues Found</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {analysisResult.issues.map((issue, index) => (
                                            <li key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{issue}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Suggestions */}
                            {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                            <Lightbulb className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Improvement Suggestions</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {analysisResult.suggestions.map((suggestion, index) => (
                                            <li key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                                                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Keyword Suggestions */}
                            {analysisResult.keywordSuggestions && analysisResult.keywordSuggestions.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                            <Hash className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Recommended Keywords</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">Consider adding these keywords to improve ATS matching:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {analysisResult.keywordSuggestions.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Repetitive Words */}
                            {analysisResult.repetitiveWords && Object.keys(analysisResult.repetitiveWords).length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                            <RefreshCw className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Repetitive Words</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">These words appear frequently. Consider using synonyms:</p>
                                    <div className="flex flex-wrap gap-3">
                                        {Object.entries(analysisResult.repetitiveWords).map(([word, count], index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 bg-purple-50 rounded-lg flex items-center gap-2"
                                            >
                                                <span className="text-purple-700 font-medium">{word}</span>
                                                <span className="text-purple-500 text-sm">({count}x)</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Try Again Button */}
                            <div className="text-center">
                                <button
                                    onClick={resetAnalysis}
                                    className="px-8 py-3 bg-coral text-white rounded-full font-semibold hover:bg-coral-dark hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Analyze Another Resume
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ATSChecker;
