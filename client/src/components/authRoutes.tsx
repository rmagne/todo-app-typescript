import { PropsWithChildren, useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

export interface IAuthRoutesProps {}

const AuthRoutes: React.FunctionComponent<
  PropsWithChildren<IAuthRoutesProps>
> = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  const userContext = useContext(UserContext);
  const userId = userContext.userState.user._id;

  useEffect(() => {
    if (userId === "") {
      navigate("/login");
    }
  });

  if (userId === "") {
    return null;
  } else {
    return <>{children}</>;
  }
};

export default AuthRoutes;
