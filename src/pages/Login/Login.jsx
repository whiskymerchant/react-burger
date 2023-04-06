import styles from "./Login.module.css";
import React from "react";
import {
  EmailInput,
  ShowIcon,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Link } from "react-router-dom";

const Login = ({ value }) => {
  // const [value, setValue] = React.useState("bob@example.com");
  // const onChange = (e) => {
  //   setValue(e.target.value);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.header, "text text_type_main-default mb-6")}>
        <h2>Вход</h2>
      </div>
      <EmailInput
        value={value}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        extraClass="mb-6"
        name={"password"}
        placeholder="Пароль"
      ></PasswordInput>
      <Button extraClass="mb-20" htmlType="button" type="primary" size="large">
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
    </div>
  );
};

export default Login;
