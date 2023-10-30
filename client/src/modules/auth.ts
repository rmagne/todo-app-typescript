import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import IUser from "../interfaces/user";

const API_BASE = "http://localhost:3001";

if (!API_BASE) throw new Error("API_BASE is not defined!");

export const signInWithSocialMedia = async () => {
  return signInWithPopup(auth, provider);
};

export const authenticate = async (
  uid: string,
  name: string,
  fire_token: string
) => {
  try {
    const response = await fetch(API_BASE + "/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${fire_token}`,
      },
      body: JSON.stringify({ uid, name }),
    });
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 304
    ) {
      const data = await response.json();
      return data.user;
    } else {
      console.error("Unable to authenticate");
    }
  } catch (err) {
    console.error("Unable to authenticate");
  }
};

export const validate = async (fire_token: string) => {
  try {
    const response = await fetch(API_BASE + "/users/validate", {
      headers: {
        Authorization: `Bearer ${fire_token}`,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      return data;
    } else {
      console.error("Unable to validate");
    }
  } catch (err) {
    console.error("Unable to validate");
  }
};
