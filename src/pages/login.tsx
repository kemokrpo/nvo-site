// pages/login.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect to home if already logged in
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        formData
      );
      const { jwt } = response.data;

      localStorage.setItem("token", jwt);
      router.push("/profile"); // Redirect to profile page on successful login
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="h-[517px]">

      <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-main-700 shadow-md rounded-lg translate-y-[1.0rem]">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-dbg-dark"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-dbg-dark"
          />
          <button
            type="submit"
            className="w-full p-2 bg-dbg-light text-dt-light dark:bg-dbg-dark dark:text-dt-dark rounded hover:bg-gray-500 dark:hover:bg-gray-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
   
  );
};

export default Login;
