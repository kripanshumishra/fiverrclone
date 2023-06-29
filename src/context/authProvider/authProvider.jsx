import { createContext, useEffect, useState } from "react";
import makeRequest from "../../utils/makeRequest";

export const authContext = createContext({isSeller: null});

export default function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);
  const handleAuth = async () => {
    try {
      const res = await makeRequest.get("/auth/me");
      return res.data;
    } catch (error) {
      return Promise.reject(error || "something went wrong");
    }
  };
  useEffect(() => {
    let isMounted = true;
    handleAuth()
      .then((res) => {
        console.log( res )
        if (isMounted) setAuthData(res);
      })
      .catch((error) => {
        setAuthData(null);
        console.log("authcontext useEffect", error);
      });

    return () => {
      isMounted = false;
    };
  },[]);
  return (
    <authContext.Provider value={{ authData, setAuthData }}>
      {children}
    </authContext.Provider>
  );
}
