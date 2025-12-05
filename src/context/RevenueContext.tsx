import {
  createContext,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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
  token?: string;
  getRevenues: () => Promise<void> | void;
  createRevenue: (data: any) => Promise<void> | void;
  updateRevenue: (idGoal: any, data: any) => Promise<void> | void;
  deleteRevenue: (idGoal: any) => Promise<void> | void;
  auth: () => Promise<void> | void;
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
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [revenues, setRevenue] = useState<Revenue[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPending, startTransition] = useTransition();

  const auth = async () => {
    if (storedToken) {
      let token = storedToken;

      try {
        const response = await axios.get(`http://localhost:3000/auth`, {
          headers: {
            authorization: token,
          },
        });

        console.log(response);

        if (response.status == 200 && response.data.message === "Authorized") {
          setIsAuthorized(true);
        } else if (
          response.status == 401 &&
          response.data.message === "Unauthorized"
        ) {
          setIsAuthorized(false);
          navigation("/login");
        }
      } catch (error: any) {
        console.log(error.response.data.message.name);

        if (
          (error.response.status == 401 &&
            error.response?.data.message == "Authorization required") ||
          (error.response.status == 401 &&
            error.response.data.message === "Unauthorized") ||
          (error.response.status == 401 &&
            error.response.data.message.name === "TokenExpiredError") ||
          error.response?.data.message == undefined
        ) {
          setIsAuthorized(false);
          navigation("/login");
        }
      }
    } else {
      navigation("/login");
    }
  };

  const getRevenues = async () => {
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    });
  };

  const createRevenue = async (data: any) => {
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    });
  };

  const updateRevenue = async (idRevenue: any, data: any) => {
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    });
  };

  const deleteRevenue = async (idRevenue: any) => {
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    });
  };

  return (
    <RevenueContext.Provider
      value={{
        getRevenues,
        createRevenue,
        updateRevenue,
        deleteRevenue,
        auth,
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
