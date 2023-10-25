export default interface IUser {
  _id: string;
  uid: string;
  username: string;
}

export const DEFAULT_USER: IUser = {
  _id: "",
  uid: "",
  username: "",
};

export const DEFAULT_FIRE_TOKEN = "";
