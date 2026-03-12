import { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function Field({ label, type, value, onChange, placeholder }: FieldProps) {
  return (
    <div>
      <label className="block text-[0.8rem] font-semibold text-[#1E293B] mb-1.5 font-sans">
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 border-[1.5px] border-[rgba(0,0,0,0.1)] rounded-[10px] outline-none text-[0.9rem] text-[#1E293B] bg-white font-sans transition-all duration-200 focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/20 placeholder:text-[#64748B]"
      />
    </div>
  );
}

interface SubmittedState {
  type: "login" | "signup";
  email: string;
  name?: string;
}

interface SwasthyaAuthProps {
  onClose?: () => void;
}

export default function SwasthyaAuth({ onClose }: SwasthyaAuthProps = {}) {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState<SubmittedState | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ type: "login", email: loginData.email });
    login({ name: "", email: loginData.email, phone: "" });
    setTimeout(() => onClose?.(), 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ type: "signup", name: signupData.name, email: signupData.email });
    setTimeout(() => {
      login({ name: signupData.name, email: signupData.email, phone: "" });
      onClose?.();
    }, 1500);
  };

  return (
    <div className="w-full bg-[#F8FAFC] relative overflow-hidden text-[#1E293B]">
      {/* Top accent bar using theme primary + secondary */}
      
      {/* Logo */}
      <div className="text-center mb-6 pt-1">
        <a href="/" className="inline-flex items-center gap-2.5 no-underline">
          <div className="w-[38px] h-[38px] rounded-full bg-[#4F7DF3] flex items-center justify-center shadow-[0_4px_12px_rgba(79,125,243,0.35)]">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-2xl font-bold text-[#1E293B] tracking-tight">RuralCare</span>
        </a>
        <h2 className="mt-4 font-sans text-[1.3rem] font-semibold text-[#1E293B]">
          {activeTab === "login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-[0.82rem] text-[#64748B] font-sans mt-1">
          {activeTab === "login"
            ? "Access your personalized health dashboard."
            : "Start your health journey with RuralCare."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-[#F8FAFC] rounded-full p-1 border border-[rgba(0,0,0,0.06)]">
        {(["login", "signup"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-full border-none cursor-pointer font-sans font-semibold text-[0.9rem] transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#4F7DF3] text-white shadow-[0_2px_8px_rgba(79,125,243,0.35)]"
                : "bg-transparent text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            {tab === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Success Banner */}
      {submitted && (
        <div className="mb-4 px-4 py-3 bg-[#A7E3C9]/30 border border-[#A7E3C9] rounded-[10px] text-[0.85rem] text-[#1E293B] font-sans">
          {submitted.type === "login"
            ? `✓ Logging in as ${submitted.email}…`
            : `✓ Account created for ${submitted.name}! Redirecting to login…`}
        </div>
      )}

      {/* Login Form */}
      {activeTab === "login" && (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Field
            label="Email Address"
            type="email"
            value={loginData.email}
            onChange={(v) => setLoginData({ ...loginData, email: v })}
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            type="password"
            value={loginData.password}
            onChange={(v) => setLoginData({ ...loginData, password: v })}
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="mt-2 w-full py-3 bg-[#4F7DF3] hover:bg-[#3D6DE3] text-white border-none rounded-full text-[0.95rem] font-bold font-sans cursor-pointer shadow-[0_4px_12px_rgba(79,125,243,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(79,125,243,0.45)]"
          >
            Log In
          </button>
        </form>
      )}

      {/* Signup Form */}
      {activeTab === "signup" && (
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <Field
            label="Full Name"
            type="text"
            value={signupData.name}
            onChange={(v) => setSignupData({ ...signupData, name: v })}
            placeholder="Jane Doe"
          />
          <Field
            label="Email Address"
            type="email"
            value={signupData.email}
            onChange={(v) => setSignupData({ ...signupData, email: v })}
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            type="password"
            value={signupData.password}
            onChange={(v) => setSignupData({ ...signupData, password: v })}
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="mt-2 w-full py-3 bg-[#4F7DF3] hover:bg-[#3D6DE3] text-white border-none rounded-full text-[0.95rem] font-bold font-sans cursor-pointer shadow-[0_4px_12px_rgba(79,125,243,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(79,125,243,0.45)]"
          >
            Create Account
          </button>
        </form>
      )}

      <p className="text-center text-xs text-[#64748B] mt-5 font-sans">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#4F7DF3] no-underline hover:underline">Terms</a>
        {" "}and{" "}
        <a href="#" className="text-[#4F7DF3] no-underline hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}
