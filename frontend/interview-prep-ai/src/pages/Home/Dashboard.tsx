import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { LuPlus } from "react-icons/lu";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import CreateSessionForm from "./CreateSessionForm";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CARD_BG } from "../../utils/data";
import type { AxiosError } from "axios";

interface Session {
  _id: string;
  role: string;
  topicsToFocus: string;
  experience: string;
  questions: Array<Record<string, unknown>>;
  description: string;
  updatedAt: string;
}

const Dashboard = () => {
  const { isLoaded } = useUser();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [deleteAlertData, setDeleteAlertData] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data?.sessions || []);
    } catch (err) {
      console.log("Failed to fetch sessions", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async () => {
    if (!deleteAlertData) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(API_PATHS.SESSION.DELETE(deleteAlertData._id));
      if (res.data) {
        setSessions((prev) => prev.filter((s) => s._id !== deleteAlertData._id));
        setDeleteAlertData(null);
      }
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      console.log(axiosErr?.response?.data?.message || "Failed to delete session");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchSessions();
  }, [isLoaded]);

  return (
    <DashboardLayout>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display font-bold text-text-primary">My Sessions</h1>

          {sessions.length > 0 && (
            <div className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-accent-soft/20 border border-accent/15 px-3.5 py-1.5 rounded-full">
              <span>{sessions.length} session{sessions.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {isLoading && sessions.length === 0 && (
          <div className="flex items-center justify-center min-h-[300px]">
            <SpinnerLoader size={24} text="Loading sessions..." />
          </div>
        )}

        {!isLoading && sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="w-16 h-16 mx-auto bg-accent-soft/30 flex items-center justify-center rounded-2xl mb-5 border border-accent/20">
              <LuPlus className="text-accent" size={24} />
            </div>
            <h2 className="font-display font-semibold text-lg text-text-primary mb-2">
              No sessions yet
            </h2>
            <p className="text-sm text-text-secondary max-w-sm mb-6">
              Create your first interview session and let AI generate tailored questions for you.
            </p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="btn-primary text-sm px-6 py-3"
            >
              <LuPlus size={16} />
              Create Session
            </button>
          </div>
        )}

        {sessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {sessions.map((sessionData, index) => (
              <SummaryCard
                key={sessionData._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={sessionData.role}
                topicsToFocus={sessionData.topicsToFocus}
                experience={Number(sessionData.experience)}
                questions={sessionData.questions.length}
                description={sessionData.description}
                lastUpdated={sessionData.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""}
                onSelect={() => navigate(`/interview-prep/${sessionData._id}`)}
                onDelete={() => setDeleteAlertData(sessionData)}
              />
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

      <Modal isOpen={!!deleteAlertData} onClose={() => setDeleteAlertData(null)} hideHeader>
        <DeleteAlertContent
          content="Are you sure you want to delete this interview session? All associated questions and data will be permanently removed."
          onDelete={handleDeleteSession}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
