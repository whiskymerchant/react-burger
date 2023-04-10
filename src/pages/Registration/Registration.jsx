import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import cn from "classnames";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const Registration = ({ value, onRegister, user }) => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const [message, setMessage] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  React.useEffect(()=>{
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <form
      className={cn(styles.container, "text text_type_main-default mb-6")}
      onSubmit={handleSubmit}
    >
      <h2>Регистрация</h2>
      <Input
        onChange={handleChange}
        extraClass="mb-6"
        value={userData.name}
        name={"name"}
        placeholder="Имя"
        isIcon={false}
      />
      <EmailInput
        onChange={handleChange}
        value={userData.email}
        extraClass="mb-6"
        placeholder="email"
        name={"email"}
      ></EmailInput>

      <PasswordInput
        onChange={handleChange}
        value={userData.password}
        extraClass="mb-6"
        placeholder="Пароль"
        name={"password"}
      ></PasswordInput>

      <Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
        Зарегистрироваться
      </Button>
      <div className={cn(styles.bottom_div)}>
        <p className="text text_type_main-small">Уже зарегистрированы?</p>
        <Link to="/login">
          <a className="text text_type_main-small">Войти</a>
        </Link>
      </div>
    </form>
  );
};

export default Registration;
