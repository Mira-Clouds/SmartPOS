import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Right Buttons */}
      <div className="flex justify-end gap-4 p-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          Admin
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          Cashier
        </button>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center justify-center mt-20">

        <img
          src={hero}
          alt="Shop Logo"
          className="w-40 h-40 object-contain"
        />

        <h1 className="text-5xl font-bold text-slate-800 mt-6">
          SMART POS
        </h1>

        <p className="text-gray-600 text-lg mt-2">
          Shop Management System
        </p>

      </div>
    </div>
  );
}

export default LandingPage;