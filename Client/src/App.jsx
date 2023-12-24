import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import "./app.scss";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/Home/HomePage";
import Profile from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";

import { routesConstant } from "./routes/routesConstant";
import { getCurrentLocation } from "./redux/routingSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentLocation());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routesConstant.login.path} element={<Login />} />
        <Route path={routesConstant.register.path} element={<Register />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path={routesConstant.profile.path} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
