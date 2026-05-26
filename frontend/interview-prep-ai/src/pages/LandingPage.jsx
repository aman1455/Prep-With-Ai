import React, { useContext, useState, useEffect } from "react";
import HERO_IMG from "../assets/HERO_IMG.jpg";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuArrowRight, LuChevronRight } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const stagger = (i) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
});

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("signup");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen bg-base relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-secondary/20 blur-[120px] rounded-full animate-float-slow" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-pink/15 blur-[100px] rounded-full animate-float-slower" />
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-accent/10 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-[120px] relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-center mb-20 md:mb-28"
        >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
            <span className="text-lg font-display font-semibold text-text-primary tracking-tight">
              PrepWithAI
            </span>
          </div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              onClick={() => { setCurrentPage("login"); setOpenAuthModal(true); }}
              className="text-sm font-semibold text-white bg-accent px-5 py-2 rounded-full shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/60 hover:brightness-110 transition-all duration-300 animate-pulse-glow"
            >
              Sign In
            </button>
          )}
        </motion.header>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-accent bg-accent-soft/30 border border-accent/20 px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <LuSparkles size={12} />
              AI-Powered Interview Prep
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary leading-[1.08] tracking-tight mb-6">
              Master your
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-secondary to-pink">
                next interview
              </span>
            </h1>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              Role-specific questions, real-time AI feedback, coding challenges, system design, and behavioral practice — all in one platform.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCTA}
                className="group inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm px-6 py-3 rounded-full hover:brightness-110 transition-all duration-200"
              >
                {user ? "Go to Dashboard" : "Start Practicing"}
                <LuArrowRight className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center text-[9px] font-medium text-text-secondary">
                      {["JD", "SK", "AL"][i]}
                    </div>
                  ))}
                </div>
                <span>1.2k+ active users</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/15 via-accent-secondary/5 to-transparent rounded-2xl" />
              <img
                src={HERO_IMG}
                alt="Interview preparation dashboard"
                className="w-full rounded-2xl border border-border shadow-2xl relative"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 mb-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-xs font-medium text-text-muted tracking-widest uppercase mb-8"
          >
            Everything you need to prepare
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {APP_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              variants={stagger(i)}
              initial="initial"
              animate={mounted ? "animate" : {}}
              className="group glass-panel rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-mono font-medium text-accent bg-accent-soft/30 px-2 py-0.5 rounded-md border border-accent/20">
                  {feature.id}
                </span>
                <h3 className="font-display font-semibold text-sm text-text-primary">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">P</span>
              </div>
              <span className="text-xs text-text-muted">PrepWithAI</span>
            </div>
            <p className="text-xs text-text-muted">
              Built for serious interview preparation
            </p>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setCurrentPage("login"); }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
