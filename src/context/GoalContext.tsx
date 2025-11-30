import { createContext, useContext, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./UserContext";
import axios from "axios";

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
  token?: string;
  getGoals: () => Promise<void> | void;
  createGoal: (data: any) => Promise<void> | void;
  updateGoal: (idGoal: any, data: any) => Promise<void> | void;
  deleteGoal: (idGoal: any) => Promise<void> | void;
  isPending: boolean;
  isAuthorized: boolean;
}

export const GoalContext = createContext({} as IGoalContext);

export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const { user, token } = useContext(UserContext);

  const [goals, setGoals] = useState<Goal[] | null>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getGoals = async () => {
    if (!user || !token) {
      navigation("/login");
    }

    startTransition(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/goal/${user?.idUser}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setGoals(response.data);
        setIsAuthorized(true);
      } catch (error: any) {
        console.log(error.response);

        if (
          error.response?.data.message == "Authorization required" ||
          error.response?.data.message == undefined
        ) {
          setIsAuthorized(false);
          navigation("/login");
        }
      }
    });
  };

  const createGoal = async (data: any) => {
    if (!user || !token) {
      return navigation("/login");
    }

    startTransition(async () => {
      try {
        await axios.post(`http://localhost:3000/v1/goal`, data, {
          headers: {
            authorization: token,
          },
        });

        getGoals();
        setIsAuthorized(true);
      } catch (error: any) {
        console.log(error.response);

        if (
          error.response?.data.message == "Authorization required" ||
          error.response?.data.message == undefined
        ) {
          setIsAuthorized(false);
          navigation("/login");
        }
      }
    });
  };

  const updateGoal = async (idGoal: any, data: any) => {
    if (!user || !token) {
      return navigation("/login");
    }

    startTransition(async () => {
      try {
        await axios.put(
          `http://localhost:3000/v1/goal/${idGoal}/${user?.idUser}`,
          data,
          {
            headers: {
              authorization: token,
            },
          }
        );

        getGoals();
        setIsAuthorized(true);
      } catch (error: any) {
        console.log(error.response);

        if (
          error.response?.data.message == "Authorization required" ||
          error.response?.data.message == undefined
        ) {
          setIsAuthorized(false);
          navigation("/login");
        }
      }
    });
  };

  const deleteGoal = async (idGoal: any) => {
    if (!user || !token) {
      return navigation("/login");
    }

    startTransition(async () => {
      try {
        await axios.delete(
          `http://localhost:3000/v1/goal/${idGoal}/${user?.idUser}`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        getGoals();
        setIsAuthorized(true);
      } catch (error: any) {
        console.log(error.response);

        if (
          error.response?.data.message == "Authorization required" ||
          error.response?.data.message == undefined
        ) {
          setIsAuthorized(false);
          navigation("/login");
        }
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
        goals,
        isPending,
        isAuthorized,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
