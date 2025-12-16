import axios from "axios";
import { useNavigate } from "react-router";
import { createContext, useEffect, useState, useTransition } from "react";

type User = {
  idUser: number;
  name: string;
  lastName: string;
  email: string;
};

type Toast = {
  showToast: boolean;
  type: number;
  text: string;
};

interface IUserContext {
  user: User | null;
  token: string;
  login: (data: any) => Promise<void> | void;
  register: (data: any) => Promise<void> | void;
  isPending: boolean;
  controlToast: Toast | undefined;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  const [controlToast, setControlToast] = useState<Toast | undefined>(
    undefined
  );

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (data: any) => {
    startTransition(async () => {
      try {
        const response = await axios.post("http://localhost:3000/login", data);

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
        if (error.response?.data.message == "All fields are required") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Preencha todos os campos!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
              type: 2,
              text: "Preencha todos os campos!",
            });
          }, 5000);
        }

        if (error.response?.data.message == "Incorrect email or password") {
          setControlToast({
            showToast: true,
            type: 3,
            text: "E-mail ou senha incorretos!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
              type: 3,
              text: "E-mail ou senha incorretos!",
            });
          }, 5000);
        }
      }
    });
  };

  const register = async (data: any) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          data
        );

        if (response.data && response.status == 201) {
          setControlToast({
            showToast: true,
            type: 1,
            text: "Cadastro criado com sucesso!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
              type: 1,
              text: "Cadastro criado com sucesso!",
            });
          }, 5000);

          setTimeout(() => {
            navigation("/");
          }, 5500);
        }
      } catch (error: any) {
        if (error.response?.data.message == "All fields are required") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Preencha todos os campos!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
              type: 2,
              text: "Preencha todos os campos!",
            });
          }, 5000);
        }

        if (error.response?.data.message == "Email already registered") {
          setControlToast({
            showToast: true,
            type: 3,
            text: "Este e-mail já está em uso!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
              type: 3,
              text: "Este e-mail já está em uso!",
            });
          }, 5000);
        }
      }
    });
  };

  return (
    <UserContext.Provider
      value={{ isPending, login, user, token, register, controlToast }}
    >
      {children}
    </UserContext.Provider>
  );
};
