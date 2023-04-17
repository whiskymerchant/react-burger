import styles from "./Login.module.css";
import React, { useState, useEffect } from "react";
import {
  EmailInput,
  ShowIcon,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/reducers/user";
import { getCookie } from "../../utils/cookie";
import { ILoginUser } from "../../utils/api";

type TLoginProps = {
  onLogin: () => void;
  user: ILoginUser;
}

const Login: React.FC<TLoginProps> = ({ onLogin, user}: any) => {
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmit = (event: any) => {
    event.preventDefault();
    onLogin({ email, password });
  };


  useEffect(()=>{
    if (user) {
      navigate(-1);
    }
  }, [user]);

  return (
    <form className={cn(styles.container)} onSubmit={onSubmit}>
      <div className={cn(styles.header, "text text_type_main-default mb-6")}>
        <h2>Вход</h2>
      </div>
      <EmailInput
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        extraClass="mb-6"
        name={"password"}
        placeholder="Пароль"
      ></PasswordInput>
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
        Войти
      </Button>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Вы — новый пользователь?</p>
        <Link to="/register">
          <a className="text text_type_main-small">Зарегистрироваться</a>
        </Link>
      </div>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Забыли пароль?</p>
        <Link to="/forgot-password">
          <a className="text text_type_main-small">Восстановить пароль</a>
        </Link>
      </div>
    </form>
  );
};

export default Login;
