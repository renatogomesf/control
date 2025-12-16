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
  getGoals: () => Promise<void> | void;
  createGoal: (data: any) => Promise<void> | void;
  updateGoal: (idGoal: any, data: any) => Promise<void> | void;
  deleteGoal: (idGoal: any) => Promise<void> | void;
  setGoals: Dispatch<SetStateAction<Goal[] | null>>;
  isPending: boolean;
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
  const [isPending, startTransition] = useTransition();

  const getGoals = async () => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/v1/goal/${user?.idUser}`
            );
            setGoals(response.data);
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

  const createGoal = async (data: any) => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        startTransition(async () => {
          try {
            await axios.post(`http://localhost:3000/v1/goal`, data);

            getGoals();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  const updateGoal = async (idGoal: any, data: any) => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            await axios.put(
              `http://localhost:3000/v1/goal/${idGoal}/${user?.idUser}`,
              data
            );

            getGoals();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
  };

  const deleteGoal = async (idGoal: any) => {
    await auth().then((isAuth) => {
      if (storedUser && storedToken && isAuth) {
        let user = JSON.parse(storedUser);

        startTransition(async () => {
          try {
            await axios.delete(
              `http://localhost:3000/v1/goal/${idGoal}/${user?.idUser}`
            );

            getGoals();
            setIsAuthorized(true);
          } catch (error: any) {
            console.log(error.response);
          }
        });
      }
    });
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
        isPending,
        isAuthorized,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
