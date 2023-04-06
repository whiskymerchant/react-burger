import React from "react";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "./Profile.module.css";

const Profile = ({value}) => {
  return (
    <div className={cn(styles.main_container)}>
      <div className={cn(styles.left_container, "mr-15")}>
        <div
          className={cn(styles.text_container, "text text_type_main-default")}
        >
          Профиль
        </div>
        <div
          className={cn(styles.text_container, "text text_type_main-default")}
        >
          История заказов
        </div>
        <div
          className={cn(
            styles.text_container,
            "text text_type_main-default mb-20"
          )}
        >
          Выход
        </div>
        <div className={cn("text text_type_main-small text_color_inactive")}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <div className={cn(styles.right_container)}>
        <Input
          extraClass="mb-2"
          name={"name"}
          placeholder="Имя"
          isIcon={false}
          value={value}
        />
        <Input
          extraClass="mb-2"
          placeholder="Логин"
          isIcon={false}
          name="login"
          value={value}
        ></Input>
        <PasswordInput
          extraClass="mb-2"
          placeholder="Пароль"
          isIcon={false}
          name="password"
          value={value}
        ></PasswordInput>
      </div>
    </div>
  );
};

export default Profile;
