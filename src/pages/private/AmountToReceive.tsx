import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ModalAmountToReceive from "../../components/ModalAmountToReceive";
import LoadingScreen from "../../components/LoadingScreen";
import { MdOutlineFolderOff } from "react-icons/md";

import { AmountToReceiveContext } from './../../context/AmountToReceiveContext';

export default function AmountToReceive() {
  const { getAmountsToReceive, deleteAmountToReceive, AmountsToReceive, isAuthorized } =
    useContext(AmountToReceiveContext);

  const [openMenuRow, setOpenMenuRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [amountToReceiveToModal, setAmountToReceive] = useState(null);

  const modal = (title: string, button: string, AmountToReceive?: any) => {
    setOpenModal(true);
    setTitleModal(title);
    setButtonModal(button);
    setOpenMenuRow(!openMenuRow);

    if (AmountToReceive !== null) {
      setAmountToReceive(AmountToReceive);
    } else {
      setAmountToReceive(AmountToReceive);
    }
  };

  useEffect(() => {
    getAmountsToReceive();
  }, []);

  const goalDelete = (idAmountToReceive: any) => {
    deleteAmountToReceive(idAmountToReceive);
  };

  return (
    <>
      {isAuthorized ? (
        <div className="text-TERTIARY p-6 h-screen">
          {openModal && (
            <ModalAmountToReceive
              title={titleModal}
              button={buttonModal}
              setOpenModal={setOpenModal}
              amountToReceiveToModal={amountToReceiveToModal}
            />
          )}

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Valores a receber</h1>
              <p className="font-extralight">
                Confira aqui todos os valores que você tem a receber.
              </p>
            </div>
            <div>
              <Button
                value="Criar novo valor"
                onClick={() =>
                  modal("Criar novo valor", "Criar valor", null)
                }
              />
            </div>
          </div>
          {AmountsToReceive!.length > 0 ? (
            <div className="border border-QUATERNARY rounded-xl px-10 py-10 w-full bg-PRIMARY">
              <div className="flex items-center gap-3">
                <Input className="w-[50%] my-4" placeholder="Buscar..." />
              </div>
              <div className="border border-QUATERNARY rounded-xl w-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-QUATERNARY">
                      <th className="p-4 text-start"></th>
                      <th className="p-4 text-start">Quando receberá</th>
                      <th className="p-4 text-start">Nome</th>
                      <th className="p-4 text-start">Descrição</th>
                      <th className="p-4 text-start">Valor</th>
                      <th className="p-4 text-start">Criado em</th>
                      <th className="p-4 text-start">Última atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AmountsToReceive?.map((amountToReceive, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-t border-QUATERNARY hover:bg-QUATERNARY/40"
                        >
                          <td className="p-4 relative">
                            <div
                              className="flex justify-center items-center px-1 py-1 w-fit hover:bg-BACKGROUND rounded-md hover:cursor-pointer"
                              onClick={() =>
                                setOpenMenuRow(
                                  openMenuRow === amountToReceive.idAmountToReceive
                                    ? null
                                    : amountToReceive.idAmountToReceive
                                )
                              }
                            >
                              <HiDotsVertical className=" w-4 h-4" />
                            </div>

                            <div
                              className={`flex flex-col gap-2 absolute top-0 -right-10 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
                                openMenuRow === amountToReceive.idAmountToReceive
                                  ? "flex"
                                  : "hidden"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <p className="px-1.5">Ações:</p>
                                <IoClose
                                  className="w-5 h-5 hover:bg-PRIMARY hover:cursor-pointer rounded-sm"
                                  onClick={() => setOpenMenuRow(null)}
                                />
                              </div>
                              <div
                                className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer"
                                onClick={() =>
                                  modal(
                                    "Atualizar valor",
                                    "Atualizar",
                                    amountToReceive
                                  )
                                }
                              >
                                <GrUpdate className="w-3 h-3" /> Atualizar
                              </div>
                              <div
                                className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer"
                                onClick={() => goalDelete(amountToReceive.idAmountToReceive)}
                              >
                                <FaTrashAlt className="w-3 h-3" /> Deletar
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {new Date(amountToReceive.date).getUTCDate() < 10
                              ? `0${new Date(amountToReceive.date).getUTCDate()}`
                              : new Date(amountToReceive.date).getUTCDate()}
                            /
                            {new Date(amountToReceive.date).getUTCMonth() + 1 < 10
                              ? `0${new Date(amountToReceive.date).getUTCMonth() + 1}`
                              : new Date(amountToReceive.date).getUTCMonth() + 1}
                            /{new Date(amountToReceive.date).getUTCFullYear()}
                          </td>
                          <td className="p-4">{amountToReceive.name}</td>
                          <td className="p-4">{amountToReceive.description}</td>
                          <td className="p-4">
                            R$ {amountToReceive.value.toLocaleString()}
                          </td>
                          <td className="p-4">
                            {new Date(amountToReceive.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {new Date(amountToReceive.updatedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[90%]">
              <MdOutlineFolderOff className="w-25 h-25" />
              <p>Sem valores a receber!</p>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
