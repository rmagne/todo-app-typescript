import IPage from "../interfaces/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

import React, { useContext, useState } from "react";

import {
  Authenticate,
  signInWithSocialMedia as SocialMediaPopup,
} from "../modules/auth";

const Login: React.FunctionComponent<IPage> = (props) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const isLogin = window.location.pathname.includes("login");

  const SignInWithSocialMedia = async () => {
    try {
      const result = await SocialMediaPopup();
      const user = result.user;

      if (!user || !user.displayName) {
        throw new Error(
          "The identity provider is missing necessary information."
        );
      }

      const uid = user.uid;
      const name = user.displayName;
      const fire_token = await user.getIdToken();

      const _user = await Authenticate(uid, name, fire_token);
      userContext.userDispatch({
        type: "login",
        payload: { user: _user, fire_token },
      });
      navigate("/todos");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="Modal SignInModal">
      <button className="loginButton" onClick={() => SignInWithSocialMedia()}>
        <FontAwesomeIcon icon={faGoogle} />
        <p className="buttonParagraph">
          Sign {isLogin ? "in" : "up"} with Google
        </p>
      </button>
    </div>
  );
};

export default Login;
