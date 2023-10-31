import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext, { initialUserState } from "../contexts/userContext";

export interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;
  const id = user._id;
  const navigate = useNavigate();

  const logout = () => {
    userContext.userDispatch({ type: "logout", payload: initialUserState });
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        {id === "" ? (
          <>
            <li>
              <button className="navbar-btn" onClick={() => navigate("/login")}>
                Log in
              </button>
            </li>
            <li>
              <button
                className="navbar-btn"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="navbar-btn" onClick={() => navigate("/todos")}>
                Todos
              </button>
            </li>
            <li>
              <button className="navbar-btn" onClick={logout}>
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
