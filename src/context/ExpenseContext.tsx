import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import api from "../axios";

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
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [expenses, setExpense] = useState<Expense[] | null>([]);
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

  const getExpenses = async (): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.get(`/v1/expense/${user?.idUser}`, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 200) {
          setExpense(response.data);
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

  const createExpense = async (data: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      try {
        const response = await api.post(`/v1/expense`, data, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 201) {
          message = "Despesa criada com sucesso!";
          getExpenses();
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

  const updateExpense = async (
    idExpense: any,
    data: any
  ): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.put(
          `/v1/expense/${idExpense}/${user?.idUser}`,
          data,
          { headers: { Authorization: storedToken } }
        );

        if (response.data && response.status == 200) {
          message = "Despesa atualizada com sucesso!";
          getExpenses();
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

  const deleteExpense = async (idExpense: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.delete(
          `/v1/expense/${idExpense}/${user?.idUser}`,
          { headers: { Authorization: storedToken } }
        );

        if (response.data && response.status == 200) {
          message = "Despesa deletada com sucesso!";
          getExpenses();
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
