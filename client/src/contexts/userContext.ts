import { createContext, useReducer } from "react";
import { DEFAULT_FIRE_TOKEN, DEFAULT_USER } from "../interfaces/user";
import IUser from "../interfaces/user";

export interface IUserState {
  user: IUser;
  fire_token: string;
}

export interface IUserActions {
  type: "login" | "logout";
  payload: {
    user: IUser;
    fire_token: string;
  };
}

export const InitialUserState: IUserState = {
  user: DEFAULT_USER,
  fire_token: DEFAULT_FIRE_TOKEN,
};

export const userReducer = (state: IUserState, action: IUserActions) => {
  let user = action.payload.user;
  let fire_token = action.payload.fire_token;

  switch (action.type) {
    case "login":
      localStorage.setItem("fire_token", fire_token);
      return { user, fire_token };

    case "logout": {
      localStorage.removeItem("fire_token");
      return InitialUserState;
    }

    default:
      return state;
  }
};

export interface IUserContextProps {
  userState: IUserState;
  userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
  userState: InitialUserState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
export default UserContext;