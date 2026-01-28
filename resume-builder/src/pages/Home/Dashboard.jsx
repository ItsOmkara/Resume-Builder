import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { CirclePlus, FileText, Sparkles } from 'lucide-react'
import moment from 'moment'
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const handleResumeCreated = () => {
    // Refresh the resume list when a new resume is created
    fetchAllResumes();
  };

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  // Get first name for greeting
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-gray-600">
          {allResumes?.length > 0
            ? `You have ${allResumes.length} resume${allResumes.length > 1 ? 's' : ''}. Keep building your career!`
            : "Let's create your first professional resume today!"
          }
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-coral" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{allResumes?.length || 0}</p>
              <p className="text-sm text-gray-500">Total Resumes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user?.plan === 'premium' ? 'All' : '1'}</p>
              <p className="text-sm text-gray-500">Templates Available</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-coral to-orange-500 rounded-xl p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Plan</p>
              <p className="text-xl font-bold capitalize">{user?.plan || 'Basic'}</p>
            </div>
            {user?.plan !== 'premium' && (
              <button
                onClick={() => navigate('/upgrade')}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">My Resumes</h2>
      </div>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {/* Add New Resume Card */}
        <div
          className="h-[200px] sm:h-[250px] md:h-[300px] flex flex-col gap-3 md:gap-4 items-center justify-center bg-white rounded-xl border-2 border-dashed border-coral/30 hover:border-coral hover:bg-coral/5 cursor-pointer transition-all duration-300 group"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-coral/10 group-hover:bg-coral/20 rounded-2xl transition-colors">
            <CirclePlus className="w-7 h-7 text-coral" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 group-hover:text-coral transition-colors">Add New Resume</h3>
            <p className="text-sm text-gray-500 mt-1">Start from scratch</p>
          </div>
        </div>

        {/* Resume Cards */}
        {allResumes?.map((resume, index) => (
          <ResumeSummaryCard
            key={resume?._id || `resume-${index}`}
            imgUrl={resume?.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume?.updatedAt
                ? moment(resume.updatedAt).format("Do MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={handleCloseModal}
        hideHeader
      >
        <div>
          <CreateResumeForm
            onResumeCreated={handleResumeCreated}
            onClose={handleCloseModal}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;

