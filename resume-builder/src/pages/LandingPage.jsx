import React, { useContext, useState, useEffect } from "react";
import HERO_IMG from "../assets/hero-mockup.png";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import templateOne from "../assets/template-one.png";
import templateTwo from "../assets/template-two.png";
import templateThree from "../assets/template-three.png";
import {
  Edit3,
  Download,
  Star,
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Grid3X3,
  FileText,
  Sparkles,
  Shield,
  Cloud,
  Menu,
  X
} from "lucide-react";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // Show toast for email verification redirect flags
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("emailVerified");
    if (!verified) return;

    const handledKey = "emailVerifiedToastHandled";
    if (sessionStorage.getItem(handledKey) === "true") {
      if (location.search) navigate(location.pathname, { replace: true });
      return;
    }

    const reason = params.get("reason");
    if (verified === "success") {
      toast.success("Email verified successfully. You can now log in.");
    } else if (verified === "failed") {
      toast.error(reason ? decodeURIComponent(reason) : "Email verification failed. Please request a new link.");
    }

    sessionStorage.setItem(handledKey, "true");
    navigate(location.pathname, { replace: true });
  }, [location.search, navigate]);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const features = [
    {
      icon: <Edit3 className="w-8 h-8" />,
      iconColor: "text-coral",
      iconBg: "bg-coral/10",
      title: "Smart Editor",
      description: "Intuitive drag-and-drop interface with real-time preview and AI-powered suggestions."
    },
    {
      icon: <Grid3X3 className="w-8 h-8" />,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-500/10",
      title: "Smart Templates",
      description: "Choose from professionally designed templates optimized for ATS systems."
    },
    {
      icon: <Download className="w-8 h-8" />,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      title: "Instant Download",
      description: "Download in multiple formats: PDF, Word, or share with a custom link."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10",
      title: "AI Powered",
      description: "Get AI-powered suggestions to make your resume stand out from the crowd."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-500/10",
      title: "ATS Optimized",
      description: "Ensure your resume passes Applicant Tracking Systems with our smart formatting."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      iconColor: "text-sky-500",
      iconBg: "bg-sky-500/10",
      title: "Cloud Sync",
      description: "Access and edit your resume from anywhere. Your data is securely stored in the cloud."
    }
  ];

  const testimonials = [
    {
      name: "Avery Johnson",
      handle: "@averywrites",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery",
      content: "This resume builder made undercutting all of our competitors an absolute breeze. Highly recommended!",
      verified: true
    },
    {
      name: "Briar Martin",
      handle: "@neilstellar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Briar",
      content: "The templates are modern and the AI suggestions helped me stand out in my applications.",
      verified: true
    },
    {
      name: "Jordan Lee",
      handle: "@jordantalks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      content: "Finally a resume builder that understands what recruiters are looking for. Game changer!",
      verified: true
    },
    {
      name: "Sarah Chen",
      handle: "@sarahcodes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Got my dream job at a top tech company. This tool was instrumental in landing the interview.",
      verified: true
    },
    {
      name: "Marcus Williams",
      handle: "@marcusw",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      content: "The ATS optimization feature is brilliant. My resume now passes every automated screening.",
      verified: true
    },
    {
      name: "Emily Davis",
      handle: "@emilycreates",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      content: "Beautiful templates and seamless editing experience. Best resume builder I've ever used!",
      verified: true
    },
    {
      name: "Alex Rivera",
      handle: "@alexriv",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      content: "The live preview feature is amazing. I could see exactly how my resume would look in real-time.",
      verified: true
    },
    {
      name: "Nina Patel",
      handle: "@ninapatel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
      content: "From zero to professional resume in under 15 minutes. Absolutely love this platform!",
      verified: false
    }
  ];

  const stats = [
    { number: "50K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="w-full min-h-full bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100/80">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex justify-between items-center gap-3">
            <div className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3 shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-coral via-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-coral/25">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-gray-900 tracking-tight">
                ResumeFlow
              </span>
            </div>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center gap-10">
              <a href="#features" className="group relative text-gray-600 hover:text-gray-900 transition-colors font-medium text-[15px]">
                Features
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-coral to-orange-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="group relative text-gray-600 hover:text-gray-900 transition-colors font-medium text-[15px]">
                Pricing
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-coral to-orange-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
              <a href="#templates" className="group relative text-gray-600 hover:text-gray-900 transition-colors font-medium text-[15px]">
                Templates
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-coral to-orange-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-2">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className="bg-gradient-to-r from-coral to-orange-500 text-white px-4 py-2 md:px-7 md:py-3 rounded-xl hover:shadow-xl hover:shadow-coral/30 hover:scale-[1.02] transition-all duration-300 font-semibold text-sm md:text-[15px] whitespace-nowrap"
                  onClick={() => setOpenAuthModal(true)}
                >
                  <span className="hidden sm:inline">Get Started Free</span>
                  <span className="sm:hidden">Start Free</span>
                </button>
              )}

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
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all font-medium text-sm"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all font-medium text-sm"
                >
                  Pricing
                </a>
                <a
                  href="#templates"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all font-medium text-sm"
                >
                  Templates
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-24 lg:pt-28">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full px-4 py-2 mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">Trusted by 50,000+ professionals worldwide</span>
              </div>

              <h1 className="section-heading text-gray-900 mb-6">
                Build a Resume That
                <span className="block bg-gradient-to-r from-coral via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Actually Gets You Hired
                </span>
              </h1>
              <p className="section-subheading mb-10 max-w-xl mx-auto lg:mx-0">
                Create ATS-optimized, professionally designed resumes in minutes with our AI-powered builder.
                Join thousands of job seekers who've landed their dream roles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button
                  className="bg-gradient-to-r from-coral via-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-coral/40 hover:scale-[1.02] transition-all duration-300 font-semibold text-[17px] flex items-center justify-center gap-2 group"
                  onClick={handleCTA}
                >
                  Start Building For Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button className="btn-primary-outline flex items-center justify-center gap-2 text-[17px]">
                  <FileText className="w-5 h-5" />
                  View Templates
                </button>
              </div>

              {/* Feature Icons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="feature-icon-box">
                  <Edit3 className="w-6 h-6 text-gray-700" />
                  <span className="text-sm text-gray-600 font-medium">Easy Editor</span>
                </div>
                <div className="feature-icon-box">
                  <Grid3X3 className="w-6 h-6 text-gray-700" />
                  <span className="text-sm text-gray-600 font-medium">Smart Templates</span>
                </div>
                <div className="feature-icon-box">
                  <Download className="w-6 h-6 text-gray-700" />
                  <span className="text-sm text-gray-600 font-medium">Instant Download</span>
                </div>
              </div>
              <br />
              <br />
              {/*stats section*/}
              <div className="container mx-auto px-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative z-10">
                <img
                  src={HERO_IMG}
                  alt="Resume Builder Preview"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-coral/10 text-coral rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="section-heading text-gray-900 mb-6">
              Everything You Need to Build
              <span className="block text-gray-600">a Winning Resume</span>
            </h2>
            <p className="section-subheading max-w-3xl mx-auto">
              Our comprehensive suite of tools empowers you to create professional, ATS-optimized resumes that capture attention and land interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group premium-card p-8 rounded-2xl min-h-[260px]">
                <div className={`mb-6 p-4 rounded-2xl w-fit transition-all duration-300 ${feature.iconBg} group-hover:scale-110`}>
                  {React.cloneElement(feature.icon, { className: `w-8 h-8 ${feature.iconColor}` })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              <Award className="w-4 h-4" />
              Pricing Plans
            </div>
            <h2 className="section-heading text-gray-900 mb-6">
              Simple, Transparent Pricing
              <span className="block text-gray-600">No Hidden Fees, Ever</span>
            </h2>
            <p className="section-subheading max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade anytime to unlock premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="premium-card rounded-3xl p-8 lg:p-10">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Free Forever</h3>
                <div className="text-5xl font-extrabold mb-2 text-gray-900 tracking-tight">₹0</div>
                <p className="text-gray-500 text-[15px]">Perfect for getting started</p>
              </div>

              <ul className="space-y-5 mb-10">
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-gray-700 text-[15px]">1 Professional Template</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-gray-700 text-[15px]">Basic Editing Tools</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-gray-700 text-[15px]">PDF Download</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-gray-700 text-[15px]">Email Support</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold text-[15px] hover:bg-gray-200 transition-all duration-200"
                onClick={handleCTA}
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-coral via-orange-500 to-amber-500 text-white rounded-3xl p-8 lg:p-10 relative overflow-hidden hover:shadow-2xl hover:shadow-coral/30 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute top-5 right-5 bg-white text-coral px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                ⭐ Most Popular
              </div>

              <div className="text-center mb-10 relative z-10">
                <h3 className="text-2xl font-bold mb-3">Premium</h3>
                <div className="text-5xl font-extrabold mb-2 tracking-tight">₹999</div>
                <p className="text-white/80 text-[15px]">Unlock the full potential</p>
              </div>

              <ul className="space-y-5 mb-10 relative z-10">
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px]">All Premium Templates</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px]">AI-Powered Writing Assistant</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px]">Multiple Export Formats</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px]">Priority 24/7 Support</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px]">ATS Optimization Score</span>
                </li>
              </ul>

              <button
                className="w-full bg-white text-coral py-4 rounded-xl font-bold text-[15px] hover:bg-gray-50 hover:shadow-lg transition-all duration-200 relative z-10"
                onClick={handleCTA}
              >
                Upgrade to Premium →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-600 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              <Grid3X3 className="w-4 h-4" />
              Template Gallery
            </div>
            <h2 className="section-heading text-gray-900 mb-6">
              Professionally Designed
              <span className="block text-gray-600">Resume Templates</span>
            </h2>
            <p className="section-subheading max-w-3xl mx-auto">
              Choose from our curated collection of <span className="text-coral font-semibold">ATS-friendly templates</span>—each one crafted by design experts to help you make a lasting first impression.
            </p>
          </div>

          {/* Horizontal Scrolling Templates */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto lg:justify-center pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Template 1 */}
              <div className="flex-shrink-0 snap-center">
                <div className="w-72 lg:w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-coral/30 group">
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                    <img
                      src={templateOne}
                      alt="Modern Resume Template"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <button
                        className="bg-coral text-white px-6 py-2 rounded-full font-semibold hover:bg-coral-dark transition-colors"
                        onClick={handleCTA}
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">Modern Professional</h3>
                    <p className="text-sm text-gray-500">Clean & Minimal</p>
                  </div>
                </div>
              </div>

              {/* Template 2 */}
              <div className="flex-shrink-0 snap-center">
                <div className="w-72 lg:w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-coral/30 group">
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                    <img
                      src={templateTwo}
                      alt="Creative Resume Template"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <button
                        className="bg-coral text-white px-6 py-2 rounded-full font-semibold hover:bg-coral-dark transition-colors"
                        onClick={handleCTA}
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">Creative Design</h3>
                    <p className="text-sm text-gray-500">Stand Out</p>
                  </div>
                </div>
              </div>

              {/* Template 3 */}
              <div className="flex-shrink-0 snap-center">
                <div className="w-72 lg:w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-coral/30 group">
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                    <img
                      src={templateThree}
                      alt="Executive Resume Template"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <button
                        className="bg-coral text-white px-6 py-2 rounded-full font-semibold hover:bg-coral-dark transition-colors"
                        onClick={handleCTA}
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">Executive Classic</h3>
                    <p className="text-sm text-gray-500">Traditional & Elegant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator Dots */}
            {/* <div className="flex justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-coral"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div> */}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              className="bg-coral text-white px-8 py-3 rounded-full font-semibold hover:bg-coral-dark hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 group"
              onClick={handleCTA}
            >
              Browse All Templates
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              <Star className="w-4 h-4" />
              Customer Reviews
            </div>
            <h2 className="section-heading text-gray-900 mb-6">Loved by Professionals Worldwide</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review.
            </p>
          </div>

          {/* First Row - Scrolling Left */}
          <div className="marquee-container mb-6">
            <div className="marquee-content gap-6">
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">{testimonial.name}</span>
                        {testimonial.verified && (
                          <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="marquee-container">
            <div className="marquee-content-reverse gap-6">
              {/* Shuffle and duplicate for variety */}
              {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)].map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">{testimonial.name}</span>
                        {testimonial.verified && (
                          <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-coral via-orange-500 to-amber-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Build Your Future?
          </h2>
          <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-medium">
            Join 50,000+ professionals who've landed their dream jobs with ResumeFlow
          </p>
          <button
            className="bg-white text-coral px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 inline-flex items-center gap-3 group"
            onClick={handleCTA}
          >
            Start Building For Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <p className="mt-6 text-white/70 text-sm">No credit card required • Free forever plan available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-16 network-pattern">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-coral via-orange-500 to-amber-400 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ResumeFlow</span>
              </div>
              <p className="text-gray-400 mb-6 text-[15px] leading-relaxed">
                Build professional, ATS-optimized resumes that get you hired. Trusted by 50,000+ professionals worldwide.
              </p>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all duration-200">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all duration-200">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all duration-200">
                  <Award className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-5 text-white text-[15px]">Product</h3>
              <ul className="space-y-3 text-gray-400 text-[15px]">
                <li><a href="#templates" className="hover:text-coral transition-colors">Templates</a></li>
                <li><a href="#features" className="hover:text-coral transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-coral transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Examples</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-5 text-white text-[15px]">Support</h3>
              <ul className="space-y-3 text-gray-400 text-[15px]">
                <li><a href="#" className="hover:text-coral transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Tutorials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-5 text-white text-[15px]">Company</h3>
              <ul className="space-y-3 text-gray-400 text-[15px]">
                <li><a href="#" className="hover:text-coral transition-colors">About</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ResumeFlow. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Made with ❤️ for professionals worldwide</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
