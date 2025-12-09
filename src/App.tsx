import { Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Layout from "./pages/private/Layout";
import Goal from "./pages/private/Goal";
import Revenue from "./pages/private/Revenue";
import Expense from "./pages/private/Expense";
import AmountToReceive from "./pages/private/AmountToReceive";
import AmountToPay from "./pages/private/AmountToPay";
import { GoalProvider } from "./context/GoalContext";
import { RevenueProvider } from "./context/RevenueContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import { AmountToReceiveProvider } from "./context/AmountToReceiveContext";
import { AmountToPayProvider } from "./context/AmountToPayContext";

function App() {
  return (
    <>
      <div className="bg-BACKGROUND">
        <GoalProvider>
          <RevenueProvider>
            <ExpenseProvider>
              <AmountToReceiveProvider>
                <AmountToPayProvider>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Goal />} />
                      <Route path="revenue" element={<Revenue />} />
                      <Route path="expense" element={<Expense />} />
                      <Route
                        path="amounttoreceive"
                        element={<AmountToReceive />}
                      />
                      <Route path="amounttopay" element={<AmountToPay />} />
                    </Route>
                  </Routes>
                </AmountToPayProvider>
              </AmountToReceiveProvider>
            </ExpenseProvider>
          </RevenueProvider>
        </GoalProvider>
      </div>
    </>
  );
}

export default App;
