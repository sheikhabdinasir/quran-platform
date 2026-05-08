import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";

// images
import adminProfile from "../../assets/adminprofile.png";
import hero1 from "../../assets/hero/hero1.jpg";
import hero2 from "../../assets/hero/hero2.jpg";
import hero3 from "../../assets/hero/hero3.jpg";

const backgrounds = [hero1, hero2, hero3];

const AdminLogin = () => {
  const { loginAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  // 🔁 background auto-rotate (fade)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Fadlan geli email iyo password sax ah");
      return;
    }

    setError("");
    setLoading(true);

    const res = await loginAdmin(email, password, rememberMe);

    setLoading(false);

    if (!res?.success) {
      setError(res?.message || "Login failed");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND IMAGES */}
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ${
            i === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-4">
        <div
  className="mx-auto w-full max-w-sm bg-[#e0e5ec]/95 rounded-[30px]
  shadow-[0_0_0_#000000]
  p-8"
>


          {/* PROFILE */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={adminProfile}
              alt="Admin Profile"
              className="w-24 h-24 rounded-full border-4 border-amber-400
              shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]
              object-cover"
            />

            <h2 className="mt-4 text-sm font-semibold text-slate-700 text-center">
              أهلًا وسهلًا بك في الموقع الرسمي للشيخ عبد الناصر حاج أحمد رحمه الله
            </h2>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#e0e5ec]
                shadow-[inset_6px_6px_8px_#a3b1c6,inset_-6px_-6px_8px_#ffffff]
                outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 pr-12 rounded-full bg-[#e0e5ec]
                shadow-[inset_6px_6px_8px_#a3b1c6,inset_-6px_-6px_8px_#ffffff]
                outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? "Hide" : "Show"}

              </button>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>

              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-semibold
              shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]
              active:shadow-[inset_4px_4px_6px_#a3b1c6,inset_-4px_-4px_6px_#ffffff]"
            >
              {loading ? "Loading..." : "Login"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
