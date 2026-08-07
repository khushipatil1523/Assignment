import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Components from "./pages/Components";
import Configurations from "./pages/Configurations";
import Pricing from "./pages/Pricing";
import Quotations from "./pages/Quotations";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/components" element={<Components />} />
          <Route path="/configurations" element={<Configurations />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/quotations" element={<Quotations />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;