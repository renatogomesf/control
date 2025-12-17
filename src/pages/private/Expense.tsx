import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import InputSearch from "../../components/InputSearch";
import ModalExpense from "../../components/ModalExpense";
import LoadingScreen from "../../components/LoadingScreen";
import Select from "../../components/Select";
import InfoCard from "../../components/InfoCard";
import { MdOutlineFolderOff } from "react-icons/md";

import { ExpenseContext } from "../../context/ExpenseContext";

export default function Expense() {
  const { getExpenses, deleteExpense, expenses, isAuthorized } =
    useContext(ExpenseContext);

  const [expenseList, setExpenseList] = useState<any>([]);
  const [selectOption, setSelectOption] = useState("Descrição");

  const [openMenuRow, setOpenMenuRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [expenseToModal, setExpenseToModal] = useState(null);

  const searchExpense = (search: string | number) => {
    const resultSearch = expenses?.filter((e) => {
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

    setExpenseList(resultSearch);
  };

  const getSelectOption = (value: any) => {
    setSelectOption(value);
  };

  const modal = (title: string, button: string, expense?: any) => {
    setOpenModal(true);
    setTitleModal(title);
    setButtonModal(button);
    setOpenMenuRow(!openMenuRow);

    if (expense !== null) {
      setExpenseToModal(expense);
    } else {
      setExpenseToModal(expense);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    setExpenseList(expenses?.reverse());
  }, [expenses]);

  const expenseDelete = (idExpense: any) => {
    deleteExpense(idExpense);
  };

  const resultSumValue = expenses?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

  const maxValue = () => {
    let values: number[] = [];

    if (expenses?.length == 0) {
      return 0;
    }

    expenses?.map((item) => {
      values.push(item.value);
    });

    return Math.max(...values);
  };

  const minValue = () => {
    let values: number[] = [];

    if (expenses?.length == 0) {
      return 0;
    }

    expenses?.map((item) => {
      values.push(item.value);
    });

    return Math.min(...values);
  };

  return (
    <>
      {isAuthorized ? (
        <div className="text-TERTIARY p-6 max-md:px-2">
          {openModal && (
            <ModalExpense
              title={titleModal}
              button={buttonModal}
              setOpenModal={setOpenModal}
              expenseToModal={expenseToModal}
            />
          )}

          <div className="mb-5 flex items-center justify-between">
            <div className="mr-2">
              <h1 className="text-2xl font-bold">Despesas</h1>
              <p className="font-extralight">
                Confira aqui todas as suas despesas.
              </p>
            </div>
            <div>
              <Button
                value="Criar nova despesa"
                onClick={() =>
                  modal("Criar nova despesa", "Criar despesa", null)
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mb-5">
            <InfoCard
              title="Total de despesas"
              text="Quantidade de despesas registradas"
              info={`${expenses?.length} despesas`}
            />

            <InfoCard
              title="Valor total das despesas"
              text="Soma de todos os valores"
              info={`R$ ${resultSumValue?.toLocaleString()}`}
            />

            <InfoCard
              title="Maior valor"
              text="Maior valor gasto"
              info={`R$ ${maxValue().toLocaleString()}`}
            />

            <InfoCard
              title="Menor valor"
              text="Menor valor gasto"
              info={`R$ ${minValue().toLocaleString()}`}
            />
          </div>

          {expenses!.length > 0 ? (
            <div className="border border-QUATERNARY rounded-xl px-10 py-10 w-full bg-PRIMARY max-md:px-2">
              <div className="flex items-center gap-3 max-sm:flex-wrap">
                <Select
                  getSelectOption={getSelectOption}
                  options={["Descrição", "Valor"]}
                />
                <InputSearch
                  className="w-full max-w-[300px] my-4"
                  placeholder="Buscar..."
                  onChange={(e: any) => searchExpense(e.target.value)}
                />
              </div>
              <div className="border border-QUATERNARY rounded-xl w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-QUATERNARY">
                      <th className="p-4 text-start"></th>
                      <th className="p-4 text-start">Quando gastou</th>
                      <th className="p-4 text-start">Descrição</th>
                      <th className="p-4 text-start">Valor</th>
                      <th className="p-4 text-start">Criado em</th>
                      <th className="p-4 text-start">Última atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseList?.map((expense: any, index: any) => {
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
                                  openMenuRow === expense.idExpense
                                    ? null
                                    : expense.idExpense
                                )
                              }
                            >
                              <HiDotsVertical className=" w-4 h-4" />
                            </div>

                            <div
                              className={`flex flex-col gap-2 absolute -top-13 -right-15 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
                                openMenuRow === expense.idExpense
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
                                    "Atualizar despesa",
                                    "Atualizar",
                                    expense
                                  )
                                }
                              >
                                <GrUpdate className="w-3 h-3" /> Atualizar
                              </div>
                              <div
                                className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer"
                                onClick={() => expenseDelete(expense.idExpense)}
                              >
                                <FaTrashAlt className="w-3 h-3" /> Deletar
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {new Date(expense.date).getUTCDate() < 10
                              ? `0${new Date(expense.date).getUTCDate()}`
                              : new Date(expense.date).getUTCDate()}
                            /
                            {new Date(expense.date).getUTCMonth() + 1 < 10
                              ? `0${new Date(expense.date).getUTCMonth() + 1}`
                              : new Date(expense.date).getUTCMonth() + 1}
                            /{new Date(expense.date).getUTCFullYear()}
                          </td>
                          <td className="p-4">{expense.description}</td>
                          <td className="p-4">
                            R$ {expense.value.toLocaleString()}
                          </td>
                          <td className="p-4">
                            {new Date(expense.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {new Date(expense.updatedAt).toLocaleDateString()}
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
              <p>Sem despesa!</p>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
