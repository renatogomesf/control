import {
  createContext,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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
  token?: string;
  getAmountsToReceive: () => Promise<void> | void;
  createAmountToReceive: (data: any) => Promise<void> | void;
  updateAmountToReceive: (idAmountToReceive: any, data: any) => Promise<void> | void;
  deleteAmountToReceive: (idAmountToReceive: any) => Promise<void> | void;
  auth: () => Promise<void> | void;
  setAmountToReceive: Dispatch<SetStateAction<AmountToReceive[] | null>>;
  isPending: boolean;
  isAuthorized: boolean;
}

export const AmountToReceiveContext = createContext({} as IAmountToReceiveContext);

export const AmountToReceiveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [AmountsToReceive, setAmountToReceive] = useState<AmountToReceive[] | null>([]);
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

  const getAmountsToReceive = async () => {
    await auth().then(() => {
      if (storedUser && storedToken) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/v1/amounttoreceive/${user?.idUser}`
            );
            setAmountToReceive(response.data);
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

  const createAmountToReceive = async (data: any) => {
    await auth().then(() => {
      if (storedUser && storedToken) {
        startTransition(async () => {
          try {
            await axios.post(`http://localhost:3000/v1/amounttoreceive`, data);

            getAmountsToReceive();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  const updateAmountToReceive = async (idAmountToReceive: any, data: any) => {
    await auth().then(() => {
      if (storedUser && storedToken) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            await axios.put(
              `http://localhost:3000/v1/amounttoreceive/${idAmountToReceive}/${user?.idUser}`,
              data
            );

            getAmountsToReceive();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  const deleteAmountToReceive = async (idAmountToReceive: any) => {
    await auth().then(() => {
      if (storedUser && storedToken) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            await axios.delete(
              `http://localhost:3000/v1/amounttoreceive/${idAmountToReceive}/${user?.idUser}`
            );

            getAmountsToReceive();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  return (
    <AmountToReceiveContext.Provider
      value={{
        getAmountsToReceive,
        createAmountToReceive,
        updateAmountToReceive,
        deleteAmountToReceive,
        auth,
        setAmountToReceive,
        AmountsToReceive,
        isPending,
        isAuthorized,
      }}
    >
      {children}
    </AmountToReceiveContext.Provider>
  );
};
