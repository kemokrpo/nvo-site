import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, login } = useAuth(); // Use AuthContext
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
      const authData = await pb.collection("users").authWithPassword(
        formData.email,
        formData.password
      );

      localStorage.setItem("pocketbase_auth", JSON.stringify(authData));
      login(); // Use AuthContext to update state
      router.push("/profile");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <div className="h-[550px]"></div>;
  }

  return (
    <div className="h-[550px]">
      <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-main-700 shadow-md rounded-lg translate-y-[2.0rem]">
        <h1 className="text-2xl font-bold mb-4 text-dt-dark dark:text-dt-light">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded bg-dbg-light text-dt-light dark:bg-dbg-dark dark:text-dt-dark hover:bg-gray-500 dark:hover:bg-gray-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
