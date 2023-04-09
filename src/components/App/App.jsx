import { useEffect, useState } from "react";
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
  useNavigate,
} from "react-router-dom";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import FullPage from "../../pages/FullPage/FullPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../services/reducers/user";
import NotFound from "../../pages/NotFound/NotFound";
import { getCookie } from "../../utils/cookie";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(getCookie("accessToken"));

  useEffect(() => {
    dispatch(fetchIngredientsSlice());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  console.log({ location });
  console.log({ background });
  const handleCloseModal = () => {
    navigate(background.pathname || "/", { replace: true });
  };

  const cbLogin = (dataUser) => {
    dispatch(
      loginUser({
        dataUser,
        onSuccess: (token) => {
          setUser(token);
          navigate("/", { replace: true });
        },
        onError: (errorMessage) => {
          alert(errorMessage);
        },
      })
    );
  };

  const onLogout = () => {
    dispatch(
      logoutUser({
        onSuccess: () => setUser(null),
        onError: (errorMessage) => alert(errorMessage),
      })
    );
  };

  const cbRegister = (dataUser) => {
    dispatch(
      registerUser({
        dataUser,
        onSuccess: (token) => {
          setUser(token);
          navigate("/", { replace: true });
        },
        onError: (errorMessage) => {
          alert(errorMessage);
        },
      })
    );
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route index Component={MainPage} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={cbLogin} user={user} />}
        />
        <Route
          path="/register"
          element={<Registration onRegister={cbRegister} user={user} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/ingredient/:idIngredient" element={<FullPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredient/:idIngredient"
            element={
              <Modal onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
