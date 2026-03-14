import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./components/Home";
import SignUpPage from "./components/SignUp";
import Login from "./components/Login";
import { useTheme } from "./hooks/useTheme";
import Components from "./components/Components";

function App() {
  const {theme} = useTheme();
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='components' element={<Components />} />
      </Route>

      <Route path="/auth">
        <Route path="register" element={<SignUpPage />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
