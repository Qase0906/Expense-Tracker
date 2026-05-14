import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardContent from "./components/dashboard/DashboardContent";
import ExpensePage from "./pages/dashboard/ExpensePage";
import IncomePage from "./pages/dashboard/IncomePage";
import ReportPage from "./pages/dashboard/ReportPage";
import Setting from "./components/dashboard/Setting";
import useAuthStore from "./lib/store/authStore";
import Transactions from "./pages/dashboard/Transactions";

function App() {

  const {user} = useAuthStore()

  return (
    <div className="bg-gray-100">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="expense" element={<ExpensePage />} />
          <Route path="transaction" element={<Transactions />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="/" element={user?(<Navigate to="/dashboard" replace />) : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
