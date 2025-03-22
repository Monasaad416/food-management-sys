import { createContext } from "react";


export const AuthContext = createContext({
  userData: null, // Initial value
  setUserData: () => {},
});

