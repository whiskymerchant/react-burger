import React from "react";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "./Profile.module.css";
import { getUser } from "../../utils/api";
import { useDispatch } from "react-redux";
import { updateUser } from "../../services/reducers/user";

const Profile = ({ value, onLogout }) => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();

    React.useEffect(()=> {
      getUser()
      .then((responce)=>{
        const {user} = responce
        setName(user.name)
        setEmail(user.email)
      })
    }, [])

    const onSaveButtonClick = () => {
      dispatch(updateUser({
        dataUser: {
          name,
          email,
          password,
        },
        onSuccess: () => alert('updated user'),
        onError: (message) => alert(message),
      }))
    }

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
          value={name}
          onChange={(event)=>setName(event.target.value)}
        />
        <Input
          extraClass="mb-2"
          placeholder="Логин"
          isIcon={false}
          name="login"
          value={email}
          onChange={(event)=>setEmail(event.target.value)}
        ></Input>
        <PasswordInput
          extraClass="mb-2"
          placeholder="Пароль"
          value={password}
          isIcon={false}
          name="password"
          onChange={(event)=>setPassword(event.target.value)}

        ></PasswordInput>
        <Button
          onClick={onSaveButtonClick}
          extraClass="mt-15"
          htmlType="submit"
          type="primary"
          size="large"
        >
          Сохранить
        </Button>
        <Button
          onClick={onLogout}
          extraClass="mt-15"
          htmlType="button"
          type="primary"
          size="large"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Profile;
