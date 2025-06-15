import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PocketBase from "pocketbase";
import { useAuth } from "@/context/AuthContext";
import { RecordModel } from "pocketbase";

import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { CountryData } from "react-intl-tel-input";



const ProfilePage = () => {
  const [userData, setUserData] = useState<RecordModel | null>(null);
  const [editing, setEditing] = useState(false);
  type FormData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    phone?: string;
    bio?: string;
    [key: string]: any;
  };
  
  const [formData, setFormData] = useState<FormData>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading && !isLoggedIn) {
        router.push("/");
      } else {
        setIsAuthChecked(true);
      }
    };
    checkAuth();
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
  if (!isAuthChecked) return;

  const fetchProfile = async () => {
    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
      const authData = JSON.parse(localStorage.getItem("pocketbase_auth") || "{}");
      const userId = authData?.record?.id;

      if (!userId) return;

      const user = await pb.collection("users").getOne(userId);

      setUserData(user);
      setFormData({
        ...user,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0] // Format to YYYY-MM-DD
          : "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchProfile();
}, [isAuthChecked]);





  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handlePhoneChange = (
  isValid: boolean,
  value: string,
  countryData: CountryData
) => {
  const countryCode = countryData.dialCode || "";
  const formattedPhone = value.startsWith(`+${countryCode}`)
    ? value
    : `+${countryCode}${value.replace(/\D/g, "")}`;
  setFormData((prev) => ({ ...prev, phone: formattedPhone }));
};

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setAvatarFile(e.target.files[0]);
  }
};


  const handleSubmit = async () => {
    try {
      if (!userData) {
        console.error("User data is not loaded.");
        return;
      }
      const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

      let avatarUrl = userData.avatar || null;

      if (avatarFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("avatar", avatarFile);

        const uploadRes = await pb.collection("users").update(userData.id, formDataUpload);
        avatarUrl = uploadRes.avatar;
      }

      const updatedUser = await pb.collection("users").update(userData.id, {
        ...formData,
        avatar: avatarUrl,
      });

      setUserData(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!isAuthChecked || !userData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <div
              className="relative cursor-pointer"
              onClick={() => document.getElementById("avatarInput")?.click()}
            >
              <Image
                src={
                  userData.avatar
                    ? `${process.env.NEXT_PUBLIC_PB_URL}/api/files/users/${userData.id}/${userData.avatar}`
                    : "/default-profile.png"
                }
                alt="Avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border"
                unoptimized
              />
              <div className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs p-1 rounded-full">
                Edit
              </div>
            </div>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-xl font-semibold">
              {userData.firstName} {userData.lastName}
            </p>
            <p>{userData.role || "User"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {["firstName", "lastName", "email", "dateOfBirth"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "dateOfBirth" ? "date" : "text"}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="input border"
              onFocus={() => setEditing(true)}
            />
          </div>
        ))}
        <div>
          <label htmlFor="phone" className="block">
            Phone Number
          </label>
          <IntlTelInput
            preferredCountries={["us", "gb", "de"]}
            excludeCountries={["il"]}
            onPhoneNumberChange={(isValid, value, countryData) => handlePhoneChange(isValid, value, countryData)}
            value={formData.phone || ""}
            inputClassName="w-full border p-2 rounded"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="bio" className="block">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            className="textarea w-full h-52 resize-none border"
            onFocus={() => setEditing(true)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="btn-primary px-6 py-2 bg-main-700 text-white rounded hover:bg-main-800 transition-colors mt-4"
        disabled={!editing}
      >
        Apply Changes
      </button>
    </div>
  );
};

export default ProfilePage;
