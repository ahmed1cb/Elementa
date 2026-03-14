import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./components/Home";
import SignUpPage from "./components/SignUp";
import Login from "./components/Login";
import { useTheme } from "./hooks/useTheme";
import Components from "./components/Components";
import TopUsers from "./components/TopUsers";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  const {theme} = useTheme();
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='components' element={<Components />} />
        <Route path='users' element={<TopUsers />} />
        <Route path='profile' element={<Profile />} />
        <Route path='settings' element={<Settings/>} />
      </Route>

      <Route path="/auth">
        <Route path="register" element={<SignUpPage />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
