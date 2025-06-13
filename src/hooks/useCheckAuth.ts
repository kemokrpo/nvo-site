import { useEffect, useState } from "react";

const useCheckAuth = (): { isLoggedIn: boolean; isLoading: boolean } => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const authData = localStorage.getItem("pocketbase_auth");

    if (!authData) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    try {
      const parsedAuthData = JSON.parse(authData);
      const { token } = parsedAuthData as { token: string };

      setIsLoggedIn(!!token);
    } catch (err) {
      console.error("Error parsing auth data:", err);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false); // Always stop loading after check
    }
  }, []);

  return { isLoggedIn, isLoading };
};

export default useCheckAuth;
