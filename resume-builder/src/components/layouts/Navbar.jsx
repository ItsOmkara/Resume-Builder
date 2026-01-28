import React, { useState } from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, FileText, FileSearch, Settings, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/dashboard", label: "My Resumes", icon: FileText },
    { path: "/ats-checker", label: "ATS Checker", icon: FileSearch },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-coral to-indigo-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">ResumeFlow</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(link.path)
                  ? "bg-coral/10 text-coral font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <link.icon className="w-4 h-4" />
                <span className="relative text-sm">
                  {link.label}
                  <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-current transition-all duration-300 ease-out ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Profile & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <ProfileInfoCard />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive(link.path)
                    ? "bg-coral/10 text-coral font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
