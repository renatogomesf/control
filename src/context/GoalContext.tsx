import { createContext, useState, useTransition, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router";
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
  auth: () => Promise<void> | void;
  setGoals: Dispatch<SetStateAction<Goal[] | null>>;
  isPending: boolean;
  isAuthorized: boolean;
}

export const GoalContext = createContext({} as IGoalContext);

export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [goals, setGoals] = useState<Goal[] | null>([]);
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
        if (
          error.response?.data.message == "Authorization required" ||
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

  const getGoals = async () => {
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    await auth().then(() => {
      if (storedUser && storedToken) {
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
    await auth().then(() => {
      if (storedUser && storedToken) {
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
        auth,
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
