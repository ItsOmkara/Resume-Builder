import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../../utils/helper";

const DEFAULT_THEME = ["#FFD700", "#FFF9E6", "#FFFFFF", "#1A1A1A", "#666666"];

const SectionTitle = ({ text, color }) => {
    return (
        <div className="mb-3 mt-6">
            <h2
                className="text-sm font-bold uppercase tracking-wide pb-1 border-b-2"
                style={{ borderColor: color }}
            >
                {text}
            </h2>
        </div>
    );
};

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
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
            <div className="px-10 py-8">
                {/* Header - Name and Contact */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold" style={{ color: themeColors[3] }}>
                        {resumeData.profileInfo.fullName}
                    </h1>
                    <div
                        className="flex items-center justify-center flex-wrap gap-2 mt-2 text-xs"
                        style={{ color: themeColors[4] }}
                    >
                        <span>{resumeData.contactInfo.phone}</span>
                        <span>◆</span>
                        <span>{resumeData.contactInfo.location}</span>
                    </div>
                    <div
                        className="flex items-center justify-center flex-wrap gap-2 mt-1 text-xs"
                        style={{ color: themeColors[0] }}
                    >
                        <a href={`mailto:${resumeData.contactInfo.email}`}>
                            {resumeData.contactInfo.email}
                        </a>
                        <span style={{ color: themeColors[4] }}>◆</span>
                        {resumeData.contactInfo.linkedin && (
                            <>
                                <a href={resumeData.contactInfo.linkedin}>
                                    {resumeData.contactInfo.linkedin.replace("https://", "")}
                                </a>
                                <span style={{ color: themeColors[4] }}>◆</span>
                            </>
                        )}
                        {resumeData.contactInfo.github && (
                            <a href={resumeData.contactInfo.github}>
                                {resumeData.contactInfo.github.replace("https://", "")}
                            </a>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <SectionTitle text="Summary" color={themeColors[0]} />
                <p className="text-xs leading-relaxed" style={{ color: themeColors[4] }}>
                    {resumeData.profileInfo.summary}
                </p>

                {/* Education */}
                <SectionTitle text="Education" color={themeColors[0]} />
                {resumeData.education.map((edu, index) => (
                    <div key={`edu_${index}`} className="mb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-bold" style={{ color: themeColors[3] }}>
                                    {edu.institution}
                                </h3>
                                <p className="text-xs" style={{ color: themeColors[4] }}>
                                    {edu.degree}
                                </p>
                            </div>
                            <span className="text-xs" style={{ color: themeColors[4] }}>
                                {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Skills */}
                <SectionTitle text="Skills" color={themeColors[0]} />
                <div className="text-xs" style={{ color: themeColors[4] }}>
                    <p>
                        <span className="font-bold" style={{ color: themeColors[3] }}>
                            Technical Skills:
                        </span>{" "}
                        {resumeData.skills.map(s => s.name).join(", ")}
                    </p>
                </div>

                {/* Experience */}
                <SectionTitle text="Experience" color={themeColors[0]} />
                {resumeData.workExperience.map((work, index) => (
                    <div key={`work_${index}`} className="mb-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold" style={{ color: themeColors[3] }}>
                                {work.role} — {work.company}
                            </h3>
                            <span className="text-xs" style={{ color: themeColors[4] }}>
                                {formatYearMonth(work.startDate)} - {formatYearMonth(work.endDate)}
                            </span>
                        </div>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: themeColors[4] }}>
                            {work.description}
                        </p>
                    </div>
                ))}

                {/* Projects */}
                <SectionTitle text="Projects" color={themeColors[0]} />
                {resumeData.projects.map((project, index) => (
                    <div key={`project_${index}`} className="mb-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold" style={{ color: themeColors[3] }}>
                                {project.title}
                            </h3>
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    className="text-xs"
                                    style={{ color: themeColors[0] }}
                                >
                                    (Try it here)
                                </a>
                            )}
                        </div>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: themeColors[4] }}>
                            {project.description}
                        </p>
                    </div>
                ))}

                {/* Certifications */}
                {resumeData.certifications.length > 0 && (
                    <>
                        <SectionTitle text="Certificate" color={themeColors[0]} />
                        <ul className="text-xs list-disc list-inside" style={{ color: themeColors[4] }}>
                            {resumeData.certifications.map((cert, index) => (
                                <li key={`cert_${index}`}>
                                    <span className="font-bold" style={{ color: themeColors[3] }}>
                                        {cert.title}
                                    </span>{" "}
                                    — {cert.issuer}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default TemplateFour;
