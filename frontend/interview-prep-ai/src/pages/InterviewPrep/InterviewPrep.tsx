import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuPlus, LuSparkles, LuPin } from "react-icons/lu";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import LoadingMessage from "../../components/Loader/LoadingMessage";
import AIResponsePreview from "./components/AIResponsePreview";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import type { AxiosError } from "axios";

interface Question {
  _id: string;
  question: string;
  answer: string;
  isPinned: boolean;
}

interface Session {
  _id: string;
  role: string;
  experience: string;
  topicsToFocus: string;
  description?: string;
  questions: Question[];
  updatedAt: string;
}

interface Explanation {
  title?: string;
  explanation: string;
}

type Filter = "all" | "pinned";

const InterviewPrep = () => {
  const { sessionId } = useParams<{ sessionId: string }>();

  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading interview session...");
  const [filter, setFilter] = useState<Filter>("all");

  const filteredQuestions = sessionData?.questions?.filter((q) =>
    filter === "pinned" ? q.isPinned : true
  ) || [];

  const pinnedCount = sessionData?.questions?.filter((q) => q.isPinned).length || 0;

  const fetchSessionDetailsById = async () => {
    try {
      if (!sessionId) return;
      setLoadingMessage("Loading interview session...");
      setIsLoading(true);
      const res = await axiosInstance.get<{ session: Session }>(API_PATHS.SESSION.GET_ONE(sessionId));
      if (res.data?.session) setSessionData(res.data.session);
    } catch {
      toast.error("Failed to fetch session");
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question: string) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setLoadingMessage("Preparing explanation...");
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const res = await axiosInstance.post<Explanation>(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (res.data) setExplanation(res.data);
    } catch {
      setErrorMsg("Failed to generate explanation.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      setSessionData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          questions: prev.questions.map((q) =>
            q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
          ),
        };
      });

      const res = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId), { sessionId });
      if (res.data?.success) {
        toast.success("Question updated");
        fetchSessionDetailsById();
      }
    } catch {
      toast.error("Failed to update pin");
      fetchSessionDetailsById();
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsGenerating(true);

      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      const questions: { question: string; answer: string }[] = (aiResponse.data as Array<{ question?: string; questionText?: string; answer?: string; answerText?: string }>)
        .map((q) => ({
          question: typeof q.question === "string" ? q.question : q.questionText || "",
          answer: typeof q.answer === "string" ? q.answer : q.answerText || "",
        }))
        .filter((q) => q.question && q.answer);

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions,
      });

      if (response.data) {
        toast.success("More questions added!");
        fetchSessionDetailsById();
      }
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message: string }>;
      toast.error(axiosErr?.response?.data?.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-surface border border-border rounded-xl">
              <button
                onClick={() => setFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === "all"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                All ({sessionData?.questions?.length || 0})
              </button>
              <button
                onClick={() => setFilter("pinned")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  filter === "pinned"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <LuPin size={11} />
                Pinned ({pinnedCount})
              </button>
            </div>
          </div>

          <button
            onClick={uploadMoreQuestions}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <SpinnerLoader size={14} />
            ) : (
              <LuPlus size={14} />
            )}
            {isGenerating ? "Generating..." : "Generate More"}
          </button>
        </div>

        {/* Loading state */}
        {isLoading && !openLearnMoreDrawer && (
          <div className="flex items-center justify-center py-20">
            <LoadingMessage message={loadingMessage} />
          </div>
        )}

        {/* Empty pinned state */}
        {!isLoading && filter === "pinned" && filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent-soft/30 border border-accent/20 flex items-center justify-center mb-4">
              <LuPin className="text-accent" size={22} />
            </div>
            <p className="text-sm text-text-secondary">No pinned questions yet</p>
            <p className="text-xs text-text-muted mt-1">Pin important questions for quick revision</p>
          </motion.div>
        )}

        {/* Questions grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((q, index) => (
              <motion.div
                key={q._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                layout
              >
                <QuestionCard
                  question={q.question}
                  answer={q.answer}
                  isPinned={q.isPinned}
                  onLearnMore={() => generateConceptExplanation(q.question)}
                  onTogglePin={() => toggleQuestionPinStatus(q._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom generate more */}
        {!isLoading && filteredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={uploadMoreQuestions}
              disabled={isGenerating}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-dashed border-border text-text-muted hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <SpinnerLoader size={16} />
              ) : (
                <LuSparkles size={16} className="group-hover:rotate-12 transition-transform" />
              )}
              {isGenerating ? "Generating questions..." : "Generate 10 more questions"}
            </button>
          </motion.div>
        )}
      </div>

      {/* AI Explanation Drawer */}
      <Drawer
        isOpen={openLearnMoreDrawer}
        onClose={() => setOpenLearnMoreDrawer(false)}
        title={!isLoading && explanation?.title ? explanation.title : undefined}
      >
        {isLoading && <LoadingMessage message={loadingMessage} />}

        {errorMsg && (
          <p className="flex items-center gap-2 text-sm text-warning">
            <LuCircleAlert />
            {errorMsg}
          </p>
        )}

        {!isLoading && explanation && (
          <AIResponsePreview content={explanation.explanation} />
        )}
      </Drawer>
    </DashboardLayout>
  );
};

export default InterviewPrep;
