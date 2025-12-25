import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState, useTransition } from "react";
import Button from "../../components/Button";
import InputSearch from "../../components/InputSearch";
import ModalRevenue from "../../components/ModalRevenue";
import LoadingScreen from "../../components/LoadingScreen";
import Select from "../../components/Select";
import InfoCard from "../../components/InfoCard";
import { MdOutlineFolderOff } from "react-icons/md";

import { RevenueContext } from "../../context/RevenueContext";
import Toast from "../../components/Toast";
import type { ToastDTO } from "../../dtos/ToastDTO";
import Dialog from "../../components/Dialog";

export default function Revenue() {
  const { getRevenues, deleteRevenue, revenues, isAuthorized } =
    useContext(RevenueContext);

  const [controlToast, setControlToast] = useState<ToastDTO>();

  const [isPending, startTransition] = useTransition();

  const [revenuesList, setRevenueList] = useState<any>([]);
  const [selectOption, setSelectOption] = useState("Descrição");

  const [openMenuRow, setOpenMenuRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [revenueToModal, setRevenueToModal] = useState(null);

  const [showDialog, setShowDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [itemToDelete, setItemToDelete] = useState("");

  const searchRevenue = (search: string | number) => {
    const resultSearch = revenues?.filter((e) => {
      switch (selectOption) {
        case "Descrição":
          if (e.description.includes(search as string)) {
            return e;
          }
          break;
        case "Valor":
          if (e.value >= Number(search)) {
            return e;
          }
          break;
      }
    });

    setRevenueList(resultSearch);
  };

  const getSelectOption = (value: any) => {
    setSelectOption(value);
  };

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

  const getAllRevenues = async () => {
    await getRevenues().then((response) => {
      if (response == "Revenue not found") {
        setControlToast({
          showToast: true,
          type: 2,
          text: "Receitas não encontradas!",
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

  useEffect(() => {
    getAllRevenues();
  }, []);

  useEffect(() => {
    setRevenueList(revenues?.reverse());
  }, [revenues]);

  const revenueDelete = async (idGaol: any) => {
    startTransition(async () => {
      await deleteRevenue(idGaol).then((response) => {
        if (response == "Receita deletada com sucesso!") {
          setControlToast({
            showToast: true,
            type: 1,
            text: "Receita deletada com sucesso!",
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response == "Revenue not found") {
          setControlToast({
            showToast: true,
            type: 2,
            text: "Receita não encontrada!",
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

    setShowDialog(false);
  };

  const openDialog = (idRevenue: any, revenue: any) => {
    setShowDialog(true);
    setIdToDelete(idRevenue);
    setItemToDelete(revenue);
    setOpenMenuRow(!openMenuRow);
  };

  const resultSumValue = revenues?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

  const maxValue = () => {
    let values: number[] = [];

    if (revenues?.length == 0) {
      return 0;
    }

    revenues?.map((item) => {
      values.push(item.value);
    });

    return Math.max(...values);
  };

  const minValue = () => {
    let values: number[] = [];

    if (revenues?.length == 0) {
      return 0;
    }

    revenues?.map((item) => {
      values.push(item.value);
    });

    return Math.min(...values);
  };

  return (
    <>
      <Toast
        text={controlToast?.text}
        showToast={controlToast?.showToast}
        type={controlToast?.type}
      />

      <Dialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        action={revenueDelete}
        isPending={isPending}
        idToDelete={idToDelete}
        itemToDelete={itemToDelete}
        table="revenue"
      />

      {isAuthorized ? (
        <div className="text-TERTIARY p-6 max-md:px-2">
          {openModal && (
            <ModalRevenue
              title={titleModal}
              button={buttonModal}
              setOpenModal={setOpenModal}
              revenueToModal={revenueToModal}
              setControlToast={setControlToast}
            />
          )}

          <div className="mb-5 flex items-center justify-between">
            <div className="mr-2">
              <h1 className="text-2xl font-bold">Receitas</h1>
              <p className="font-extralight">
                Confira aqui todas as suas receitas.
              </p>
            </div>
            <div>
              <Button
                value="Criar nova receita"
                type="button"
                onClick={() =>
                  modal("Criar nova receita", "Criar receita", null)
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mb-5 max-sm:flex-row max-sm:flex-nowrap max-sm:overflow-auto">
            <InfoCard
              className=""
              title="Total de receitas"
              text="Quantidade de receitas registradas"
              info={`${revenues?.length} receitas`}
            />

            <InfoCard
              className=""
              title="Valor total das receitas"
              text="Soma de todos os valores"
              info={`R$ ${resultSumValue?.toLocaleString()}`}
            />

            <InfoCard
              className=""
              title="Maior valor"
              text="Maior valor recebido"
              info={`R$ ${maxValue().toLocaleString()}`}
            />

            <InfoCard
              className=""
              title="Menor valor"
              text="Menor valor recebido"
              info={`R$ ${minValue().toLocaleString()}`}
            />
          </div>

          {revenues!.length > 0 ? (
            <div className="border border-QUATERNARY rounded-xl px-5 py-5 w-full bg-PRIMARY max-md:px-2">
              <div className="flex items-center gap-3 max-sm:flex-wrap">
                <Select
                  getSelectOption={getSelectOption}
                  options={["Descrição", "Valor"]}
                />
                <InputSearch
                  className="w-full max-w-[300px] my-4"
                  placeholder="Buscar..."
                  onChange={(e: any) => searchRevenue(e.target.value)}
                />
              </div>
              <div className="border border-QUATERNARY rounded-xl w-full overflow-auto max-h-[70dvh]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-QUATERNARY bg-QUATERNARY">
                      <th className="p-4 text-start sticky top-0 bg-QUATERNARY z-1"></th>
                      <th className="p-4 text-start sticky top-0 bg-QUATERNARY">
                        Quando recebeu
                      </th>
                      <th className="p-4 text-start sticky top-0 bg-QUATERNARY">
                        Descrição
                      </th>
                      <th className="p-4 text-start sticky top-0 bg-QUATERNARY">
                        Valor
                      </th>
                      <th className="p-4 text-start sticky top-0 bg-QUATERNARY">
                        Criado em
                      </th>
                      <th className="p-4 text-start sticky top-0 bg-QUATERNARY">
                        Última atualização
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenuesList?.map((revenue: any, index: any) => {
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
                              className={`flex flex-col gap-2 absolute -top-13 -right-15 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
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
                                onClick={() =>
                                  openDialog(revenue.idRevenue, revenue)
                                }
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
                          <td className="p-4 truncate max-w-[250px]">
                            {revenue.description}
                          </td>
                          <td className="p-4 text-nowrap">
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
            <div className="flex flex-col items-center justify-center h-[55svh]">
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
