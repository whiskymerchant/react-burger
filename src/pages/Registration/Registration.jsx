import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import cn from "classnames";
import styles from "./Registration.module.css";

const Registration = ({value}) => {
  return (
    <div  className={cn(styles.container, "text text_type_main-default mb-6")}>
      <h2>Регистрация</h2>
      <EmailInput
      extraClass="mb-6"
        value={value}
        name={"name"}
        placeholder="Имя"
        isIcon={false}
      />
      <EmailInput extraClass="mb-6" placeholder="email" name={"email"}></EmailInput>

      <EmailInput extraClass="mb-6" placeholder="Пароль" name={"password"}></EmailInput>

      <Button extraClass="mb-20" htmlType="button" type="primary" size="large" >
        Зарегистрироваться
      </Button>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Забыли пароль?</p>
        <a className="text text_type_main-small">Восстановить пароль</a>
      </div>
    </div>
  );
};

export default Registration;
