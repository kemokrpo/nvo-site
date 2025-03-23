import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

type UserProfile = {
  username: string;
  email: string;
  role: { id: number; name: string };
  firstName: string;
  lastName: string;
  profilePicture: { url: string } | null;
  phoneNumber: string;
  dateOfBirth: string;
  bio: string;
};

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    username: "",
    email: "",
    role: { id: 0, name: "" },
    firstName: "",
    lastName: "",
    profilePicture: null,
    phoneNumber: "",
    dateOfBirth: "",
    bio: "",
  });
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/users/me?populate[role]=true&populate[profilePicture]=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data;

        setUserData(userData);
        setFormData({
          ...userData,
          profilePicture: userData.profilePicture || null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isClient) {
      fetchProfile();
    }
  }, [isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePictureFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    if (profilePictureFile) {
      const formData = new FormData();
      formData.append("files", profilePictureFile);
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", String(userData?.id));
      formData.append("field", "profilePicture");

      try {
        const uploadRes = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uploadData = uploadRes.data;
        if (uploadData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            profilePicture: uploadData[0],
          }));
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/users/me`,
        {
          ...formData,
          profilePicture: formData.profilePicture?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      if (!data.error) {
        setUserData(data);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getRoleName = (role: { id: number; name: string }) => {
    return role.name || "Unknown Role";
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-dt-dark">Profile</h1>
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Image
            src={
              userData.profilePicture?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${userData.profilePicture.url}`
                : "/default-profile.png"
            }
            alt="Profile Picture"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full border border-gray-900 dark:border-gray-600"
            unoptimized
          />
          <div>
            <p className="text-xl font-semibold dark:text-dt-dark">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="dark:text-dt-dark">{getRoleName(userData.role)}</p>
          </div>
        </div>
        {editing && (
          <button onClick={handleSubmit} className="btn">
            Save
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {["firstName", "lastName", "email", "phoneNumber", "dateOfBirth"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block dark:text-dt-dark">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "dateOfBirth" ? "date" : "text"}
              name={field}
              value={formData[field as keyof UserProfile]}
              onChange={handleChange}
              className="input border border-gray-500 dark:border-gray-600"
              onFocus={() => setEditing(true)}
            />
          </div>
        ))}
        <div className="col-span-2">
          <label htmlFor="profilePicture" className="block dark:text-dt-dark">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="input border border-gray-500 dark:border-gray-600"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="bio" className="block dark:text-dt-dark">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="textarea dark:text-dt-dark w-full h-52 resize-none border border-gray-500 dark:border-gray-100"
            onFocus={() => setEditing(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
