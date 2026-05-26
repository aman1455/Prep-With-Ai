import { useState, useContext, type FormEvent, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import ProfilePhoto from "../../components/Input/ProfilePhoto";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { LuUserPlus } from "react-icons/lu";
import type { AxiosError } from "axios";

interface SignUpProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const SignUp = ({ setCurrentPage }: SignUpProps) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!fullName) { setError("Please enter your full name"); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Please enter a password."); return; }

    setError(null);
    setIsLoading(true);

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setError(axiosErr?.response?.data?.message || "Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <LuUserPlus className="text-accent" size={16} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-text-primary">Create an Account</h3>
          <p className="text-xs text-text-muted">Join PrepWithAI to master your interviews</p>
        </div>
      </div>

      <form onSubmit={handleSignUp} className="mt-6">
        <ProfilePhoto image={profilePic} setImage={setProfilePic} preview={profilePreview} setPreview={setProfilePreview} />

        <div className="space-y-4">
          <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="John Doe" type="text" />
          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" />
          <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 characters" type="password" />
        </div>

        {error && <p className="text-danger text-xs mt-3">{error}</p>}

        <button type="submit" disabled={isLoading} className="btn-primary w-full mt-5">
          {isLoading && <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-xs text-text-muted text-center mt-4">
          Already have an account?{" "}
          <button type="button" className="font-medium text-accent hover:underline" onClick={() => setCurrentPage("login")}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
