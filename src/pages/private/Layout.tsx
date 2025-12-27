import { NavLink, Outlet, useNavigate } from "react-router";
import { LuGoal } from "react-icons/lu";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { CgMenuRound, CgCloseO } from "react-icons/cg";

import { useContext, useState } from "react";
import { UserContext } from "./../../context/UserContext";
import { FiLogOut } from "react-icons/fi";
import { GoalContext } from "../../context/GoalContext";
import { RevenueContext } from "../../context/RevenueContext";
import { ExpenseContext } from "../../context/ExpenseContext";
import { AmountToReceiveContext } from "../../context/AmountToReceiveContext";
import { AmountToPayContext } from "./../../context/AmountToPayContext";
import ControlSVG from "../../components/IconControl";

export default function Layout() {
  const { user } = useContext(UserContext);
  const { setGoals } = useContext(GoalContext);
  const { setRevenue } = useContext(RevenueContext);
  const { setExpense } = useContext(ExpenseContext);
  const { setAmountToReceive } = useContext(AmountToReceiveContext);
  const { setAmountToPay } = useContext(AmountToPayContext);

  const [openMenu, setOpenMenu] = useState(false);

  const navigation = useNavigate();

  const iconStyle = "w-[20px] h-[20px]";

  const linksPersonal = [
    {
      link: "goal",
      title: "Metas",
      icon: <LuGoal className={`${iconStyle}`} />,
    },
    {
      link: "revenue",
      title: "Receita",
      icon: <FaArrowTrendUp className={`${iconStyle}`} />,
    },
    {
      link: "expense",
      title: "Despesas",
      icon: <FaArrowTrendDown className={`${iconStyle}`} />,
    },
  ];

  const linksInterpersonal = [
    {
      link: "amounttoreceive",
      title: "Valores a receber",
      icon: <GiReceiveMoney className={`${iconStyle}`} />,
    },
    {
      link: "amounttopay",
      title: "Valores a pagar",
      icon: <GiPayMoney className={`${iconStyle}`} />,
    },
  ];

  const style = "flex items-center gap-3 px-5 py-1 w-full rounded-lg";

  const logout = () => {
    localStorage.clear();

    navigation("/");

    setGoals([]);
    setRevenue([]);
    setExpense([]);
    setAmountToReceive([]);
    setAmountToPay([]);
  };

  return (
    <>
      <div className="h-screen flex">
        <div
          className={`fixed z-2 bg-BACKGROUND/70 w-full h-screen md:hidden ${
            openMenu
              ? "max-md:opacity-100 max-md:fixed"
              : "max-md:opacity-0 max-md:hidden"
          }`}
        ></div>

        <div className="text-TERTIARY fixed flex justify-between items-center px-2 bg-PRIMARY w-full z-10 md:hidden">
          <div className="flex items-center my-4">
            <ControlSVG fill="#e5e5e5" className="w-10 h-10" />
            <h1 className="text-center font-bold text-3xl">Control</h1>
          </div>
          <div className="pr-1" onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? (
              <CgCloseO className="w-10 h-9" />
            ) : (
              <CgMenuRound className="w-10 h-10" />
            )}
          </div>
        </div>

        <div
          className={`flex flex-col justify-between max-lg:overflow-x-clip max-lg:overflow-y-auto max-lg:w-[295px] bg-PRIMARY text-TERTIARY rounded-r-xl border-r border-QUATERNARY max-md:fixed max-md:right-0 max-md:w-fit max-md:z-2 max-md:rounded-none max-md:border duration-300 ease-linear ${
            openMenu ? "max-md:top-17" : "max-md:-top-120"
          } `}
        >
          <div className="mx-2">
            <div className="flex items-center justify-center my-6.5 max-md:hidden">
              <ControlSVG fill="#e5e5e5" className="w-10 h-10" />
              <h1 className="text-center font-bold text-3xl">Control</h1>
            </div>
            <hr className="mb-5 max-md:border-0" />
            <nav className="flex flex-col w-52 gap-4">
              <div className="flex flex-col w-52 gap-4">
                <div className="bg-BACKGROUND text-center rounded-lg font-medium">
                  Pessoal
                </div>
                {linksPersonal.map((items, index) => {
                  return (
                    <NavLink
                      key={index}
                      onClick={() => setOpenMenu(!openMenu)}
                      to={items.link}
                      className={({ isActive }) =>
                        isActive
                          ? `bg-TERTIARY text-PRIMARY ${style}`
                          : `hover:bg-SECONDARY ${style}`
                      }
                    >
                      {items.icon} {items.title}
                    </NavLink>
                  );
                })}
              </div>

              <div className="flex flex-col w-52 gap-4">
                <div className="bg-BACKGROUND text-center rounded-lg font-medium mt-5">
                  Interpessoal
                </div>
                {linksInterpersonal.map((items, index) => {
                  return (
                    <NavLink
                      key={index}
                      onClick={() => setOpenMenu(!openMenu)}
                      to={items.link}
                      className={({ isActive }) =>
                        isActive
                          ? `bg-TERTIARY text-PRIMARY ${style}`
                          : `hover:bg-SECONDARY ${style}`
                      }
                    >
                      {items.icon} {items.title}
                    </NavLink>
                  );
                })}
              </div>
            </nav>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 mb-6 mt-15">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center font-bold text-xl w-10 h-10 bg-TERTIARY rounded-full">
                <span className="text-PRIMARY">
                  {user?.name[0].toUpperCase()}
                  {user?.lastName[0].toUpperCase()}
                </span>
              </div>
              <div className="flex gap-1">
                <p>
                  {user?.name[0].toUpperCase()}
                  {user?.name.substring(1).toLowerCase()}
                </p>
                <p>
                  {user?.lastName[0].toUpperCase()}
                  {user?.lastName.substring(1).toLowerCase()}
                </p>
              </div>
            </div>
            <div
              className="flex items-center justify-center gap-2 px-2 w-[70%] bg-QUATERNARY p-1 rounded-lg hover:cursor-pointer"
              onClick={() => logout()}
            >
              <p>Logout</p>
              <FiLogOut className="w-5 h-5" />
            </div>
          </div>
        </div>
        <main
          id="main_scroll"
          className="overflow-auto h-screen w-screen max-md:pt-15"
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
