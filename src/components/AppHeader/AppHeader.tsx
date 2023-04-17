import styles from "./AppHeader.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={cn(styles.header, "p-4")}>
      <nav className={styles.constructors}>
        <Link to="/">
          <BurgerIcon type="primary" />
          <span className={cn("text text_type_main-default ml-2")}>
            Конструктор
          </span>
        </Link>
      </nav>
      <nav className={styles.feed}>
        <ListIcon type="secondary" />
        <span
          className={cn("text text_type_main-default text_color_inactive ml-2")}
        >
          Лента заказов
        </span>
      </nav>
      <nav className={styles.account}>
        <Link to="/profile">
          <ProfileIcon type="secondary" />
          <span
            className={cn(
              "text text_type_main-default text_color_inactive ml-2"
            )}
          >
            Личный кабинет
          </span>
        </Link>
      </nav>
      <nav className={styles.logo}>
        {" "}
        <Logo />{" "}
      </nav>
    </header>
  );
};

export default AppHeader;
