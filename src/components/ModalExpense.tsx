import Input from "./Input";
import Button from "./Button";
import InputDate from "./InputDate";

import { IoClose } from "react-icons/io5";
import { useContext, useLayoutEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";

export default function ModalExpense({
  title,
  button,
  setOpenModal,
  expenseToModal,
  setControlToast,
}: any) {
  const { user } = useContext(UserContext);
  const { createExpense, updateExpense } = useContext(ExpenseContext);

  const [dateInput, setDateInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const [dateAlert, setDateAlert] = useState(false);
  const [descriptionAlert, setDescriptionAlert] = useState(false);
  const [valueAlert, setValueAlert] = useState(false);

  useLayoutEffect(() => {
    if (expenseToModal !== null) {
      setDateInput(expenseToModal.date);
      setDescriptionInput(expenseToModal.description);
      setValueInput(expenseToModal.value);
    } else {
      setDateInput("");
      setDescriptionInput("");
      setValueInput("");
    }
  }, [expenseToModal]);

  const create = async (formData: any) => {
    const date = formData.get("date");
    const description = formData.get("description");
    const value = formData.get("value");

    if (!date) {
      setDateAlert(true);
    }

    if (!description) {
      setDescriptionAlert(true);
    }

    if (!value) {
      setValueAlert(true);
    }

    if (!date || !description || !value || !user?.idUser) {
      return;
    }

    const data = {
      date: date,
      description: description,
      value: value,
      idUser: user?.idUser,
    };

    await createExpense(data).then((response) => {
      if (response == "Despesa criada com sucesso!") {
        setControlToast({
          showToast: true,
          type: 1,
          text: "Despesa criada com sucesso!",
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
  };

  const update = async (formData: any) => {
    const date = formData.get("date");
    const description = formData.get("description");
    const value = formData.get("value");

    if (!date) {
      setDateAlert(true);
    }

    if (!description) {
      setDescriptionAlert(true);
    }

    if (!value) {
      setValueAlert(true);
    }

    if (!date || !description || !value) {
      return;
    }

    const data = {
      date: date,
      description: description,
      value: value,
    };

    await updateExpense(expenseToModal.idExpense, data).then((response) => {
      if (response == "Despesa atualizada com sucesso!") {
        setControlToast({
          showToast: true,
          type: 1,
          text: "Despesa atualizada com sucesso!",
        });

        setTimeout(() => {
          setControlToast({
            showToast: false,
          });
        }, 4000);
      }

      if (response == "Expense not found") {
        setControlToast({
          showToast: true,
          type: 2,
          text: "Despesa não encontrada!",
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
              title === "Criar nova despesa"
                ? create
                : title === "Atualizar despesa"
                ? update
                : ""
            }
            className="flex flex-col gap-6"
          >
            <div>
              <InputDate
                type="date"
                className={`w-full ${dateAlert ? "ring-3 ring-red-600" : ""}`}
                label="Data da despesa"
                name="date"
                defaultValue={dateInput}
                onFocus={() => setDateAlert(false)}
              />
              {dateAlert ? (
                <p className="absolute text-[0.7rem] mt-1 text-red-600">
                  Campo Obrigatório!
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <Input
                type="text"
                className={`w-full ${
                  descriptionAlert ? "ring-3 ring-red-600" : ""
                }`}
                label="Descrição"
                name="description"
                defaultValue={descriptionInput}
                onFocus={() => setDescriptionAlert(false)}
              />
              {descriptionAlert ? (
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
                className={`w-full ${valueAlert ? "ring-3 ring-red-600" : ""}`}
                label="Valor total"
                name="value"
                defaultValue={valueInput}
                onFocus={() => setValueAlert(false)}
              />
              {valueAlert ? (
                <p className="absolute text-[0.7rem] mt-1 text-red-600">
                  Campo Obrigatório!
                </p>
              ) : (
                ""
              )}
            </div>
            {title === "Criar nova despesa" ? (
              <Button className="mt-6" value={button} type="submit" />
            ) : title === "Atualizar despesa" ? (
              <Button className="mt-6" value={button} type="submit" />
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
}
