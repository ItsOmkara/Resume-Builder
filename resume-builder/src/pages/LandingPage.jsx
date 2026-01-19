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
  Cloud
} from "lucide-react";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

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
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      content: "This resume builder helped me land my dream job! The templates are modern and the interface is incredibly user-friendly.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Microsoft",
      content: "I've tried many resume builders, but this one stands out. The live preview feature is a game-changer.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      company: "Apple",
      content: "Beautiful templates and seamless editing experience. Highly recommend to anyone looking for a professional resume.",
      rating: 5
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
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-coral to-indigo-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">
                ResumeFlow
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="group relative text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Features
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-coral transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="group relative text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Pricing
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-coral transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
              <a href="#templates" className="group relative text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Templates
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-coral transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            </nav>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-coral text-white px-6 py-2.5 rounded-full hover:bg-coral-dark hover:shadow-lg transition-all duration-300 font-semibold"
                onClick={() => setOpenAuthModal(true)}
              >
                Start Building
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden mt-16">
        <div className="container mx-auto px-6 py-16 ">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Unlock Your Potential.
                <span className="block text-gray-800">
                  Craft Your Future.
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                AI-powered tools to build a standout resume in minutes.
                Stand out from the crowd and land your dream job faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button
                  className="bg-coral text-white px-8 py-3.5 rounded-full hover:bg-coral-dark hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 group"
                  onClick={handleCTA}
                >
                  Start For Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-primary-outline flex items-center justify-center gap-2">
                  Explore Templates
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
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our powerful features help you create professional resumes that get noticed by employers and ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-coral/30 hover:shadow-xl transition-all duration-300 min-h-[220px]">
                <div className={`mb-5 p-4 rounded-xl w-fit transition-colors ${feature.iconBg}`}>
                  {React.cloneElement(feature.icon, { className: `w-10 h-10 ${feature.iconColor}` })}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Free</h3>
                <div className="text-4xl font-bold mb-2 text-gray-900">₹0</div>
                <p className="text-gray-500">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">1 Professional Template</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Basic Editing Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">PDF Download</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Email Support</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-100 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                onClick={handleCTA}
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-coral to-orange-500 text-white rounded-2xl p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 bg-white text-coral px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-2">₹999</div>
                <p className="text-white/80">Unlock all features</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>All Premium Templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Advanced Editing Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Multiple Export Formats</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Priority Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Custom Branding</span>
                </li>
              </ul>

              <button
                className="w-full bg-white text-coral py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                onClick={handleCTA}
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Professional Resume Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our library of customizable <span className="text-coral font-medium">resume templates</span>—professionally designed to help you create a polished resume for every job you apply for.
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
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Loved by Professionals</h2>
            <p className="text-lg text-gray-600">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-coral to-orange-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Build Your Future?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of professionals who've landed their dream jobs</p>
          <button
            className="bg-white text-coral px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
            onClick={handleCTA}
          >
            Start Building Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-16 network-pattern">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-coral to-orange-400 bg-clip-text text-transparent mb-4">
                ResumeBuilder
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Build professional resumes that get you hired. Trusted by professionals worldwide.
              </p>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Award className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ResumeBuilder. Made with ❤️ for professionals worldwide.</p>
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
