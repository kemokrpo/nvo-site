import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",  // Only for frontend validation
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      const userId = response.data.user.id; // Get the user ID from the response
      const role = formData.email.endsWith("@edu.fit.ba")
        ? 3
        : formData.email.endsWith("@best-eu.org")
        ? 4
        : 1;

      // Now, update the user's firstName, lastName, and role
      await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: role, // This should match the role's ID in the Strapi database
        }
      );

      setSuccess("Registration successful! Please verify your email.");
      // You can redirect the user or show a success message
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "An error occurred.");
    }
  };

  return (
  <div className="h-[517px]">

    <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-main-700 shadow-md rounded-lg translate-y-[1.0rem]">
      <h1 className="text-2xl font-bold mb-4 text-dt-dark dark:text-dt-light">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
          />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
        />
        <input
          type="password"
          name="confirmPassword" // Changed name to confirmPassword
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
          />
        <button
          type="submit"
          className="w-full p-2 rounded bg-dbg-light text-dt-light dark:bg-dbg-dark dark:text-dt-dark rounded hover:bg-gray-500 dark:hover:bg-gray-500"
        >
          Register
        </button>
      </form>
    </div>
   </div>
  );
};

export default Register;
