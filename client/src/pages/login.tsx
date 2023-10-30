import { auth } from "../config/firebase";
import { signInWithSocialMedia as SocialMediaPopup } from "../modules/auth";
import IPage from "../interfaces/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AuthProvider } from "firebase/auth";
import { useEffect } from "react";
import userContext from "../contexts/userContext";

const Login: React.FunctionComponent<IPage> = () => {
  const isLogin = window.location.pathname.includes("login");

  const SignInWithSocialMedia = () => {
    return SocialMediaPopup()
      .then(async (result) => {
        let user = result.user;

        if (user) {
          let uid = user.uid;
          let name = user.displayName;

          if (name) {
            let fire_token = await user.getIdToken();

            /*backend auth */
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
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
