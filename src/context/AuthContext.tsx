import { createContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface IAuthContext {
  auth: () => Promise<boolean>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const storedToken = localStorage.getItem("token");

  const auth = async () => {
    let isAuth: boolean = false

    if (storedToken) {
      let token = storedToken;

      try {
        const response = await axios.get(`http://localhost:3000/auth`, {
          headers: {
            authorization: token,
          },
        });

        if (response.status == 200 && response.data.message === "Authorized") {
          isAuth = true;
        } else if (
          response.status == 401 &&
          response.data.message === "Unauthorized"
        ) {
          isAuth = false;
          navigation("/");
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
          isAuth = false;
          navigation("/");
        }
      }
    } else {
      navigation("/");
    }

    return isAuth
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
