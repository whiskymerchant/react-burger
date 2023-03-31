import styles from "./AppHeader.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

const AppHeader = () => {
  return (
    <header className={cn(styles.header, "p-4")}>
      <nav className={cn(styles.constructor)}>
        <BurgerIcon type="primary" />
        <span className={cn("text text_type_main-default ml-2")}>
          Конструктор
        </span>
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
        <ProfileIcon type="secondary" />
        <span
          className={cn("text text_type_main-default text_color_inactive ml-2")}
        >
          Личный кабинет
        </span>
      </nav>
      <nav className={styles.logo}>
        {" "}
        <Logo />{" "}
      </nav>
    </header>
  );
};

export default AppHeader;
