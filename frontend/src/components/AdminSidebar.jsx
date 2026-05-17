import "../styles/AdminSidebar.css";
import hotelImage from "../assets/grid4.jpg";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-sidebar-brand">
          <h1>Aurora</h1>
          <p>Admin</p>
        </div>

        <nav className="admin-sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Reservations</a>
          <a href="#">Guests</a>
          <a href="#">Rooms</a>
          <a href="#">Messages</a>
          <a href="#">Settings</a>
        </nav>
      </div>

      <div className="admin-hotel-card">
        <img src={hotelImage} alt="Aurora Hotel" />

        <div className="admin-hotel-info">
          <h3>Aurora Hotel</h3>
          <p>Södra Blasieholmshamnen 2</p>
          <p>111 48 Stockholm</p>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;

