import logo from "../assets/nav/logo.jpeg";
import { Link } from "react-router-dom";

const Nav = () => {
   const savedUser = localStorage.getItem("currentUser");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;
  const name = currentUser?.name || "";

  return (
    <div className="nav-parrent">
      <nav className="navbar">
        <div className="nav-brand">
       <Link to="/"> <img src={logo} alt="PetCare" className="nav-logo" /></Link>
        </div>

        <div className="nav-profile">
          <div className="profile-icon">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-info">
            <span>Welcome back</span>
            <h4>{name || "User"}</h4>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;