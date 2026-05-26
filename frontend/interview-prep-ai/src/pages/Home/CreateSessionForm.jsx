import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuSparkles, LuX } from "react-icons/lu";

const CreateSessionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = Array.isArray(aiResponse.data) ? aiResponse.data : [];

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
        numberOfQuestions: 10,
      });

      if (response.data?.session?._id) {
        onClose();
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <LuSparkles className="text-accent" size={16} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-text-primary">New Interview Session</h3>
            <p className="text-xs text-text-muted mt-0.5">Generate AI-powered questions tailored to your role</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
          <LuX size={20} />
        </button>
      </div>

      <form onSubmit={handleCreateSession} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Target Role"
            placeholder="Frontend Developer"
            type="text"
          />
          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            label="Years of Experience"
            placeholder="2"
            type="number"
          />
        </div>

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="React, Node.js, MongoDB"
          type="text"
        />

        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">Description (optional)</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={({ target }) => handleChange("description", target.value)}
            placeholder="Add your goals or interview preferences..."
            className="w-full mt-1 px-4 py-3 bg-surface border border-border rounded-xl outline-none resize-none text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
          />
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary text-xs px-5 py-3 w-full sm:w-auto justify-center">
            Cancel
          </button>
          <button type="submit" disabled={isLoading} className="btn-primary w-full sm:w-auto justify-center min-w-[160px]">
            {isLoading ? <SpinnerLoader size={18} /> : "Generate Session"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;
