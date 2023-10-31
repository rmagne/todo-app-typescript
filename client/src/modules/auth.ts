import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import IUser from "../interfaces/user";

const API_BASE = "http://localhost:3001";

if (!API_BASE) throw new Error("API_BASE is not defined!");

export const signInWithSocialMedia = async () => {
  return signInWithPopup(auth, provider);
};

export const Authenticate = async (
  uid: string,
  name: string,
  fire_token: string
): Promise<IUser> => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${fire_token}`,
    },
    body: JSON.stringify({ uid, name }),
  });

  if (!response.ok) {
    throw new Error("Unable to authenticate");
  }

  const responseData = await response.json();
  return responseData.user;
};

export const Validate = async (fire_token: string): Promise<IUser> => {
  const response = await fetch(`${API_BASE}/users/validate`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${fire_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to validate");
  }

  const responseData = await response.json();
  return responseData.user;
};
