import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Frontend/login";
import SignUp from "./Frontend/signUp";
import Role from "./Frontend/roles";
import Dashboard from "./Frontend/Dashboard";
import MainDas from "./Frontend/Dashboards/MainDas";
import Admin from "./Frontend/admin/Admin";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
      <Route path="/admin/Admin" element={<Admin />} /> 
        <Route path="/dashboard/main" element={<MainDas />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-icons" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Role />} />
      </Routes>
    </Router>
  );
};

export default App;
