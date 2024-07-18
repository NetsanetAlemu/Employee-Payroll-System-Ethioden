import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";

import { LoginPage } from "../../components/pages/login/login";
import NotFoundPage from "../../components/pages/4_0_4/404";
import AccessDenied from "../../components/pages/access-denied/access-denied";
import { ChangePassword } from "../../components/pages/change-password/change-password";
import { MainPage } from "../../components/pages/main/main";
import ProtectedRoute from "../utils/protected_route";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/token-constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../utils/custom-hook";
import { getCurrentUserRequest } from "../../store/user/user-slice";
import { useUser } from "../../hooks/user-hook";

export const RouterConfig = () => {
  const [isAuthorised, setIsAuthorized] = useState<boolean>(false);
  const dispatcher = useAppDispatch();
  const user = useUser();
  const [routing_elements, setRoutingElements] = useState<
    JSX.Element | JSX.Element[]
  >([]);
  // useEffect(() => {
  //   auth();
  // }, []);
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    let decoded: {
      exp: number;
      user_id: string;
    };
    if (!token) {
      throw redirect("/login");
    } else {
      decoded = await jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;
      if (tokenExpiration)
        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthorized(true);
          dispatcher(getCurrentUserRequest(decoded.user_id));
        }
    }
    return user;
  };
  useEffect(() => {
    if (user.user) {
      user.user && setRoutingElements(ProtectedRoute(isAuthorised, user.user));
    } else {
      setRoutingElements(
        <Route path="*" element={<Navigate to="/access-denied" />} />
      );
    }
  }, [user]);
  useEffect(() => {
    auth();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/" element={<MainPage />}>
          {isAuthorised && routing_elements}
        </Route>
        {<Route path="*" element={<NotFoundPage />} />}
      </Routes>
    </Router>
  );
};
