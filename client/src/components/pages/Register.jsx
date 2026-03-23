import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../loader/Loader";
import { db } from "../../firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const clearForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    let ignore = false;
    const verifyUsername = async () => {
      const val = username.trim();
      if (!val) {
        setUsernameStatus(false);
        setUsernameMessage("");
        return;
      }
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", val));
        const snapshot = await getDocs(q);
        if (!ignore) {
          if (snapshot.empty) {
            setUsernameStatus(true);
            setUsernameMessage("✅ Username available");
          } else {
            setUsernameStatus(false);
            setUsernameMessage("❌ Already taken");
          }
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    };
    verifyUsername();
    return () => { ignore = true; };
  }, [username]);

  useEffect(() => {
    let ignore = false;
    const verifyEmail = async () => {
      const val = email.trim();
      if (!val) {
        setEmailStatus(false);
        setEmailMessage("");
        return;
      }
      try {
        const emailRef = collection(db, "users");
        const q = query(emailRef, where("email", "==", val));
        const snapshot = await getDocs(q);
        if (!ignore) {
          if (snapshot.empty) {
            setEmailStatus(true);
            setEmailMessage("");
          } else {
            setEmailStatus(false);
            setEmailMessage("Email already registered");
          }
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    };
    verifyEmail();
    return () => { ignore = true; };
  }, [email]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!usernameStatus || !emailStatus) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (response.ok && data?.token) {
        localStorage.setItem("userToken", data.token);
        clearForm();
        navigate("/profile", { state: { userData: data.userData } });
      } else {
        alert(data?.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 flex items-center justify-center px-4 overflow-hidden">
      {loading && <Loader />}

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />

      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 flex items-center gap-4"
      >
        <Link to="/" className="text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors">←</span>
          <span className="font-bold text-sm uppercase tracking-widest text-gray-900 dark:text-white">Back to Home</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] -ml-16 -mt-16 rounded-full" />

          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Join the <span className="text-emerald-600 dark:text-emerald-500">Wave</span></h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Create your professional quizzer profile</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border ${emailMessage ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300`}
                  required
                />
                {emailMessage && (
                  <p className="text-xs font-bold text-red-500 ml-1">{emailMessage}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Username</label>
                <input
                  type="text"
                  placeholder="Pick a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border ${usernameMessage.includes('❌') ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300`}
                  required
                />
                {usernameMessage && (
                  <p className={`text-xs font-bold ml-1 ${usernameMessage.includes('❌') ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-500'}`}>{usernameMessage}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 transition-colors font-bold text-xs"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 rounded-lg border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-emerald-500 focus:ring-emerald-500/50 transition-all cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-500 font-medium">I agree to the <span className="text-emerald-600 dark:text-emerald-500 cursor-pointer">Terms of Service</span></label>
            </div>

            <button
              type="submit"
              disabled={loading || !usernameStatus || (!emailStatus && email !== "")}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 active:scale-95"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
            <span className="text-xs font-black text-gray-500 dark:text-gray-600 uppercase tracking-widest">social join</span>
            <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          <button className="w-full py-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold transition-all flex items-center justify-center gap-3">
            <svg className="w-5 h-5 text-gray-900 dark:text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.73 17.1,6.73L19.05,4.54C19.05,4.54 16.15,2.05 12.19,2.05C6.74,2.05 2,6.58 2,12C2,17.42 6.74,21.95 12.19,21.95C17.64,21.95 22,17.42 22,12C22,11.69 21.95,11.39 21.35,11.1Z" />
            </svg>
            Sign up with Google
          </button>

          <div className="mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-500 font-bold">
              Already have an account?{" "}
              <Link to="/signIn" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
