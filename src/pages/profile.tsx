// pages/profile.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default Profile;
