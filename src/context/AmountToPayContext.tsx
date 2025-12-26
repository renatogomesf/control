import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../axios";

type AmountToPay = {
  idAmountToPay: number;
  date: string;
  name: string;
  description: string;
  value: number;
  user: number;
  createdAt: Date;
  updatedAt: Date;
};

interface IAmountToPayContext {
  AmountsToPay: AmountToPay[] | null;
  getAmountsToPay: () => Promise<string | void>;
  createAmountToPay: (data: any) => Promise<string | void>;
  updateAmountToPay: (idAmountToPay: any, data: any) => Promise<string | void>;
  deleteAmountToPay: (idAmountToPay: any) => Promise<string | void>;
  setAmountToPay: Dispatch<SetStateAction<AmountToPay[] | null>>;
  isAuthorized: boolean;
}

export const AmountToPayContext = createContext({} as IAmountToPayContext);

export const AmountToPayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [AmountsToPay, setAmountToPay] = useState<AmountToPay[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getAmountsToPay = async (): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await api.get(`/v1/amounttopay/${user?.idUser}`);

          if (response.data && response.status == 200) {
            setAmountToPay(response.data);
            setIsAuthorized(true);
          }
        } catch (error: any) {
          message = error.response?.data.message;
        }
      } else {
        navigation("/");
      }

      return message;
    });

    return response;
  };

  const createAmountToPay = async (data: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        try {
          const response = await api.post(`/v1/amounttopay`, data);

          if (response.data && response.status == 201) {
            message = "Valor criado com sucesso!";
            getAmountsToPay();
            setIsAuthorized(true);
          }
        } catch (error: any) {
          message = error.response?.data.message;
        }
      } else {
        navigation("/");
      }

      return message;
    });

    return response;
  };

  const updateAmountToPay = async (
    idAmountToPay: any,
    data: any
  ): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await api.put(
            `/v1/amounttopay/${idAmountToPay}/${user?.idUser}`,
            data
          );

          if (response.data && response.status == 200) {
            message = "Valor atualizado com sucesso!";
            getAmountsToPay();
            setIsAuthorized(true);
          }
        } catch (error: any) {
          message = error.response?.data.message;
        }
      } else {
        navigation("/");
      }

      return message;
    });

    return response;
  };

  const deleteAmountToPay = async (
    idAmountToPay: any
  ): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await api.delete(
            `/v1/amounttopay/${idAmountToPay}/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            message = "Valor deletado com sucesso!";
            getAmountsToPay();
            setIsAuthorized(true);
          }
        } catch (error: any) {
          message = error.response?.data.message;
        }
      } else {
        navigation("/");
      }

      return message;
    });

    return response;
  };

  return (
    <AmountToPayContext.Provider
      value={{
        getAmountsToPay,
        createAmountToPay,
        updateAmountToPay,
        deleteAmountToPay,
        setAmountToPay,
        AmountsToPay,
        isAuthorized,
      }}
    >
      {children}
    </AmountToPayContext.Provider>
  );
};
