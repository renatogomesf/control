import axios from "axios";
import { useNavigate } from "react-router";
import { createContext, useEffect, useState } from "react";

type User = {
  idUser: number;
  name: string;
  lastName: string;
  email: string;
};

interface IUserContext {
  user: User | null;
  token: string;
  login: (data: any) => Promise<void> | void;
  register: (data: any) => Promise<void> | void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);

      const loggedUser = response.data?.user;
      const authToken = response.data?.token;

      setUser(loggedUser);
      setToken(authToken);

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", authToken);

      if (loggedUser && authToken) {
        navigation("/");
      }
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const register = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);

      console.log(response.data);
      console.log(response.status);

      if (response.data) {
        navigation("/login");
      }
    } catch (error: any) {
      console.log(error.response?.data);
      console.log(error.response?.status);
    }
  };

  return (
    <UserContext.Provider value={{ login, user, token, register }}>
      {children}
    </UserContext.Provider>
  );
};
