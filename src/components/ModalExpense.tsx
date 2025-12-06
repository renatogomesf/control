import Input from "./Input";
import Button from "./Button";
import InputDate from "./InputDate";

import { IoClose } from "react-icons/io5";
import { useContext, useLayoutEffect, useRef } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";

export default function ModalExpense({
  title,
  button,
  setOpenModal,
  expenseToModal,
}: any) {
  const { user } = useContext(UserContext);
  const { createExpense, updateExpense } = useContext(ExpenseContext);

  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (expenseToModal !== null) {
      dateRef.current!.value = expenseToModal.date;
      descriptionRef.current!.value = expenseToModal.description;
      valueRef.current!.value = expenseToModal.value;

      console.log("data " + expenseToModal.date);
    } else {
      dateRef.current!.value = "";
      descriptionRef.current!.value = "";
      valueRef.current!.value = "";
    }
  }, [expenseToModal]);

  const create = () => {
    const data = {
      date: dateRef.current?.value,
      description: descriptionRef.current?.value,
      value: valueRef.current?.value,
      idUser: user?.idUser,
    };

    createExpense(data);
    setOpenModal(false);
  };

  const update = (idExpense: any) => {
    const data = {
      date: dateRef.current?.value,
      description: descriptionRef.current?.value,
      value: valueRef.current?.value,
    };

    updateExpense(idExpense, data);
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

          <div className="flex flex-col gap-6">
            <InputDate
              ref={dateRef}
              type="date"
              className="w-full"
              label="Data da despesa"
            />
            <Input
              ref={descriptionRef}
              type="text"
              className="w-full"
              label="Descrição"
            />
            <Input
              ref={valueRef}
              type="number"
              className="w-full"
              label="Valor total"
            />
          </div>
          {title === "Criar nova despesa" ? (
            <Button className="mt-6" value={button} onClick={() => create()} />
          ) : title === "Atualizar despesa" ? (
            <Button
              className="mt-6"
              value={button}
              onClick={() => update(expenseToModal.idExpense)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
