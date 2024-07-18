import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { NavLink } from "react-router-dom";
import "../footer/footer.css";

const Footer = () => {
     return (
          <footer>
               <NavLink exact to="/" activeClassName="active-link">
                    <div className="footer__page">
                         <HomeIcon
                              sx={{
                                   "&:hover": { color: "royalblue" },
                                   color: "slateblue",
                                   fontSize: "40px",
                              }}
                         />
                         <p>Asosiy</p>
                    </div>
               </NavLink>

               <NavLink to="/katalog" activeClassName="active-link">
                    <div className="footer__page">
                         <ManageSearchIcon
                              sx={{
                                   "&:hover": { color: "royalblue" },
                                   color: "slateblue",
                                   fontSize: "40px",
                              }}
                         />
                         <p>Katalog</p>
                    </div>
               </NavLink>

               <NavLink to="/savat" activeClassName="active-link">
                    <div className="footer__page">
                         <LocalMallIcon
                              sx={{
                                   "&:hover": { color: "royalblue" },
                                   color: "slateblue",
                                   fontSize: "40px",
                              }}
                         />
                         <p>Savat</p>
                    </div>
               </NavLink>

               <NavLink to="/login" activeClassName="active-link">
                    <div className="footer__page">
                         <PermIdentityIcon
                              sx={{
                                   "&:hover": { color: "#222222" },
                                   color: "slateblue",
                                   fontSize: "40px",
                              }}
                         />
                         <p>Kabinet</p>
                    </div>
               </NavLink>
          </footer>
     );
};

export default Footer;
