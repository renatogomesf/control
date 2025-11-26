import { Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Layout from "./pages/private/Layout";
import Goal from "./pages/private/Goal";
import Revenue from "./pages/private/Revenue";

function App() {
  return (
    <>
      <div className="bg-BACKGROUND">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Goal />} />
            <Route path="revenue" element={<Revenue />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
