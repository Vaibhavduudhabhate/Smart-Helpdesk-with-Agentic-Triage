import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import { AdminDashboard } from "./pages/Dashboards/AdminDashboard.jsx";
import AgentRoute from "./routes/AgentRoute.jsx";
import AgentDashboard from "./pages/Dashboards/AgentDashboard.jsx";
import { UserDashboard } from "./pages/Dashboards/UserDashboard.jsx";
import { Unauthorized } from "./pages/Auth/Unauthorized.jsx";

// import Signup from "./pages/Auth/Signup";
// import AdminDashboard from "./pages/Dashboard/AdminDashboard";
// import AgentDashboard from "./pages/Dashboard/AgentDashboard";
// import UserDashboard from "./pages/Dashboard/UserDashboard";
// import KBList from "./pages/KB/KBList";
// import TicketList from "./pages/Tickets/TicketList";
// import TicketForm from "./pages/Tickets/TicketForm";
// import AuditLog from "./pages/Audit/AuditLog";
// import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* <Route path="/signup" element={<Signup />} /> */}

      {/* Dashboards */}
      <Route path="/user-dashboard" element={<UserDashboard/>} >
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>} >
        <Route path="" element={<AdminDashboard/>} />
      </Route>
      <Route path="/agent-dashboard" element={<AgentRoute/>} >
        <Route path="" element={<AgentDashboard/>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
