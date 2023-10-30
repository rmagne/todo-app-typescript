import { useEffect, useReducer } from "react";
import Navbar from "./components/navbar";
import NoMatch from "./components/nomatch";
import UserContext, {
  initialUserState,
  userReducer,
} from "./contexts/userContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Todos from "./pages/todos";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./components/authRoutes";

const App = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const CheckLocalStorageForCredentials = () => {
    const fire_token = localStorage.getItem("fire_token");
    if (fire_token === null) {
      userDispatch({ type: "logout", payload: initialUserState });
    } else {
      /*authenticate with backend */
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  useEffect(() => {
    CheckLocalStorageForCredentials();
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={userContextValues}>
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/todos"
            element={
              <AuthRoutes>
                <Todos />
              </AuthRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
