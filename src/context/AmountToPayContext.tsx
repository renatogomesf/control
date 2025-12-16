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
  getAmountsToPay: () => Promise<void> | void;
  createAmountToPay: (data: any) => Promise<void> | void;
  updateAmountToPay: (idAmountToPay: any, data: any) => Promise<void> | void;
  deleteAmountToPay: (idAmountToPay: any) => Promise<void> | void;
  setAmountToPay: Dispatch<SetStateAction<AmountToPay[] | null>>;
  isPending: boolean;
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
  const [isPending, startTransition] = useTransition();

  const getAmountsToPay = async () => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/v1/amounttopay/${user?.idUser}`
            );
            setAmountToPay(response.data);
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

  const createAmountToPay = async (data: any) => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        startTransition(async () => {
          try {
            await axios.post(`http://localhost:3000/v1/amounttopay`, data);

            getAmountsToPay();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  const updateAmountToPay = async (idAmountToPay: any, data: any) => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            await axios.put(
              `http://localhost:3000/v1/amounttopay/${idAmountToPay}/${user?.idUser}`,
              data
            );

            getAmountsToPay();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  const deleteAmountToPay = async (idAmountToPay: any) => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            await axios.delete(
              `http://localhost:3000/v1/amounttopay/${idAmountToPay}/${user?.idUser}`
            );

            getAmountsToPay();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
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
        isPending,
        isAuthorized,
      }}
    >
      {children}
    </AmountToPayContext.Provider>
  );
};
