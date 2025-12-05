import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ModalRevenue from "../../components/ModalRevenue";
import LoadingScreen from "../../components/LoadingScreen";
import { MdOutlineFolderOff } from "react-icons/md";

import { RevenueContext } from "../../context/RevenueContext";

export default function Revenue() {
  const { getRevenues, deleteRevenue, revenues, isAuthorized } =
    useContext(RevenueContext);

  const [openMenuRow, setOpenMenuRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [revenueToModal, setRevenueToModal] = useState(null);

  const modal = (title: string, button: string, revenue?: any) => {
    setOpenModal(true);
    setTitleModal(title);
    setButtonModal(button);
    setOpenMenuRow(!openMenuRow);

    if (revenue !== null) {
      setRevenueToModal(revenue);
    } else {
      setRevenueToModal(revenue);
    }
  };

  useEffect(() => {
    getRevenues();
  }, []);

  const goalDelete = (idGaol: any) => {
    deleteRevenue(idGaol);
  };

  return (
    <>
      {isAuthorized ? (
        <div className="text-TERTIARY p-6 h-screen">
          {openModal && (
            <ModalRevenue
              title={titleModal}
              button={buttonModal}
              setOpenModal={setOpenModal}
              revenueToModal={revenueToModal}
            />
          )}

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Receitas</h1>
              <p className="font-extralight">
                Confira aqui todas as suas receitas.
              </p>
            </div>
            <div>
              <Button
                value="Criar nova receita"
                onClick={() =>
                  modal("Criar nova receita", "Criar receita", null)
                }
              />
            </div>
          </div>
          {revenues!.length > 0 ? (
            <div className="border border-QUATERNARY rounded-xl px-10 py-10 w-full bg-PRIMARY">
              <div className="flex items-center gap-3">
                <Input className="w-[50%] my-4" placeholder="Buscar..." />
              </div>
              <div className="border border-QUATERNARY rounded-xl w-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-QUATERNARY">
                      <th className="p-4 text-start"></th>
                      <th className="p-4 text-start">Quando recebeu</th>
                      <th className="p-4 text-start">Descrição</th>
                      <th className="p-4 text-start">Valor</th>
                      <th className="p-4 text-start">Criado em</th>
                      <th className="p-4 text-start">Última atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenues?.map((revenue, index) => {
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
                                  openMenuRow === revenue.idRevenue
                                    ? null
                                    : revenue.idRevenue
                                )
                              }
                            >
                              <HiDotsVertical className=" w-4 h-4" />
                            </div>

                            <div
                              className={`flex flex-col gap-2 absolute top-0 -right-10 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
                                openMenuRow === revenue.idRevenue
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
                                    "Atualizar receita",
                                    "Atualizar",
                                    revenue
                                  )
                                }
                              >
                                <GrUpdate className="w-3 h-3" /> Atualizar
                              </div>
                              <div
                                className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer"
                                onClick={() => goalDelete(revenue.idRevenue)}
                              >
                                <FaTrashAlt className="w-3 h-3" /> Deletar
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {new Date(revenue.date).getUTCDate() < 10
                              ? `0${new Date(revenue.date).getUTCDate()}`
                              : new Date(revenue.date).getUTCDate()}
                            /
                            {new Date(revenue.date).getUTCMonth() + 1 < 10
                              ? `0${new Date(revenue.date).getUTCMonth() + 1}`
                              : new Date(revenue.date).getUTCMonth() + 1}
                            /{new Date(revenue.date).getUTCFullYear()}
                          </td>
                          <td className="p-4">{revenue.description}</td>
                          <td className="p-4">
                            R$ {revenue.value.toLocaleString()}
                          </td>
                          <td className="p-4">
                            {new Date(revenue.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {new Date(revenue.updatedAt).toLocaleDateString()}
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
              <p>Sem receita!</p>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
