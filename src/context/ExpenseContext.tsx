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

type Expense = {
  idExpense: number;
  date: string;
  description: string;
  value: number;
  user: number;
  createdAt: Date;
  updatedAt: Date;
};

interface IExpenseContext {
  expenses: Expense[] | null;
  getExpenses: () => Promise<void> | void;
  createExpense: (data: any) => Promise<void> | void;
  updateExpense: (idExpense: any, data: any) => Promise<void> | void;
  deleteExpense: (idExpense: any) => Promise<void> | void;
  setExpense: Dispatch<SetStateAction<Expense[] | null>>;
  isPending: boolean;
  isAuthorized: boolean;
}

export const ExpenseContext = createContext({} as IExpenseContext);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth, isAuth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [expenses, setExpense] = useState<Expense[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPending, startTransition] = useTransition();

  // const auth = async () => {
  //   if (storedToken) {
  //     let token = storedToken;

  //     try {
  //       const response = await axios.get(`http://localhost:3000/auth`, {
  //         headers: {
  //           authorization: token,
  //         },
  //       });

  //       console.log(response);

  //       if (response.status == 200 && response.data.message === "Authorized") {
  //         setIsAuthorized(true);
  //       } else if (
  //         response.status == 401 &&
  //         response.data.message === "Unauthorized"
  //       ) {
  //         setIsAuthorized(false);
  //         navigation("/login");
  //       }
  //     } catch (error: any) {
  //       console.log(error.response.data.message.name);

  //       if (
  //         (error.response.status == 401 &&
  //           error.response?.data.message == "Authorization required") ||
  //         (error.response.status == 401 &&
  //           error.response.data.message === "Unauthorized") ||
  //         (error.response.status == 401 &&
  //           error.response.data.message.name === "TokenExpiredError") ||
  //         error.response?.data.message == undefined
  //       ) {
  //         setIsAuthorized(false);
  //         navigation("/login");
  //       }
  //     }
  //   } else {
  //     navigation("/login");
  //   }
  // };

  const getExpenses = async () => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      let user = JSON.parse(storedUser);

      startTransition(async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/v1/expense/${user?.idUser}`
          );
          setExpense(response.data);
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response.data);
        }
      });
    } else {
      navigation("/login");
    }
  };

  const createExpense = async (data: any) => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      startTransition(async () => {
        try {
          await axios.post(`http://localhost:3000/v1/expense`, data);

          getExpenses();
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response);
        }
      });
    }
  };

  const updateExpense = async (idExpense: any, data: any) => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      let user = JSON.parse(storedUser);

      startTransition(async () => {
        try {
          await axios.put(
            `http://localhost:3000/v1/expense/${idExpense}/${user?.idUser}`,
            data
          );

          getExpenses();
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response);
        }
      });
    }
  };

  const deleteExpense = async (idExpense: any) => {
    await auth();

    if (storedUser && storedToken && isAuth) {
      let user = JSON.parse(storedUser);

      startTransition(async () => {
        try {
          await axios.delete(
            `http://localhost:3000/v1/expense/${idExpense}/${user?.idUser}`
          );

          getExpenses();
          setIsAuthorized(true);
        } catch (error: any) {
          console.log(error.response);
        }
      });
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        getExpenses,
        createExpense,
        updateExpense,
        deleteExpense,
        setExpense,
        expenses,
        isPending,
        isAuthorized,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
