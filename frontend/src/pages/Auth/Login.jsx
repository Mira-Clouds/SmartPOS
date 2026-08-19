import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import {
  loginUser,
} from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRoleFromToken = (token) => {
    try {
      const payload = token.split(".")[1];

      const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const decodedPayload = JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split("")
            .map(
              (char) =>
                "%" +
                (
                  "00" +
                  char
                    .charCodeAt(0)
                    .toString(16)
                ).slice(-2)
            )
            .join("")
        )
      );

      return decodedPayload.role;
    } catch (error) {
      console.error(
        "Unable to decode token:",
        error
      );

      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        await loginUser(formData);

      if (!token) {
        alert("Login Failed");
        return;
      }

      const role =
        getRoleFromToken(token);

      if (!role) {
        alert(
          "Unable to identify user role"
        );
        return;
      }

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "username",
        formData.username
      );

      localStorage.setItem(
        "role",
        role
      );

      alert("Login Successful");

      if (role === "ADMIN") {
        navigate(
          "/admin/dashboard"
        );
      } else if (
        role === "CASHIER"
      ) {
        navigate(
          "/cashier/dashboard"
        );
      } else {
        alert("Invalid user role");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid username or password";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          SmartPOS
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={
                formData.username
              }
              onChange={
                handleChange
              }
              placeholder="Enter username"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 rounded-lg font-semibold"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;