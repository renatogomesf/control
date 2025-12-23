import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

type AmountToReceive = {
  idAmountToReceive: number;
  date: string;
  name: string;
  description: string;
  value: number;
  user: number;
  createdAt: Date;
  updatedAt: Date;
};

interface IAmountToReceiveContext {
  AmountsToReceive: AmountToReceive[] | null;
  getAmountsToReceive: () => Promise<string | void>;
  createAmountToReceive: (data: any) => Promise<string | void>;
  updateAmountToReceive: (
    idAmountToReceive: any,
    data: any
  ) => Promise<string | void>;
  deleteAmountToReceive: (idAmountToReceive: any) => Promise<string | void>;
  setAmountToReceive: Dispatch<SetStateAction<AmountToReceive[] | null>>;

  isAuthorized: boolean;
}

export const AmountToReceiveContext = createContext(
  {} as IAmountToReceiveContext
);

export const AmountToReceiveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [AmountsToReceive, setAmountToReceive] = useState<
    AmountToReceive[] | null
  >([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getAmountsToReceive = async (): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.get(
            `http://localhost:3000/v1/amounttoreceive/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            setAmountToReceive(response.data);
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

  const createAmountToReceive = async (data: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        try {
          const response = await axios.post(
            `http://localhost:3000/v1/amounttoreceive`,
            data
          );

          if (response.data && response.status == 201) {
            message = "Valor criado com sucesso!";
            getAmountsToReceive();
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

  const updateAmountToReceive = async (
    idAmountToReceive: any,
    data: any
  ): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.put(
            `http://localhost:3000/v1/amounttoreceive/${idAmountToReceive}/${user?.idUser}`,
            data
          );

          if (response.data && response.status == 200) {
            message = "Valor atualizado com sucesso!";
            getAmountsToReceive();
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

  const deleteAmountToReceive = async (
    idAmountToReceive: any
  ): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.delete(
            `http://localhost:3000/v1/amounttoreceive/${idAmountToReceive}/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            message = "Valor deletado com sucesso!";
            getAmountsToReceive();
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
    <AmountToReceiveContext.Provider
      value={{
        getAmountsToReceive,
        createAmountToReceive,
        updateAmountToReceive,
        deleteAmountToReceive,
        setAmountToReceive,
        AmountsToReceive,
        isAuthorized,
      }}
    >
      {children}
    </AmountToReceiveContext.Provider>
  );
};
