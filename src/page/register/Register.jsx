import { Notyf } from 'notyf'; // Импортируем Notyf
import 'notyf/notyf.min.css'; // Импортируем стили Notyf
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./register.css";

const Register = () => {
    const { handleSubmit, register, reset } = useForm();
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 5000, // Длительность 5 секунд
        position: { x: 'right', y: 'top' },
        dismissible: true // Возможность закрытия уведомления
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3004/api/users/register', data);
            console.log(response.data.message);

            // Сдержанное и логичное уведомление
             notyf.success('Muvaffaqiyatli ro‘yxatdan o‘tdingiz!');

            navigate("/login");
            reset();
        } catch (error) {
            console.error(error);
            notyf.error("Iltimos berilgan qatorlarni toldiring.");
        }
    };

    return (
        <div className="register__container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Ruyhatdan o'tish</p>
                <label>Foydalanuvchi nomi</label>
                <div className="register__input">
                    <PersonOutlineIcon />
                        <input {...register("login")} placeholder="Foydalanuvchi nomi" />
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
                        {...register("confirmPassword")}
                        type="password"
                             placeholder="Parolni qaytadan tering"
                    />
                </div>
                <label>Telefon raqam</label>
                <div className="register__input">
                    <PhoneIcon />
                    <input {...register("mobile")} type="number" placeholder="+998" />
                </div>
                <button type="submit">Yakunlash</button>
            </form>
        </div>
    );
};

export default Register;
