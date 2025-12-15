import { NavLink, Outlet, useNavigate } from "react-router";
import { LuGoal } from "react-icons/lu";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { UserContext } from "./../../context/UserContext";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { GoalContext } from "../../context/GoalContext";
import { RevenueContext } from "../../context/RevenueContext";
import { ExpenseContext } from "../../context/ExpenseContext";
import { AmountToReceiveContext } from "../../context/AmountToReceiveContext";
import { AmountToPayContext } from "./../../context/AmountToPayContext";

export default function Layout() {
  const { auth } = useContext(AuthContext);

  const { user } = useContext(UserContext);
  const { setGoals } = useContext(GoalContext);
  const { setRevenue } = useContext(RevenueContext);
  const { setExpense } = useContext(ExpenseContext);
  const { setAmountToReceive } = useContext(AmountToReceiveContext);
  const { setAmountToPay } = useContext(AmountToPayContext);

  const navigation = useNavigate();

  const iconStyle = "w-[20px] h-[20px]";

  const links = [
    { link: "", title: "Metas", icon: <LuGoal className={`${iconStyle}`} /> },
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

    navigation("/login");

    setGoals([]);
    setRevenue([]);
    setExpense([]);
    setAmountToReceive([]);
    setAmountToPay([]);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser && !storedToken) {
      auth();
    }
  }, []);

  return (
    <>
      <div className="h-screen flex">
        <div className="flex flex-col justify-between bg-PRIMARY text-TERTIARY rounded-r-xl">
          <div className="mx-2">
            <h1 className="text-center font-bold text-3xl my-7">Control</h1>
            <nav className="flex flex-col w-52 items-center gap-4">
              {links.map((items) => {
                return (
                  <NavLink
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
            </nav>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center font-bold text-2xl w-10 h-10 bg-TERTIARY rounded-full">
                <span className="text-PRIMARY">
                  {user?.name[0].toUpperCase()}
                  {user?.lastName[0].toUpperCase()}
                </span>
              </div>
              <p className="max-w-[100px]">{user?.name.toUpperCase()}</p>
            </div>
            <div
              className="flex gap-2 px-2 bg-QUATERNARY p-1 rounded-lg hover:cursor-pointer"
              onClick={() => logout()}
            >
              <p>Sair</p>
              <FiLogOut className="w-6 h-6" />
            </div>
          </div>
        </div>
        <main id="main_scroll" className="overflow-auto h-screen w-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
}
