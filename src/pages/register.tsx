import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useAuth } from "@/context/AuthContext"; // Use AuthContext for login state

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const router = useRouter();

  // Check if the user is already logged in
  const { isLoggedIn, login } = useAuth(); // Use AuthContext

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "firstName" || name === "lastName") {
      const suggestedUsername = `${formData.firstName}${formData.lastName}`
        .toLowerCase()
        .replace(/\s+/g, "");
      setFormData((prev) => ({
        ...prev,
        username: prev.username || suggestedUsername,
      }));
    }
  };

  const checkUsernameAvailability = async () => {
    if (!formData.username) return;

    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
      await pb.collection("users").getFirstListItem(`username="${formData.username}"`);
      setUsernameAvailable(false);
    } catch {
      setUsernameAvailable(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!usernameAvailable) {
      setError("Username is already taken");
      return;
    }

    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

      let role = "user";
      if (formData.email.endsWith("@best-eu.org")) {
        role = "bestie";
      } else if (formData.email.endsWith("@edu.fit.ba")) {
        role = "student";
      }

      const userData = {
        username: formData.username || `${formData.firstName}${formData.lastName}`
          .toLowerCase()
          .replace(/\s+/g, ""),
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role,
        emailVisibility: true,
        verified: false,
      };

      await pb.collection("users").create(userData);

      // Auto-login after registration
      const authData = await pb.collection("users").authWithPassword(
        formData.email,
        formData.password
      );

      localStorage.setItem("pocketbase_auth", JSON.stringify(authData));
      login(); // Use AuthContext to update state

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.data?.message || err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-[550px]">
      <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-main-700 shadow-md rounded-lg translate-y-[2rem]">
        <h1 className="text-2xl font-bold mb-4 text-dt-dark dark:text-dt-light">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              onBlur={checkUsernameAvailability}
              className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
            />
            {!usernameAvailable && (
              <p className="text-red-500 text-sm mt-1">Username is taken. Please choose another.</p>
            )}
            {formData.username && usernameAvailable && (
              <p className="text-green-500 text-sm mt-1">Username available!</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {!formData.username && "Will be generated from your name if left blank"}
            </p>
          </div>

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
            minLength={8}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-dbg-dark dark:text-dt-dark"
            required
          />

          <button
            type="submit"
            className="w-full p-2 rounded bg-dbg-light text-dt-light dark:bg-dbg-dark dark:text-dt-dark hover:bg-gray-500 dark:hover:bg-gray-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
