import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-1.5 block">{label}</label>
      <div className="input-box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-text-primary placeholder:text-text-muted"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-muted hover:text-text-secondary transition-colors">
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
