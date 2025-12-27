import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import api from "../axios";

type Revenue = {
  idRevenue: number;
  date: string;
  description: string;
  value: number;
  user: number;
  createdAt: Date;
  updatedAt: Date;
};

interface IRevenueContext {
  revenues: Revenue[] | null;
  getRevenues: () => Promise<string | void>;
  createRevenue: (data: any) => Promise<string | void>;
  updateRevenue: (idGoal: any, data: any) => Promise<string | void>;
  deleteRevenue: (idGoal: any) => Promise<string | void>;
  setRevenue: Dispatch<SetStateAction<Revenue[] | null>>;
  isAuthorized: boolean;
}

export const RevenueContext = createContext({} as IRevenueContext);

export const RevenueProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [revenues, setRevenue] = useState<Revenue[] | null>([]);
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

  const getRevenues = async (): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.get(`/v1/revenue/${user?.idUser}`, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 200) {
          setRevenue(response.data);
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

  const createRevenue = async (data: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      try {
        const response = await api.post(`/v1/revenue`, data, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 201) {
          message = "Receita criada com sucesso!";
          getRevenues();
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

  const updateRevenue = async (
    idRevenue: any,
    data: any
  ): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.put(
          `/v1/revenue/${idRevenue}/${user?.idUser}`,
          data
        );

        if (response.data && response.status == 200) {
          message = "Receita atualizada com sucesso!";
          getRevenues();
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

  const deleteRevenue = async (idRevenue: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.delete(
          `/v1/revenue/${idRevenue}/${user?.idUser}`
        );

        if (response.data && response.status == 200) {
          message = "Receita deletada com sucesso!";
          getRevenues();
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
    <RevenueContext.Provider
      value={{
        getRevenues,
        createRevenue,
        updateRevenue,
        deleteRevenue,
        setRevenue,
        revenues,
        isAuthorized,
      }}
    >
      {children}
    </RevenueContext.Provider>
  );
};
