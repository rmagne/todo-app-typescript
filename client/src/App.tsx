import { useEffect, useReducer } from "react";
import Navbar from "./components/navbar";
import NoMatch from "./components/nomatch";
import UserContext, {
  initialUserState,
  userReducer,
} from "./contexts/userContext";
import Login from "./pages/login";
import Todos from "./pages/todos";
import { Routes, Route } from "react-router-dom";

import { Validate } from "./modules/auth";
import AuthRoutes from "./components/authRoutes";

const App = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const CheckLocalStorageForCredentials = async () => {
    const fire_token = localStorage.getItem("fire_token");

    if (fire_token === null) {
      userDispatch({ type: "logout", payload: initialUserState });
      return;
    }

    try {
      const user = await Validate(fire_token);
      userDispatch({ type: "login", payload: { user, fire_token } });
    } catch (error) {
      userDispatch({ type: "logout", payload: initialUserState });
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
      <UserContext.Provider value={userContextValues}>
        <Navbar />
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path="/" element={<Login />} />
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
