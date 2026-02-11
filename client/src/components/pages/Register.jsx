import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  // Username availability check
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
        console.log("Username snapshot:", snapshot);

        if (!ignore) {
          if (snapshot.empty) {
            setUsernameStatus(true);
            setUsernameMessage("✅ Available");
          } else {
            setUsernameStatus(false);
            setUsernameMessage("❌ Not available!");
          }
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    };

    verifyUsername();
    return () => {
      ignore = true;
    };
  }, [username]);

  // Email availability check
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
            setEmailMessage("This email is already registered!");
          }
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    };

    verifyEmail();
    return () => {
      ignore = true;
    };
  }, [email]);

  // Register handler
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
        navigate("/profile", {
          state: {
            userData: data.userData,
          },
        });
      } else {
        alert(data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 flex flex-col items-center justify-center p-6 sm:p-4 relative 
        dark:from-gray-900 dark:to-gray-800 transition duration-500"
      >
        {/* Navigation */}
        <span
          className="absolute top-4 left-6 text-base font-semibold text-gray-600 hover:text-emerald-700 transition duration-150 
          dark:text-gray-400 dark:hover:text-emerald-400"
        >
          <Link to="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            ← Home
          </Link>
          <span className="mx-2 text-gray-400 font-normal dark:text-gray-600">/</span>
          <Link to="/signIn" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            Sign In
          </Link>
        </span>

        {/* Card */}
        <div
          className="bg-white/70 backdrop-blur-xl w-full max-w-sm p-8 rounded-3xl border border-white/40 shadow-2xl shadow-gray-300/50 transform transition duration-300
          dark:bg-gray-800/80 dark:border-gray-700 dark:shadow-2xl dark:shadow-black/70"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4 dark:text-white">
            QuizWave
          </h2>
          <p className="text-gray-600 text-center mb-8 text-sm dark:text-gray-400">
            Join the wave of knowledge.
          </p>

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-emerald-500 bg-transparent text-gray-800 placeholder-gray-500 transition duration-150 outline-none
                    dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-400"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {emailMessage && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{emailMessage}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-emerald-500 bg-transparent text-gray-800 placeholder-gray-500 transition duration-150 outline-none
                    dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-400"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                {usernameMessage && (
                  <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">{usernameMessage}</p>
                )}
              </div>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full mb-4 px-4 py-3 border-b-2 border-gray-300 focus:border-emerald-500 bg-transparent text-gray-800 placeholder-gray-500 transition duration-150 outline-none
                dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="flex items-center text-sm text-gray-600 mb-6 dark:text-gray-400">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((s) => !s)}
                className="mr-2 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer bg-transparent
                  dark:border-gray-600 dark:bg-gray-800 dark:text-emerald-500"
              />
              <span className="select-none">Show Password</span>
            </div>

            <button
              type="submit"
              disabled={loading || !usernameStatus || !emailStatus}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full font-bold text-base shadow-lg shadow-emerald-300 transition duration-200 ease-in-out disabled:opacity-50
                dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-gray-900 dark:shadow-emerald-500/30"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="shrink mx-4 text-gray-400 text-sm font-medium dark:text-gray-500">or</span>
            <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 hover:border-emerald-400 bg-white/50 text-gray-700 hover:text-emerald-700 py-3 rounded-full text-base font-semibold transition duration-150 flex items-center justify-center
              dark:border-gray-600 dark:bg-gray-800/50 dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-400"
          >
            <span className="text-xl mr-2">G</span>
            Sign Up with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            Already have an account?{" "}
            <Link
              to="/signIn"
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition
                dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
