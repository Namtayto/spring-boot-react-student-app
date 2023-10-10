import "./App.css";
import { Route, Routes } from "react-router-dom";
import StudentRouters from "./Routers/StudentRouters";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<StudentRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
