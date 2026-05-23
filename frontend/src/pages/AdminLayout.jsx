import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminSidebar.css";

function AdminLayout() {
  return (
    <div className="admin-test-page">
      <AdminSidebar />

      <main className="admin-test-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;