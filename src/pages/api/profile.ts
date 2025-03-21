// pages/api/profile.ts

import type { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token in header

  switch (method) {
    case "GET":
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data?.error) {
          return res.status(400).json({ error: "Unable to fetch profile." });
        }
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    case "PUT":
      const { firstName, lastName, email, bio, profilePicture } = req.body;
      const roleId = getRoleIdFromEmail(email);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            bio,
            profilePicture,
            role: roleId,
          }),
        });

        const data = await response.json();
        if (data?.error) {
          return res.status(400).json({ error: "Unable to update profile." });
        }
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}

function getRoleIdFromEmail(email: string) {
  if (email.endsWith("@best-eu.org")) {
    return 4; // BESTie
  } else if (email.endsWith("@edu.fit.ba")) {
    return 3; // Student
  }
  return 1; // Authenticated
}
