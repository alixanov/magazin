import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { NavLink } from "react-router-dom";
import "../footer/footer.css";

const Footer = () => {
     const renderLink = (to, IconComponent, label) => (
          <NavLink
               to={to}
               className={({ isActive }) => (isActive ? "active-link" : "")}
          >
               <div className="footer__page">
                    <IconComponent
                         sx={{
                              "&:hover": { color: "royalblue" },
                              color: "slateblue",
                              fontSize: "40px",
                         }}
                    />
                    <p>{label}</p>
               </div>
          </NavLink>
     );

     return (
          <footer>
               {renderLink("/", HomeIcon, "Asosiy")}
               {renderLink("/katalog", ManageSearchIcon, "Katalog")}
               {renderLink("/savat", LocalMallIcon, "Savat")}
               {renderLink("/login", PermIdentityIcon, "Kabinet")}
          </footer>
     );
};

export default Footer;
