import { NavLink, Outlet, useNavigate } from "react-router";
import { LuGoal } from "react-icons/lu";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { UserContext } from "./../../context/UserContext";
import { FiLogOut } from "react-icons/fi";
import { GoalContext } from "../../context/GoalContext";

export default function Layout() {
  const { user } = useContext(UserContext);
  const { auth, setGoals } = useContext(GoalContext);

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
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    
    navigation("/login");
    setGoals([])
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center font-bold text-2xl w-10 h-10 bg-TERTIARY rounded-full">
              <span className="text-PRIMARY">
                {user?.name[0].toUpperCase()}
              </span>
            </div>
            <p className="max-w-[100px]">{user?.name.toUpperCase()}</p>
            <div
              className="bg-QUATERNARY p-1 rounded-lg hover:cursor-pointer"
              onClick={() => logout()}
            >
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
