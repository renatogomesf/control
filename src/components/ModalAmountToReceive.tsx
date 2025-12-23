import Input from "./Input";
import Button from "./Button";
import InputDate from "./InputDate";

import { IoClose } from "react-icons/io5";
import { useContext, useLayoutEffect, useState, useTransition } from "react";
import { AmountToReceiveContext } from "../context/AmountToReceiveContext";
import { UserContext } from "../context/UserContext";

export default function ModalAmountToReceive({
  title,
  button,
  setOpenModal,
  amountToReceiveToModal,
  setControlToast,
}: any) {
  const { user } = useContext(UserContext);
  const { createAmountToReceive, updateAmountToReceive } = useContext(
    AmountToReceiveContext
  );

  const [dateInput, setDateInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const [dateAlert, setDateAlert] = useState(false);
  const [nameAlert, setNameAlert] = useState(false);
  const [descriptionAlert, setDescriptionAlert] = useState(false);
  const [valueAlert, setValueAlert] = useState(false);

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    if (amountToReceiveToModal !== null) {
      setDateInput(amountToReceiveToModal.date);
      setNameInput(amountToReceiveToModal.name);
      setDescriptionInput(amountToReceiveToModal.description);
      setValueInput(amountToReceiveToModal.value);
    } else {
      setDateInput("");
      setNameInput("");
      setDescriptionInput("");
      setValueInput("");
    }
  }, [amountToReceiveToModal]);

  const create = (formData: any) => {
    const date = formData.get("date");
    const name = formData.get("name");
    const description = formData.get("description");
    const value = formData.get("value");

    if (!date) {
      setDateAlert(true);
    }

    if (!name) {
      setNameAlert(true);
    }

    if (!description) {
      setDescriptionAlert(true);
    }

    if (!value) {
      setValueAlert(true);
    }

    if (!date || !name || !description || !value || !user?.idUser) {
      return;
    }

    const data = {
      date: date,
      name: name,
      description: description,
      value: value,
      idUser: user?.idUser,
    };

    startTransition(async () => {
      await createAmountToReceive(data).then((response) => {
        if (response == "Valor criado com sucesso!") {
          setControlToast({
            showToast: true,
            type: 1,
            text: "Valor criado com sucesso!",
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

  const update = (formData: any) => {
    const date = formData.get("date");
    const name = formData.get("name");
    const description = formData.get("description");
    const value = formData.get("value");

    if (!date) {
      setDateAlert(true);
    }

    if (!name) {
      setNameAlert(name);
    }

    if (!description) {
      setDescriptionAlert(true);
    }

    if (!value) {
      setValueAlert(true);
    }

    if (!date || !name || !description || !value) {
      return;
    }

    const data = {
      date: date,
      name: name,
      description: description,
      value: value,
    };

    startTransition(async () => {
      await updateAmountToReceive(
        amountToReceiveToModal.idAmountToReceive,
        data
      ).then((response) => {
        if (response == "Valor atualizado com sucesso!") {
          setControlToast({
            showToast: true,
            type: 1,
            text: "Valor atualizado com sucesso!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "Amount to receive not found") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Valor não encontrado!",
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
              title === "Criar novo valor"
                ? create
                : title === "Atualizar valor"
                ? update
                : ""
            }
            className="flex flex-col gap-6"
          >
            <div>
              <InputDate
                type="date"
                className={`w-full ${dateAlert ? "ring-3 ring-red-600" : ""}`}
                label="Data que receberá"
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
                className={`w-full ${nameAlert ? "ring-3 ring-red-600" : ""}`}
                label="Nome"
                name="name"
                defaultValue={nameInput}
                onFocus={() => setNameAlert(false)}
              />
              {nameAlert ? (
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
            {title === "Criar novo valor" ? (
              <Button
                className="mt-6"
                value={button}
                type="submit"
                isPending={isPending}
              />
            ) : title === "Atualizar valor" ? (
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
