import Input from "./Input";
import Button from "./Button";

import { IoClose } from "react-icons/io5";
import { useLayoutEffect, useRef } from "react";

export default function ModalGoal({
  title,
  button,
  setOpenModal,
  goalToUpdateModal,
}: any) {
  const goalRef = useRef<HTMLInputElement>(null);
  const currentValueRef = useRef<HTMLInputElement>(null);
  const totalValueRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (goalToUpdateModal !== null) {
      goalRef.current!.value = goalToUpdateModal.goal;
      currentValueRef.current!.value = goalToUpdateModal.currentValue;
      totalValueRef.current!.value = goalToUpdateModal.totalValue;
    } else {
      goalRef.current!.value = "";
      currentValueRef.current!.value = "";
      totalValueRef.current!.value = "";
    }
  }, [goalToUpdateModal]);

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
            <Input ref={goalRef} type="text" className="w-full" label="Meta" />
            <Input
              ref={currentValueRef}
              type="number"
              className="w-full"
              label="Valor atual"
            />
            <Input
              ref={totalValueRef}
              type="number"
              className="w-full"
              label="valor total"
            />
          </div>
          <Button
            className="mt-6"
            value={button}
            onClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </>
  );
}
