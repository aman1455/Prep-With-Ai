import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { LuLogIn } from "react-icons/lu";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Unable to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <LuLogIn className="text-accent" size={16} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-text-primary">Welcome Back</h3>
          <p className="text-xs text-text-muted">Sign in to continue practicing</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="mt-7 space-y-4">
        <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" />
        <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 characters" type="password" />

        {error && <p className="text-danger text-xs">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full mt-2"
        >
          {isLoading && <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />}
          {isLoading ? "Signing in..." : "Login"}
        </button>

        <p className="text-xs text-text-muted text-center mt-4">
          Don't have an account?{" "}
          <button type="button" className="font-medium text-accent hover:underline" onClick={() => setCurrentPage("signup")}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
