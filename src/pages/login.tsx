import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleLogin = (e: React.FormEvent) => {
    getUserDetails();
    e.preventDefault();
    localStorage.setItem("username",username);
    navigate('/inbox');
    //alert(`Logged in as: ${username}`);
  };
const navigate = useNavigate();

const getUserDetails = async () => {    
  //  setLoading(true);
    //setActiveTab(arg);
    try {
      const payload = {
        email: username,
        password: password
      };

      // 👈 second argument is the body (data)
      const response = await axios.post(
        `https://10.2.6.130:5000/api/Login/login`,
        payload,
        { headers: { "Content-Type": "application/json" } } // optional config
      );

      console.log("API Response:", response.data);
      //setInboxData(response.data);      
      return response.data;
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0070C0] to-[#9fc5eb] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <img
          src="/ICU-Medical-logo.jpg"
          alt="ICU Medical Logo"
          className="h-16 w-auto rounded-lg mb-4"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-[#004C97]">
          Login to Pricing Tool
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070C0] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070C0] focus:outline-none pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
               
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
              isFormValid
                ? "bg-[#0070C0] hover:bg-[#005A9C]"
                : "bg-[#0070C0]/70 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          {/* © {new Date().getFullYear()} ICU Medical — Human Connections */}
        </p>
      </div>
    </div>
  );
}
