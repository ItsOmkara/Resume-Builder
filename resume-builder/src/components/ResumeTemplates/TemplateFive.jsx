import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { formatYearMonth } from "../../utils/helper";

const DEFAULT_THEME = ["#2D3748", "#4A5568", "#FFFFFF", "#3182CE", "#718096"];

const SidebarTitle = ({ text }) => {
    return (
        <h2 className="text-lg font-bold text-white mb-4 mt-6">{text}</h2>
    );
};

const MainTitle = ({ text, color }) => {
    return (
        <h2
            className="text-lg font-bold mb-4 mt-6 pb-2 border-b-2"
            style={{ color: color, borderColor: color }}
        >
            {text}
        </h2>
    );
};

const TimelineDot = ({ color }) => (
    <div
        className="w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1"
        style={{ borderColor: color, backgroundColor: "white" }}
    />
);

const TemplateFive = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / baseWidth);
    }, [containerWidth]);

    return (
        <div
            ref={resumeRef}
            className="bg-white"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            <div className="grid grid-cols-12">
                {/* Left Sidebar */}
                <div
                    className="col-span-4 min-h-full p-6"
                    style={{ backgroundColor: themeColors[0] }}
                >
                    {/* Profile Photo */}
                    <div className="flex justify-center mb-6">
                        <div
                            className="w-32 h-32 rounded-full flex items-center justify-center border-4"
                            style={{ borderColor: themeColors[2], backgroundColor: themeColors[1] }}
                        >
                            {resumeData.profileInfo.profilePreviewUrl ? (
                                <img
                                    src={resumeData.profileInfo.profilePreviewUrl}
                                    className="w-28 h-28 rounded-full object-cover"
                                    alt="Profile"
                                />
                            ) : (
                                <User className="w-16 h-16 text-white" />
                            )}
                        </div>
                    </div>

                    {/* Contact */}
                    <SidebarTitle text="Contact" />
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 text-white">
                            <Phone className="w-4 h-4" />
                            <span className="text-xs">{resumeData.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <Mail className="w-4 h-4" />
                            <span className="text-xs break-all">{resumeData.contactInfo.email}</span>
                        </div>
                        <div className="flex items-start gap-3 text-white">
                            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{resumeData.contactInfo.location}</span>
                        </div>
                    </div>

                    {/* Education */}
                    <SidebarTitle text="Education" />
                    {resumeData.education.map((edu, index) => (
                        <div key={`edu_${index}`} className="mb-4">
                            <p className="text-xs text-gray-300">
                                {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                            </p>
                            <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                            <p className="text-xs text-gray-300">{edu.institution}</p>
                        </div>
                    ))}

                    {/* Expertise/Skills */}
                    <SidebarTitle text="Expertise" />
                    <div className="space-y-2">
                        {resumeData.skills.slice(0, 6).map((skill, index) => (
                            <div key={`skill_${index}`} className="flex items-center gap-2 text-white">
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: themeColors[3] }}
                                />
                                <span className="text-xs">{skill.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Languages */}
                    <SidebarTitle text="Language" />
                    {resumeData.languages.map((lang, index) => (
                        <div key={`lang_${index}`} className="mb-2">
                            <div className="flex justify-between text-xs text-white mb-1">
                                <span>{lang.name}</span>
                            </div>
                            <div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: themeColors[1] }}
                            >
                                <div
                                    className="h-1.5 rounded-full"
                                    style={{
                                        width: `${lang.progress}%`,
                                        backgroundColor: themeColors[3],
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="col-span-8 p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1
                            className="text-3xl font-bold"
                            style={{ color: themeColors[0] }}
                        >
                            {resumeData.profileInfo.fullName}
                        </h1>
                        <p
                            className="text-lg mt-1"
                            style={{ color: themeColors[4] }}
                        >
                            {resumeData.profileInfo.designation}
                        </p>
                        <p className="text-xs mt-3 leading-relaxed" style={{ color: themeColors[4] }}>
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>

                    {/* Experience */}
                    <MainTitle text="Experience" color={themeColors[0]} />
                    <div className="space-y-6">
                        {resumeData.workExperience.map((work, index) => (
                            <div key={`work_${index}`} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <TimelineDot color={themeColors[3]} />
                                    {index < resumeData.workExperience.length - 1 && (
                                        <div
                                            className="w-0.5 flex-1 mt-1"
                                            style={{ backgroundColor: themeColors[4] }}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="text-xs font-semibold" style={{ color: themeColors[3] }}>
                                        {formatYearMonth(work.startDate)} - {formatYearMonth(work.endDate)}
                                    </p>
                                    <p className="text-xs" style={{ color: themeColors[4] }}>
                                        {work.company}
                                    </p>
                                    <h3
                                        className="text-sm font-bold mt-1"
                                        style={{ color: themeColors[3] }}
                                    >
                                        {work.role}
                                    </h3>
                                    <p
                                        className="text-xs mt-2 leading-relaxed"
                                        style={{ color: themeColors[4] }}
                                    >
                                        {work.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                        <>
                            <MainTitle text="Projects" color={themeColors[0]} />
                            <div className="space-y-4">
                                {resumeData.projects.map((project, index) => (
                                    <div key={`project_${index}`}>
                                        <h3 className="text-sm font-bold" style={{ color: themeColors[0] }}>
                                            {project.title}
                                        </h3>
                                        <p className="text-xs mt-1 leading-relaxed" style={{ color: themeColors[4] }}>
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Certifications */}
                    {resumeData.certifications.length > 0 && (
                        <>
                            <MainTitle text="Certifications" color={themeColors[0]} />
                            <div className="grid grid-cols-2 gap-3">
                                {resumeData.certifications.map((cert, index) => (
                                    <div
                                        key={`cert_${index}`}
                                        className="p-3 rounded"
                                        style={{ backgroundColor: themeColors[1] + "20" }}
                                    >
                                        <h3 className="text-xs font-bold" style={{ color: themeColors[0] }}>
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs" style={{ color: themeColors[4] }}>
                                            {cert.issuer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateFive;
