import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

const DashboardFooter = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-coral to-indigo-500 rounded-md flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-semibold text-white">ResumeFlow</span>
                        </div>
                        <span className="text-gray-400 text-sm hidden md:block">|</span>
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>

                    {/* Links */}
                    <nav className="flex items-center gap-6">
                        <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Home
                        </Link>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Help Center
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Terms
                        </a>
                    </nav>

                    {/* Made with love */}
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-coral fill-coral" />
                        <span>in India</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default DashboardFooter;
