import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
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
  const { auth } = useContext(AuthContext);

  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [goals, setGoals] = useState<Goal[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getGoals = async (): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await api.get(`/v1/goal/${user?.idUser}`);
          if (response.data && response.status == 200) {
            setGoals(response.data);
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

  const createGoal = async (data: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        try {
          const response = await api.post(`/v1/goal`, data);

          if (response.data && response.status == 201) {
            message = "Meta criada com sucesso!";
            getGoals();
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

  const updateGoal = async (idGoal: any, data: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await api.put(
            `/v1/goal/${idGoal}/${user?.idUser}`,
            data
          );

          if (response.data && response.status == 200) {
            message = "Meta atualizada com sucesso!";
            getGoals();
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

  const deleteGoal = async (idGoal: any): Promise<string | void> => {
    const response = await auth().then(async (isAuth) => {
      let message: string = "";

      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        try {
          const response = await api.delete(
            `/v1/goal/${idGoal}/${user?.idUser}`
          );

          if (response.data && response.status == 200) {
            message = "Meta deletada com sucesso!";
            getGoals();
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
