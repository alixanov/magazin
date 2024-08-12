import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "./login.css";

const Login = () => {
     const { handleSubmit, register, reset } = useForm();
     const navigate = useNavigate();
     const notyf = new Notyf({
          duration: 5000, // Длительность 5 секунд
          position: { x: 'right', y: 'top' },
          dismissible: true // Возможность закрытия уведомления
     });

     const onSubmit = async (data) => {
          try {
               const response = await axios.post('http://localhost:3004/api/users/login', data);
               localStorage.setItem("token", response.data.token);
               console.log("Авторизация успешна");
               notyf.success('Muvaffaqiyatli kirdingiz!');
               navigate("/kabinet");
               reset();
          } catch (error) {
               console.error(error);

               if (error.response && error.response.status === 401) {
                    notyf.error('Noto‘g‘ri login yoki parol.');
               } else {
                    notyf.error('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
               }
          }
     };

     return (
          <div className="login__container">
               <form onSubmit={handleSubmit(onSubmit)}>
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
