function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">

        <li><a href="#">Packages & Offers</a></li>
        <li><a href="#">Rooms</a></li>
        <li><a href="#">Meetings & Events</a></li>
        <li><a href="#">Wellness</a></li>

        <li className="has-dropdown">
          <a href="#" className="has-arrow">
            Restaurant & Bar
          </a>
          <ul className="dropdown">
            <li><a href="#">Breakfast</a></li>
            <li><a href="#">Lunch</a></li>
            <li><a href="#">Dinner</a></li>
            <li><a href="#">After Work Party</a></li>
          </ul>
        </li>

        <li className="has-dropdown">
          <a href="#" className="has-arrow">
            About Us
          </a>
          <ul className="dropdown">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Find Us</a></li>
            <li><a href="#">Company Information</a></li>
          </ul>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;