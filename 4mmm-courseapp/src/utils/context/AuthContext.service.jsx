import { createContext, useContext } from "react";
//auth context hook to get user data
export const AuthContext = createContext({
    user: undefined,
    isLoading: false,
    setUser: () => { },
});


export const useAuthContext = () => useContext(AuthContext);