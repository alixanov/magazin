import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PhoneIcon from "@mui/icons-material/Phone";

const Register = () => {
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
          <div className="register__container">
               {/* <div className="register__title">
                    <p>13dokon</p>
               </div> */}
               <form onSubmit={handleSubmit(data)}>
                    <p>Ruyhatdan o'tish</p>
                    <label>Username</label>
                    <div className="register__input">
                         <PersonOutlineIcon />
                         <input {...register("login")} placeholder="Username" />
                    </div>
                    <label>Parol</label>
                    <div className="register__input">
                         <LockOpenOutlinedIcon />
                         <input
                              {...register("password")}
                              type="password"
                              placeholder="Parol"
                         />
                    </div>
                    <label>Parolni qaytadan tering</label>
                    <div className="register__input">
                         <LockOpenOutlinedIcon />
                         <input
                              {...register("password")}
                              type="password"
                              placeholder="Parol"
                         />
                    </div>
                    <label>Mobile raqam </label>
                    <div className="register__input">
                         <PhoneIcon />
                         <input {...register("password")} type="number" placeholder="+998" />
                    </div>
                    <button type="submit">Yakunlash</button>
               </form>
          </div>
     );
};

export default Register;
