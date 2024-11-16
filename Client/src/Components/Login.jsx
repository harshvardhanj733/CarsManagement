import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ onLogin, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // if (!isValidEmail(email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }

    let result = await fetch("http://localhost:80/api/user/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify({ email, password }),
    });
    result = await result.json();
    if (result.message) toast(result.message);

    if (result.success) {
      onLogin();
      setToken(result.token);
      navigate("/dashboard");
    } else {
      setError("Please Fill all the fields correctly");
    }

    // setLoading(true);

    // setTimeout(() => {
    //   // I need to change this later and replace if-else parts
    //   if (email === "test@example.com" && password === "password123") {
    //     setError("Invalid email or password.");
    //   } else {
    //     onLogin();
    //     navigate("/dashboard");
    //   }
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <div className="h-screen">
      <header className="h-20 bg-gray-800 sm:max-h-20 flex items-center z-30 w-full border-b border-white">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="uppercase text-white font-black text-3xl transition-all duration-500 tracking-widest hover:tracking-tighter"
          >
            Car-Tunes
          </a>
          <div className="flex items-center">
            <nav className="font-sen text-white uppercase text-lg lg:flex items-center hidden">
              <a
                href="/login"
                className="py-2 px-6 flex opacity-70 hover:text-teal-700"
              >
                Login
              </a>
              <a
                className="py-2 px-6 flex hover:opacity-70 hover:text-teal-700 cursor-pointer"
                href="/register"
              >
                Register
              </a>
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1  bg-white mb-1"></span>
              <span className="w-6 h-1  bg-white mb-1"></span>
              <span className="w-6 h-1  bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex items-center justify-center min-h-full bg-gray-900">
        <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-teal-400 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-700 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gray-700 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Don&apos;t have an account?</p>
            <button
              onClick={() => navigate("/register")}
              className="text-teal-400 hover:underline text-sm"
            >
              Sign up here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
