import Input from "./Input";
import Button from "./Button";
import InputDate from "./InputDate";

import { IoClose } from "react-icons/io5";
import { useContext, useLayoutEffect, useRef } from "react";
import { AmountToReceiveContext } from "../context/AmountToReceiveContext";
import { UserContext } from "../context/UserContext";

export default function ModalAmountToReceive({
  title,
  button,
  setOpenModal,
  amountToReceiveToModal,
}: any) {
  const { user } = useContext(UserContext);
  const { createAmountToReceive, updateAmountToReceive } = useContext(AmountToReceiveContext);

  const dateRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (amountToReceiveToModal !== null) {
      dateRef.current!.value = amountToReceiveToModal.date;
      nameRef.current!.value = amountToReceiveToModal.name;
      descriptionRef.current!.value = amountToReceiveToModal.description;
      valueRef.current!.value = amountToReceiveToModal.value;

      console.log("data " + amountToReceiveToModal.date);
    } else {
      dateRef.current!.value = "";
      nameRef.current!.value = ""
      descriptionRef.current!.value = "";
      valueRef.current!.value = "";
    }
  }, [amountToReceiveToModal]);

  const create = () => {
    const data = {
      date: dateRef.current?.value,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      value: valueRef.current?.value,
      idUser: user?.idUser,
    };

    createAmountToReceive(data);
    setOpenModal(false);
  };

  const update = (idAmountToReceive: any) => {
    const data = {
      date: dateRef.current?.value,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      value: valueRef.current?.value,
    };

    updateAmountToReceive(idAmountToReceive, data);
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
              label="Data que receberá"
            />
            <Input
              ref={nameRef}
              type="text"
              className="w-full"
              label="Nome"
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
          {title === "Criar novo valor" ? (
            <Button className="mt-6" value={button} onClick={() => create()} />
          ) : title === "Atualizar valor" ? (
            <Button
              className="mt-6"
              value={button}
              onClick={() => update(amountToReceiveToModal.idAmountToReceive)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
