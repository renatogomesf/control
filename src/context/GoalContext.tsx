import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import api from "../axios";

type Goal = {
  idGoal: number;
  goal: string;
  currentValue: number;
  totalValue: number;
  user: number;
  createdAt: Date;
  updatedAt: Date;
};

interface IGoalContext {
  goals: Goal[] | null;
  getGoals: () => Promise<string | void>;
  createGoal: (data: any) => Promise<string | void>;
  updateGoal: (idGoal: any, data: any) => Promise<string | void>;
  deleteGoal: (idGoal: any) => Promise<string | void>;
  setGoals: Dispatch<SetStateAction<Goal[] | null>>;
  isAuthorized: boolean;
}

export const GoalContext = createContext({} as IGoalContext);

export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [goals, setGoals] = useState<Goal[] | null>([]);
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

  const getGoals = async (): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.get(`/v1/goal/${user?.idUser}`, {
          headers: { Authorization: storedToken },
        });
        if (response.data && response.status == 200) {
          setGoals(response.data);
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

  const createGoal = async (data: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      try {
        const response = await api.post(`/v1/goal`, data, {
          headers: { Authorization: storedToken },
        });

        if (response.data && response.status == 201) {
          message = "Meta criada com sucesso!";
          getGoals();
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

  const updateGoal = async (idGoal: any, data: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.put(
          `/v1/goal/${idGoal}/${user?.idUser}`,
          data,
          { headers: { Authorization: storedToken } }
        );

        if (response.data && response.status == 200) {
          message = "Meta atualizada com sucesso!";
          getGoals();
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

  const deleteGoal = async (idGoal: any): Promise<string | void> => {
    let message: string = "";

    if (storedUser && storedToken) {
      let user = JSON.parse(storedUser);

      try {
        const response = await api.delete(
          `/v1/goal/${idGoal}/${user?.idUser}`,
          { headers: { Authorization: storedToken } }
        );

        if (response.data && response.status == 200) {
          message = "Meta deletada com sucesso!";
          getGoals();
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
    <GoalContext.Provider
      value={{
        getGoals,
        createGoal,
        updateGoal,
        deleteGoal,
        setGoals,
        goals,
        isAuthorized,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
