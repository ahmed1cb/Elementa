import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/"  element={<AppLayout />}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
