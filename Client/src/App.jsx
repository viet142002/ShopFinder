import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./app.scss";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/Home/HomePage";
import Profile from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";

import { routesConstant } from "./routes/routesConstant";

function App() {
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
