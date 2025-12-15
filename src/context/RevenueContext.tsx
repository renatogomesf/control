import {
  createContext,
  useState,
  useTransition,
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
  getRevenues: () => Promise<void> | void;
  createRevenue: (data: any) => Promise<void> | void;
  updateRevenue: (idGoal: any, data: any) => Promise<void> | void;
  deleteRevenue: (idGoal: any) => Promise<void> | void;
  setRevenue: Dispatch<SetStateAction<Revenue[] | null>>;
  isPending: boolean;
  isAuthorized: boolean;
}

export const RevenueContext = createContext({} as IRevenueContext);

export const RevenueProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth, isAuth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [revenues, setRevenue] = useState<Revenue[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getRevenues = async () => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      let user = JSON.parse(storedUser);

      startTransition(async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/v1/revenue/${user?.idUser}`
          );
          setRevenue(response.data);
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response.data);
        }
      });
    } else {
      navigation("/login");
    }
  };

  const createRevenue = async (data: any) => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      startTransition(async () => {
        try {
          await axios.post(`http://localhost:3000/v1/revenue`, data);

          getRevenues();
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response);
        }
      });
    }
  };

  const updateRevenue = async (idRevenue: any, data: any) => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      let user = JSON.parse(storedUser);

      startTransition(async () => {
        try {
          await axios.put(
            `http://localhost:3000/v1/revenue/${idRevenue}/${user?.idUser}`,
            data
          );

          getRevenues();
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response);
        }
      });
    }
  };

  const deleteRevenue = async (idRevenue: any) => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      let user = JSON.parse(storedUser);

      startTransition(async () => {
        try {
          await axios.delete(
            `http://localhost:3000/v1/revenue/${idRevenue}/${user?.idUser}`
          );

          getRevenues();
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response);
        }
      });
    }
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
        isPending,
        isAuthorized,
      }}
    >
      {children}
    </RevenueContext.Provider>
  );
};
