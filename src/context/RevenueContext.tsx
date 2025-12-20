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
  const { auth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [revenues, setRevenue] = useState<Revenue[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getRevenues = async (): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.get(
            `http://localhost:3000/v1/revenue/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            setRevenue(response.data);
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

  const createRevenue = async (data: any) => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        try {
          const response = await axios.post(
            `http://localhost:3000/v1/revenue`,
            data
          );

          if (response.data && response.status == 201) {
            message = "Receita criada com sucesso!";
            getRevenues();
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

  const updateRevenue = async (idRevenue: any, data: any) => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.put(
            `http://localhost:3000/v1/revenue/${idRevenue}/${user?.idUser}`,
            data
          );

          if (response.data && response.status == 200) {
            message = "Receita atualizada com sucesso!";
            getRevenues();
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

  const deleteRevenue = async (idRevenue: any) => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.delete(
            `http://localhost:3000/v1/revenue/${idRevenue}/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            message = "Receita deletada com sucesso!";
            getRevenues();
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
