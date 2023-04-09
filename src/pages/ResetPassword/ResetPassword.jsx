import styles from "./ResetPassword.module.css";
import React from "react";
import {
  EmailInput,
  ShowIcon,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Link } from "react-router-dom";
import { sendCode } from "../../utils/api";


const ResetPassword = ({ value }) => {
  // const [value, setValue] = React.useState("bob@example.com");
  // const onChange = (e) => {
  //   setValue(e.target.value);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.header, "text text_type_main-default mb-6")}>
        <h2>Восстановление пароля</h2>
      </div>
      <PasswordInput
        value={value}
        name={"password"}
        placeholder="Введите новый пароль"
        isIcon={false}
        extraClass="mb-6"
      />
      <Input
        extraClass="mb-6"
        name={"code"}
        placeholder="Введите код из письма"
      ></Input>
      <Button extraClass="mb-20" htmlType="button" type="primary" size="large" onClick={()=>sendCode(value)}>
        Сохранить
      </Button>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Вспомнили пароль?</p>
        <Link to="/login">
          <a className="text text_type_main-small">Войти</a>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
