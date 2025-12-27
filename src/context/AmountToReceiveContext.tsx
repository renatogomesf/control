import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import api from "../axios";

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
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [AmountsToReceive, setAmountToReceive] = useState<
    AmountToReceive[] | null
  >([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthReturn = (error: any) => {
    if (
      (error.response.status == 401 &&
        error.response?.data.message == "Authorization required") ||
      (error.response.status == 400 &&
        error.response.data.message === "Unauthorized") ||
      (error.response.status == 400 &&
        error.response.data.message.name === "TokenExpiredError") ||
      (error.response.status == 400 &&
        error.response.data.message.message === "invalid token") ||
      error.response?.data.message == undefined
    ) {
      navigation("/");
    } else {
      return error.response?.data.message;
    }
  };

  const getAmountsToReceive = async (): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.get(`/v1/amounttoreceive/${user?.idUser}`, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 200) {
          setAmountToReceive(response.data);
          setIsAuthorized(true);
        }
      } catch (error: any) {
        message = checkAuthReturn(error);
      }
    } else {
      navigation("/");
    }

    return message;
  };

  const createAmountToReceive = async (data: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      try {
        const response = await api.post(`/v1/amounttoreceive`, data, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 201) {
          message = "Valor criado com sucesso!";
          getAmountsToReceive();
          setIsAuthorized(true);
        }
      } catch (error: any) {
        message = checkAuthReturn(error);
      }
    } else {
      navigation("/");
    }

    return message;
  };

  const updateAmountToReceive = async (
    idAmountToReceive: any,
    data: any
  ): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.put(
          `/v1/amounttoreceive/${idAmountToReceive}/${user?.idUser}`,
          data,
          { headers: { Authorization: storedToken } }
        );

        if (response.data && response.status == 200) {
          message = "Valor atualizado com sucesso!";
          getAmountsToReceive();
          setIsAuthorized(true);
        }
      } catch (error: any) {
        message = checkAuthReturn(error);
      }
    } else {
      navigation("/");
    }

    return message;
  };

  const deleteAmountToReceive = async (
    idAmountToReceive: any
  ): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.delete(
          `/v1/amounttoreceive/${idAmountToReceive}/${user?.idUser}`,
          { headers: { Authorization: storedToken } }
        );

        if (response.data && response.status == 200) {
          message = "Valor deletado com sucesso!";
          getAmountsToReceive();
          setIsAuthorized(true);
        }
      } catch (error: any) {
        message = checkAuthReturn(error);
      }
    } else {
      navigation("/");
    }

    return message;
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
