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
  useLocation,
} from "react-router-dom";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import FullPage from "../../pages/FullPage/FullPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsSlice());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;
  console.log({location});
  console.log({background});


  return (
    // <Router location ={background || location}>
    <div className={styles.app}>
      <AppHeader />
      <Routes state={background || location}>
        <Route index Component={MainPage} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/ingredients/:id"
          element={
            <ProtectedRoute>
              <FullPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
    // </Router>
  );
};

export default App;
