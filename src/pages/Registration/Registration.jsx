import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import cn from "classnames";
import styles from "./Registration.module.css";
import { Link } from "react-router-dom";

const Registration = ({ value }) => {
  return (
    <div className={cn(styles.container, "text text_type_main-default mb-6")}>
      <h2>Регистрация</h2>
      <EmailInput
        extraClass="mb-6"
        value={value}
        name={"name"}
        placeholder="Имя"
        isIcon={false}
      />
      <EmailInput
        extraClass="mb-6"
        placeholder="email"
        name={"email"}
      ></EmailInput>

      <PasswordInput
        extraClass="mb-6"
        placeholder="Пароль"
        name={"password"}
      ></PasswordInput>

      <Button extraClass="mb-20" htmlType="button" type="primary" size="large">
        Зарегистрироваться
      </Button>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Уже зарегистрированы?</p>
        <Link to="/login">
          <a className="text text_type_main-small">Войти</a>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
