import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface IAuthContext {
  auth: () => Promise<void> | void;
  isAuth: boolean;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const storedToken = localStorage.getItem("token");

  const [isAuth, setIsAuth] = useState(false);

  const auth = async () => {
    if (storedToken) {
      let token = storedToken;

      try {
        const response = await axios.get(`http://localhost:3000/auth`, {
          headers: {
            authorization: token,
          },
        });

        if (response.status == 200 && response.data.message === "Authorized") {
          setIsAuth(true);
        } else if (
          response.status == 401 &&
          response.data.message === "Unauthorized"
        ) {
          setIsAuth(false);
          navigation("/login");
        }
      } catch (error: any) {

        if (
          (error.response.status == 401 &&
            error.response?.data.message == "Authorization required") ||
          (error.response.status == 401 &&
            error.response.data.message === "Unauthorized") ||
          (error.response.status == 401 &&
            error.response.data.message.name === "TokenExpiredError") ||
          error.response?.data.message == undefined
        ) {
          setIsAuth(false);
          navigation("/login");
        }
      }
    } else {
      navigation("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
