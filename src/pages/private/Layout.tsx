import { NavLink, Outlet } from "react-router";
import { LuGoal } from "react-icons/lu";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function Layout() {
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

  return (
    <>
      <div className="h-screen flex">
        <div className="bg-PRIMARY text-TERTIARY rounded-r-xl">
          <h1 className="text-center font-bold text-3xl my-7">Control</h1>
          <nav className="flex flex-col w-52 items-center gap-4 mx-2">
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
        <main className="overflow-auto h-screen w-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
}
