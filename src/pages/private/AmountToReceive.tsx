import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import ModalAmountToReceive from "../../components/ModalAmountToReceive";
import LoadingScreen from "../../components/LoadingScreen";
import InputSearch from "../../components/InputSearch";
import Select from "../../components/Select";
import InfoCard from "../../components/InfoCard";
import { MdOutlineFolderOff } from "react-icons/md";

import { AmountToReceiveContext } from "./../../context/AmountToReceiveContext";

export default function AmountToReceive() {
  const {
    getAmountsToReceive,
    deleteAmountToReceive,
    AmountsToReceive,
    isAuthorized,
  } = useContext(AmountToReceiveContext);

  const [amountToReceiveList, setAmountToReceiveList] = useState<any>([]);
  const [selectOption, setSelectOption] = useState("Nome");

  const [openMenuRow, setOpenMenuRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [amountToReceiveToModal, setAmountToReceive] = useState(null);

  const searchAmountToReceive = (search: string | number) => {
    const resultSearch = AmountsToReceive?.filter((e) => {
      switch (selectOption) {
        case "Nome":
          if (e.name.includes(search as string)) {
            return e;
          }
          break;
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

    setAmountToReceiveList(resultSearch);
  };

  const getSelectOption = (value: any) => {
    setSelectOption(value);
  };

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

  useEffect(() => {
    setAmountToReceiveList(AmountsToReceive?.reverse());
  }, [AmountsToReceive]);

  const amountToReceiveDelete = (idAmountToReceive: any) => {
    deleteAmountToReceive(idAmountToReceive);
  };

  const resultSumValue = AmountsToReceive?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

  const maxValue = () => {
    let values: number[] = [];

    AmountsToReceive?.map((item) => {
      values.push(item.value);
    });

    return Math.max(...values);
  };

  const minValue = () => {
    let values: number[] = [];

    AmountsToReceive?.map((item) => {
      values.push(item.value);
    });

    return Math.min(...values);
  };

  return (
    <>
      {isAuthorized ? (
        <div className="text-TERTIARY p-6 h-screen max-md:px-2">
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
                onClick={() => modal("Criar novo valor", "Criar valor", null)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mb-5">
            <InfoCard
              title="Total de valores a receber"
              text="Quantidade de valores registradas"
              info={`${AmountsToReceive?.length} valores`}
            />

            <InfoCard
              title="Valor total a receber"
              text="Soma de todos os valores a receber"
              info={`R$ ${resultSumValue?.toLocaleString()}`}
            />

            <InfoCard
              title="Maior valor"
              text="Maior valor a receber"
              info={`R$ ${maxValue().toLocaleString()}`}
            />

            <InfoCard
              title="Menor valor"
              text="Menor valor a receber"
              info={`R$ ${minValue().toLocaleString()}`}
            />
          </div>

          {AmountsToReceive!.length > 0 ? (
            <div className="border border-QUATERNARY rounded-xl px-10 py-10 w-full bg-PRIMARY max-md:px-2">
              <div className="flex items-center gap-3 max-sm:flex-wrap">
                <Select
                  getSelectOption={getSelectOption}
                  options={["Nome", "Descrição", "Valor"]}
                />
                <InputSearch
                  className="w-full max-w-[300px] my-4"
                  placeholder="Buscar..."
                  onChange={(e: any) => searchAmountToReceive(e.target.value)}
                />
              </div>
              <div className="border border-QUATERNARY rounded-xl w-full overflow-auto">
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
                    {amountToReceiveList?.map(
                      (amountToReceive: any, index: any) => {
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
                                    openMenuRow ===
                                      amountToReceive.idAmountToReceive
                                      ? null
                                      : amountToReceive.idAmountToReceive
                                  )
                                }
                              >
                                <HiDotsVertical className=" w-4 h-4" />
                              </div>

                              <div
                                className={`flex flex-col gap-2 absolute -top-13 -right-15 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
                                  openMenuRow ===
                                  amountToReceive.idAmountToReceive
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
                                  onClick={() =>
                                    amountToReceiveDelete(
                                      amountToReceive.idAmountToReceive
                                    )
                                  }
                                >
                                  <FaTrashAlt className="w-3 h-3" /> Deletar
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              {new Date(amountToReceive.date).getUTCDate() < 10
                                ? `0${new Date(
                                    amountToReceive.date
                                  ).getUTCDate()}`
                                : new Date(amountToReceive.date).getUTCDate()}
                              /
                              {new Date(amountToReceive.date).getUTCMonth() +
                                1 <
                              10
                                ? `0${
                                    new Date(
                                      amountToReceive.date
                                    ).getUTCMonth() + 1
                                  }`
                                : new Date(amountToReceive.date).getUTCMonth() +
                                  1}
                              /{new Date(amountToReceive.date).getUTCFullYear()}
                            </td>
                            <td className="p-4">{amountToReceive.name}</td>
                            <td className="p-4">
                              {amountToReceive.description}
                            </td>
                            <td className="p-4">
                              R$ {amountToReceive.value.toLocaleString()}
                            </td>
                            <td className="p-4">
                              {new Date(
                                amountToReceive.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              {new Date(
                                amountToReceive.updatedAt
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      }
                    )}
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
