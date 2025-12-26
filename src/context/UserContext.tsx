import { useNavigate } from "react-router";
import { createContext, useEffect, useState } from "react";
import api from "../axios";

type User = {
  idUser: number;
  name: string;
  lastName: string;
  email: string;
};

interface IUserContext {
  user: User | null;
  token: string;
  login: (data: any) => Promise<string | void>;
  register: (data: any) => Promise<string | void>;
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

  const login = async (data: any): Promise<string | void> => {
    let message: string = "";

    try {
      const response = await api.post("/login", data);

      const loggedUser = response.data?.user;
      const authToken = response.data?.token;

      setUser(loggedUser);
      setToken(authToken);

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", authToken);

      if (loggedUser && authToken) {
        navigation("/goal");
      }
    } catch (error: any) {
      message = error.response?.data.message;
    }

    return message;
  };

  const register = async (data: any): Promise<string | void> => {
    let message: string = "";

    try {
      const response = await api.post("/register", data);

      if (response.data && response.status == 201) {
        message = "Cadastro criado com sucesso!";
        setTimeout(() => {
          navigation("/");
        }, 3000);
      }
    } catch (error: any) {
      message = error.response?.data.message;
    }

    return message;
  };

  return (
    <UserContext.Provider value={{ login, user, token, register }}>
      {children}
    </UserContext.Provider>
  );
};
