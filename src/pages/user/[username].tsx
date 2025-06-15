import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

const UserPage = () => {
  const [userData, setUserData] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

        const users = await pb.collection("users").getFullList({
          filter: `username = "${username}"`,
          limit: 1,
        });

        if (users.length === 0) {
          setError("User not found");
          return;
        }

        setUserData(users[0]);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <div className="max-w-4xl mx-auto mb-48 p-6 relative">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
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
        <div>
          <p className="text-sm font-bold">Email:</p>
          <p>{userData.email}</p>
        </div>
        <div>
  <p className="text-sm font-bold">Date of Birth:</p>
  <p>
    {userData.dateOfBirth
      ? new Intl.DateTimeFormat("en-GB").format(new Date(userData.dateOfBirth))
      : "Not provided"}
  </p>
</div>

        <div>
          <p className="text-sm font-bold">Phone:</p>
          <p>{userData.phone || "Not provided"}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-bold">Bio:</p>
          <p>{userData.bio || "No bio available"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
