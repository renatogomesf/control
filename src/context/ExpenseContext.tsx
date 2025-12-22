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
  getExpenses: () => Promise<string | void>;
  createExpense: (data: any) => Promise<string | void>;
  updateExpense: (idExpense: any, data: any) => Promise<string | void>;
  deleteExpense: (idExpense: any) => Promise<string | void>;
  setExpense: Dispatch<SetStateAction<Expense[] | null>>;
  isAuthorized: boolean;
}

export const ExpenseContext = createContext({} as IExpenseContext);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [expenses, setExpense] = useState<Expense[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getExpenses = async (): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.get(
            `http://localhost:3000/v1/expense/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            setExpense(response.data);
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

  const createExpense = async (data: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        try {
          const response = await axios.post(
            `http://localhost:3000/v1/expense`,
            data
          );

          if (response.data && response.status == 201) {
            message = "Despesa criada com sucesso!";
            getExpenses();
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

  const updateExpense = async (
    idExpense: any,
    data: any
  ): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.put(
            `http://localhost:3000/v1/expense/${idExpense}/${user?.idUser}`,
            data
          );

          if (response.data && response.status == 200) {
            message = "Despesa atualizada com sucesso!";
            getExpenses();
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

  const deleteExpense = async (idExpense: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await axios.delete(
            `http://localhost:3000/v1/expense/${idExpense}/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            message = "Despesa deletada com sucesso!";
            getExpenses();
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
    <ExpenseContext.Provider
      value={{
        getExpenses,
        createExpense,
        updateExpense,
        deleteExpense,
        setExpense,
        expenses,
        isAuthorized,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
