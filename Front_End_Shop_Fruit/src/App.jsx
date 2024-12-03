import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import { adminRoutes, clientRoutes } from "./routes/Routes";
import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/user";

function App() {
  const userData = useSelector(selectUserData);
  const isAdmin = userData?.user.role?.includes("Admin");
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      {isAdmin ? (
        adminRoutes.map((route, index) => (
          <Route exact key={index} path={route.path} element={route.element} />
        ))
      ) : (
        <Route path="/admin/*" element={<Login />} />
      )}
      {clientRoutes.map((route, index) => {
        return (
          <Route exact key={index} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
