import React, { useEffect, useState } from "react";
import { LuPlus, LuLayers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import LoadingMessage from "../../components/Loader/LoadingMessage";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CARD_BG } from "../../utils/data";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSession = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions || []);
    } catch (error) {
      toast.error("Failed to fetch sessions");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      setSessions((prev) => prev.filter((item) => item._id !== sessionData._id));
      setOpenDeleteAlert({ open: false, data: null });
      toast.success("Session deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => { fetchAllSession(); }, []);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-primary tracking-tight">
              Interview Sessions
            </h1>
            <p className="text-sm text-text-muted mt-1.5">
              Track and manage your AI-powered interview practice
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-accent-soft/20 border border-accent/15 px-3.5 py-1.5 rounded-full">
            <LuLayers size={14} />
            {sessions.length} session{sessions.length !== 1 ? "s" : ""}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingMessage message="Loading your sessions..." />
          </div>
        )}

        {!isLoading && sessions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 border border-dashed border-border rounded-2xl bg-surface/50"
          >
            <div className="w-16 h-16 mx-auto bg-accent-soft/30 flex items-center justify-center rounded-2xl mb-5 border border-accent/20">
              <LuPlus className="text-2xl text-accent" />
            </div>
            <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
              No Sessions Yet
            </h2>
            <p className="text-sm text-text-muted mb-6 max-w-xs mx-auto">
              Create your first interview session to start practicing with AI-generated questions
            </p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="btn-primary"
            >
              <LuPlus size={16} />
              Create Session
            </button>
          </motion.div>
        )}

        {!isLoading && sessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {sessions.map((data, index) => (
              <motion.div
                key={data?._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role}
                  topicsToFocus={data?.topicsToFocus}
                  experience={data?.experience}
                  questions={data?.questions?.length}
                  description={data?.description}
                  lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <button
          onClick={() => setOpenCreateModal(true)}
          className="fixed bottom-6 right-6 flex items-center gap-2 bg-accent text-white font-medium text-sm px-5 py-3 rounded-full shadow-lg shadow-accent/20 hover:brightness-110 hover:scale-105 transition-all duration-200 z-20"
        >
          <LuPlus size={18} />
          <span className="hidden sm:block">New Session</span>
        </button>
      </div>

      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateSessionForm onClose={() => setOpenCreateModal(false)} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        hideHeader
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
