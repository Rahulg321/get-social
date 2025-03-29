import { getValueFromStorage, secureGet } from "@/utils/secure-store";
import { useContext, useEffect } from "react";
import { AuthContext } from "./authProvider";

export const useAuth = () => {
  const {
    token: userToken,
    isLoading,
    setToken,
    setIsLoading,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      console.log("inside fetch token function");
      const fetchedToken = await secureGet("token");
      // console.log("Fetched token inside use auth", fetchedToken);
      setToken(fetchedToken || "");
      setIsLoading(false);
    };

    fetchToken();
  }, []);

  return {
    userToken,
    isLoading,
  };
};
