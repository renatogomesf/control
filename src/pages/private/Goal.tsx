import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Goal() {
  const [openMenuRow, setOpenMenuRow] = useState<any>(null);

  const goals = [
    {
      idGoal: 11,
      goal: "casa na serra",
      currentValue: 100.55,
      totalValue: 1000000,
      user: 27,
      createdAt: "2025-11-04T18:10:32.921Z",
      updatedAt: "2025-11-04T18:11:49.000Z",
    },
    {
      idGoal: 12,
      goal: "casamento",
      currentValue: 1135.99,
      totalValue: 10000,
      user: 27,
      createdAt: "2025-11-04T18:10:35.308Z",
      updatedAt: "2025-11-04T18:10:35.308Z",
    },
    {
      idGoal: 13,
      goal: "carro",
      currentValue: 145.3,
      totalValue: 80000.05,
      user: 27,
      createdAt: "2025-11-04T18:10:35.308Z",
      updatedAt: "2025-11-04T18:10:35.308Z",
    },
    {
      idGoal: 14,
      goal: "viagem",
      currentValue: 15468,
      totalValue: 235000,
      user: 27,
      createdAt: "2025-11-04T18:10:35.308Z",
      updatedAt: "2025-11-04T18:10:35.308Z",
    },
    {
      idGoal: 15,
      goal: "teste",
      currentValue: 2,
      totalValue: 10,
      user: 27,
      createdAt: "2025-11-04T18:10:35.308Z",
      updatedAt: "2025-11-04T18:10:35.308Z",
    },
    {
      idGoal: 16,
      goal: "vix",
      currentValue: 50679,
      totalValue: 555555,
      user: 27,
      createdAt: "2025-11-04T18:10:35.308Z",
      updatedAt: "2025-11-04T18:10:35.308Z",
    },
    {
      idGoal: 17,
      goal: "sei lá",
      currentValue: 456,
      totalValue: 777,
      user: 27,
      createdAt: "2025-11-04T18:10:35.308Z",
      updatedAt: "2025-11-04T18:10:35.308Z",
    },
  ];

  return (
    <>
      <div className="text-TERTIARY m-3 p-3 rounded-lg">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Metas</h1>
            <p className="font-extralight">
              Confira aqui todas as suas metas e projetos.
            </p>
          </div>
          <div>
            <Button value="Criar nova meta" />
          </div>
        </div>
        <div className="border border-QUATERNARY rounded-xl px-10 py-10 w-full bg-PRIMARY">
          <div className="flex items-center gap-3">
            <Input className="w-[50%] my-4" placeholder="Buscar..." />
          </div>
          <div className="border border-QUATERNARY rounded-xl w-full">
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
                {goals.map((goal, index) => {
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
                              openMenuRow === goal.idGoal ? null : goal.idGoal
                            )
                          }
                        >
                          <HiDotsVertical className=" w-4 h-4" />
                        </div>

                        <div
                          className={`flex flex-col gap-2 absolute top-0 -right-10 z-10 border border-QUATERNARY p-2 rounded-lg bg-SECONDARY ${
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
                          <div className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer">
                            <GrUpdate className="w-3 h-3" /> Atualizar
                          </div>
                          <div className="flex items-center gap-2 px-1.5 rounded-sm hover:bg-PRIMARY hover:cursor-pointer">
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
      </div>
    </>
  );
}
