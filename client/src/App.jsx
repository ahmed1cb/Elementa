import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./components/Home";
import SignUpPage from "./components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/auth">
        <Route path="register" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
