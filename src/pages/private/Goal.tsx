import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import InputSearch from "../../components/InputSearch";
import ModalGoal from "../../components/ModalGoal";
import LoadingScreen from "../../components/LoadingScreen";
import Select from "../../components/Select";
import InfoCard from "../../components/InfoCard";
import { MdOutlineFolderOff } from "react-icons/md";

import { GoalContext } from "../../context/GoalContext";

export default function Goal() {
  const { getGoals, deleteGoal, goals, isAuthorized } = useContext(GoalContext);

  const [goalsList, setGoalList] = useState<any>([]);
  const [selectOption, setSelectOption] = useState("Metas");

  const [openMenuRow, setOpenMenuRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [goalToUpdateModal, setGoalToUpdateModal] = useState(null);

  const searchGoal = (search: string | number) => {
    const resultSearch = goals?.filter((e) => {
      switch (selectOption) {
        case "Metas":
          if (e.goal.includes(search as string)) {
            return e;
          }
          break;
        case "Valor atual":
          if (e.currentValue >= Number(search)) {
            return e;
          }
          break;
        case "Valor total":
          if (e.totalValue >= Number(search)) {
            return e;
          }
          break;
      }
    });

    setGoalList(resultSearch);
  };

  const getSelectOption = (value: any) => {
    setSelectOption(value);
  };

  const modal = (title: string, button: string, goalToUpdate?: any) => {
    setOpenModal(true);
    setTitleModal(title);
    setButtonModal(button);
    setOpenMenuRow(!openMenuRow);

    if (goalToUpdate !== null) {
      setGoalToUpdateModal(goalToUpdate);
    } else {
      setGoalToUpdateModal(null);
    }
  };

  useEffect(() => {
    getGoals();
  }, []);

  useEffect(() => {
    setGoalList(goals?.reverse());
  }, [goals]);

  const goalDelete = (idGaol: any) => {
    deleteGoal(idGaol);
  };

  const resultSumCurrentValue = goals?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.currentValue,
    0
  );

  const resultSumTotlaValue = goals?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalValue,
    0
  );

  const avgGoal = () => {
    if (resultSumTotlaValue == 0) {
      return 0;
    }

    return (Number(resultSumCurrentValue) / Number(resultSumTotlaValue)) * 100;
  };

  return (
    <>
      {isAuthorized ? (
        <div className="text-TERTIARY p-6 h-screen max-md:px-2">
          {openModal && (
            <ModalGoal
              title={titleModal}
              button={buttonModal}
              setOpenModal={setOpenModal}
              goalToUpdateModal={goalToUpdateModal}
            />
          )}

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Metas</h1>
              <p className="font-extralight">
                Confira aqui todas as suas metas e projetos.
              </p>
            </div>
            <div>
              <Button
                value="Criar nova meta"
                onClick={() => modal("Criar nova meta", "Criar meta", null)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mb-5">
            <InfoCard
              title="Total de metas"
              text="Quantidade de metas registradas"
              info={`${goals?.length} metas`}
            />

            <InfoCard
              title="Valo atual geral"
              text="Soma de todos os valores atuais"
              info={`R$ ${resultSumCurrentValue?.toLocaleString()}`}
            />

            <InfoCard
              title="Valo total geral"
              text="Soma de todos os valores totais"
              info={`R$ ${resultSumTotlaValue?.toLocaleString()}`}
            />

            <InfoCard
              title="Progesso geral"
              text="Indica o quanto do valor total das metas foi cumprido"
              info={
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xl font-bold text-nowrap">
                    {avgGoal().toFixed(2)} %
                  </span>
                  <div className="w-full max-w-[200px] h-2 border rounded-full">
                    <div
                      className="h-full bg-TERTIARY"
                      style={{
                        width: `${avgGoal().toFixed(2)}%`,
                        maxWidth: "100%",
                      }}
                    ></div>
                  </div>
                </div>
              }
            />
          </div>

          {goals!.length > 0 ? (
            <div className="border border-QUATERNARY rounded-xl px-5 py-5 w-full bg-PRIMARY max-md:px-2">
              <div className="flex items-center gap-3 max-sm:flex-wrap">
                <Select
                  getSelectOption={getSelectOption}
                  options={["Metas", "Valor atual", "Valor total"]}
                />
                <InputSearch
                  className="w-full max-w-[300px] my-4"
                  placeholder="Buscar..."
                  onChange={(e: any) => searchGoal(e.target.value)}
                />
              </div>
              <div className="border border-QUATERNARY rounded-xl w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-QUATERNARY">
                      <th className="p-4 text-start"></th>
                      <th className="p-4 text-start">Meta</th>
                      <th className="p-4 text-start">Valor atual</th>
                      <th className="p-4 text-start">Valor total</th>
                      <th className="p-4 text-start">Criado em</th>
                      <th className="p-4 text-start">Última atualização</th>
                      <th className="p-4 text-start">Progesso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goalsList?.map((goal: any, index: any) => {
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
                                  openMenuRow === goal.idGoal
                                    ? null
                                    : goal.idGoal
                                )
                              }
                            >
                              <HiDotsVertical className=" w-4 h-4" />
                            </div>

                            <div
                              className={`flex flex-col gap-2 absolute -top-13 -right-15 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
                                openMenuRow === goal.idGoal ? "flex" : "hidden"
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
                                  modal("Atualizar meta", "Atualizar", goal)
                                }
                              >
                                <GrUpdate className="w-3 h-3" /> Atualizar
                              </div>
                              <div
                                className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer"
                                onClick={() => goalDelete(goal.idGoal)}
                              >
                                <FaTrashAlt className="w-3 h-3" /> Deletar
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{goal.goal}</td>
                          <td className="p-4">
                            R$ {goal.currentValue.toLocaleString()}
                          </td>
                          <td className="p-4">
                            R$ {goal.totalValue.toLocaleString()}
                          </td>
                          <td className="p-4">
                            {new Date(goal.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {new Date(goal.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 w-[200px] flex items-center gap-3">
                            <span className="w-[100px]">
                              {(
                                (goal.currentValue / goal.totalValue) *
                                100
                              ).toFixed(2)}
                              %
                            </span>
                            <div className="w-full h-2 border rounded-full">
                              <div
                                className="h-full bg-TERTIARY"
                                style={{
                                  width: `${
                                    (goal.currentValue / goal.totalValue) * 100
                                  }%`,
                                  maxWidth: "100%",
                                }}
                              ></div>
                            </div>
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
              <p>Sem metas!</p>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
