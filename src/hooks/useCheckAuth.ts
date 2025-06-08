import { useEffect, useState } from "react";

const useCheckAuth = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authData = localStorage.getItem("pocketbase_auth");
    

    if (!authData) {
      setIsLoggedIn(false);
      return;
    }

    try {
      // Directly parse the JSON
      const parsedAuthData = JSON.parse(authData);
      

      const { token } = parsedAuthData as { token: string };

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      // If token exists, user is logged in
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error parsing auth data:", err);
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useCheckAuth;