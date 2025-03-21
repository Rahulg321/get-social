import { getValueFromStorage, secureGet } from "@/utils/secure-store";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      console.log("inside fetch token function");
      const fetchedToken = await secureGet("token");
      // console.log("Fetched token inside use auth", fetchedToken);
      setUserToken(fetchedToken || "");
      setLoading(false);
    };

    fetchToken();
  }, []);

  return {
    userToken,
    isLoading: loading,
  };
};

export default useAuth;
