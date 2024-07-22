import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";

const Login = () => {
     const { handleSubmit, register, reset } = useForm();
     const navigate = useNavigate();

     const data = (e) => {
          if (e.login === "admin" && e.password === "1234") {
               localStorage.setItem("data", JSON.stringify(e));
               console.log("malumot bor");
               navigate("/kabinet");
               resetInput();
          }
          console.log(e);
     };

     const resetInput = () => {
          reset();
     };

     return (
          <div className="login__container">
               {/* <div className="login__title">
                    <p>13dokon</p>
               </div> */}
               <form onSubmit={handleSubmit(data)}>
                    <p>Kabinetga kirish</p>
                    <label>Username</label>
                    <div className="login__input">
                         <PersonOutlineIcon />
                         <input {...register("login")} placeholder="Username" />
                    </div>
                    <label>Parol</label>
                    <div className="login__input">
                         <LockOpenOutlinedIcon />
                         <input
                              {...register("password")}
                              type="password"
                              placeholder="Parol"
                         />
                    </div>
                    <button type="submit">Kirish</button>
                    <div className="login__forgot-sing-up">
                         <Link to="/register">Ruyhatdan o'tish</Link>|
                         <Link to="/forgot-password">Parolni unutdingizmi?</Link>
                    </div>
               </form>
          </div>
     );
};

export default Login;
