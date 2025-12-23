import Input from "./Input";
import Button from "./Button";

import { IoClose } from "react-icons/io5";
import { useContext, useLayoutEffect, useState, useTransition } from "react";
import { GoalContext } from "../context/GoalContext";
import { UserContext } from "../context/UserContext";

export default function ModalGoal({
  title,
  button,
  setOpenModal,
  goalToModal,
  setControlToast,
}: any) {
  const { user } = useContext(UserContext);
  const { createGoal, updateGoal } = useContext(GoalContext);

  const [goalInput, setGoalInput] = useState("");
  const [currentValueInput, setCurrentValueInput] = useState("");
  const [totalValueInput, setTotalValueInput] = useState("");

  const [goalAlert, setGoalAlert] = useState(false);
  const [currentValueAlert, setCurrentValueAlert] = useState(false);
  const [totalValueAlert, setTotalValueAlert] = useState(false);

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    if (goalToModal !== null) {
      setGoalInput(goalToModal.goal);
      setCurrentValueInput(goalToModal.currentValue);
      setTotalValueInput(goalToModal.totalValue);
    } else {
      setGoalInput("");
      setCurrentValueInput("");
      setTotalValueInput("");
    }
  }, [goalToModal]);

  const create = async (formData: any) => {
    const goal = formData.get("goal");
    const currentValue = formData.get("currentValue");
    const totalValue = formData.get("totalValue");

    if (!goal) {
      setGoalAlert(true);
    }

    if (!currentValue) {
      setCurrentValueAlert(true);
    }

    if (!totalValue) {
      setTotalValueAlert(true);
    }

    if (!goal || !currentValue || !totalValue || !user?.idUser) {
      return;
    }

    const data = {
      goal: goal,
      currentValue: currentValue,
      totalValue: totalValue,
      idUser: user?.idUser,
    };

    startTransition(async () => {
      await createGoal(data).then((response) => {
        if (response == "Meta criada com sucesso!") {
          setControlToast({
            showToast: true,
            type: 1,
            text: "Meta criada com sucesso!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "User not found") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Usuário não encontrado!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "All fields are required") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Preencha todos os campos!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "Internal Server Error") {
          setControlToast({
            showToast: true,
            type: 3,
            text: "Erro no servidor!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }
      });
    });
  };

  const update = async (formData: any) => {
    const goal = formData.get("goal");
    const currentValue = formData.get("currentValue");
    const totalValue = formData.get("totalValue");

    if (!goal) {
      setGoalAlert(true);
    }

    if (!currentValue) {
      setCurrentValueAlert(true);
    }

    if (!totalValue) {
      setTotalValueAlert(true);
    }

    if (!goal || !currentValue || !totalValue) {
      return;
    }

    const data = {
      goal: goal,
      currentValue: currentValue,
      totalValue: totalValue,
    };

    startTransition(async () => {
      await updateGoal(goalToModal.idGoal, data).then((response) => {
        if (response == "Meta atualizada com sucesso!") {
          setControlToast({
            showToast: true,
            type: 1,
            text: "Meta atualizada com sucesso!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "Goal not found") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Meta não encontrada!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "All fields are required") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Preencha todos os campos!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "Internal Server Error") {
          setControlToast({
            showToast: true,
            type: 3,
            text: "Erro no servidor!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }
      });
    });

    setOpenModal(false);
  };

  return (
    <>
      <div className="z-10 fixed top-0 left-0 bg-BACKGROUND/70 h-full w-full flex items-center justify-center">
        <div className="bg-PRIMARY p-5 rounded-lg border border-QUATERNARY w-[300px]">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">{title}</h1>
            <IoClose
              className="w-6 h-6 hover:cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>

          <form
            action={
              title === "Criar nova meta"
                ? create
                : title === "Atualizar meta"
                ? update
                : ""
            }
            className="flex flex-col gap-6"
          >
            <div>
              <Input
                type="text"
                className={`w-full ${goalAlert ? "ring-3 ring-red-600" : ""}`}
                label="Meta"
                name="goal"
                defaultValue={goalInput}
                onFocus={() => setGoalAlert(false)}
              />
              {goalAlert ? (
                <p className="absolute text-[0.7rem] mt-1 text-red-600">
                  Campo Obrigatório!
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <Input
                type="number"
                className={`w-full ${
                  currentValueAlert ? "ring-3 ring-red-600" : ""
                }`}
                label="Valor atual"
                name="currentValue"
                defaultValue={currentValueInput}
                onFocus={() => setCurrentValueAlert(false)}
              />
              {currentValueAlert ? (
                <p className="absolute text-[0.7rem] mt-1 text-red-600">
                  Campo Obrigatório!
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <Input
                type="number"
                className={`w-full ${
                  totalValueAlert ? "ring-3 ring-red-600" : ""
                }`}
                label="Valor total"
                name="totalValue"
                defaultValue={totalValueInput}
                onFocus={() => setTotalValueAlert(false)}
              />
              {totalValueAlert ? (
                <p className="absolute text-[0.7rem] mt-1 text-red-600">
                  Campo Obrigatório!
                </p>
              ) : (
                ""
              )}
            </div>
            {title === "Criar nova meta" ? (
              <Button
                className="mt-6"
                value={button}
                type="submit"
                isPending={isPending}
              />
            ) : title === "Atualizar meta" ? (
              <Button
                className="mt-6"
                value={button}
                type="submit"
                isPending={isPending}
              />
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
}
