import { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import MainPage from "../MainPage/MainPage";
import Profile from "../../pages/Profile/Profile";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { fetchIngredientsSlice } from "../../services/reducers/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsSlice());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/profile" Component={Profile} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Registration} />
          <Route path="/forgot-password" Component={ForgotPassword} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
