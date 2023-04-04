import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import cn from "classnames";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = ({ value }) => {
  return (
    <div className={cn(styles.container, "text text_type_main-default mb-6")}>
      <h2>Восстановление пароля</h2>
      <EmailInput
        extraClass="mb-6"
        value={value}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
      />

      <Button extraClass="mb-20" htmlType="button" type="primary" size="large">
        Восстановить
      </Button>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Вспомнили пароль?</p>
        <a className="text text_type_main-small">Войти</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
