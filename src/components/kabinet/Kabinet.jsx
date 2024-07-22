import React from "react";
import "./kabinet.css";
import alikhanov from "../../assets/Alikhanov Shukurullo.jpg";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TryIcon from "@mui/icons-material/Try";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import NearMeIcon from "@mui/icons-material/NearMe";
import MapIcon from "@mui/icons-material/Map";
import Nota from "@mui/icons-material/Notifications";
const Kabinet = () => {
     return (
          <div className="kabinet__container">
               <div className="profil__card">
                    <div className="kabinet__title">
                         <p>Shaxsiy kabinet</p>
                    </div>
                    <div className="kabinet__profil-anket">
                         <img src={alikhanov} alt="" />
                         <div className="profil__name-number">
                              <p>Алиханов.Ш</p>
                              <p>+99894 075 13-13</p>
                         </div>
                    </div>
               </div>
               <div className="kabinet__card">
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <ShoppingBagIcon />
                              <p>Buyurtmalarim</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <TryIcon />
                              <p>Sharhlarim</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <hr
                         id="hr"
                         style={{ height: "2px", backgroundColor: " rgb(131, 160, 255)" }}
                    />
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <AccountCircleIcon />
                              <p>Profilim</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <SettingsIcon />
                              <p>Sozlamalar</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <LoyaltyIcon />
                              <p>Promokodlarim</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <Nota />
                              <p>Bildirishnomalar</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <hr
                         id="hr"
                         style={{ height: "2px", backgroundColor: " rgb(131, 160, 255)" }}
                    />
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <NearMeIcon />
                              <p>Shahar</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <div className="kabinet__box">
                         <div className="kabinet__list">
                              <MapIcon />
                              <p>Xaritadagi topshirish punkitlari</p>
                         </div>

                         <Link>
                              <NavigateNextIcon sx={{ color: "black" }} />
                         </Link>
                    </div>
                    <Link to={"/"}>Chiqish</Link>
               </div>
          </div>
     );
};

export default Kabinet;
