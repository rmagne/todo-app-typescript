import { Request, Response } from "express";
import IUser from "../interfaces/user";
import User from "../models/user";
import mongoose from "mongoose";
import { error } from "console";

const validate = async (req: Request, res: Response) => {
  try {
    let uid = res.locals.firebase.uid;

    const user = await User.findOne({ uid: uid });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json("Invalid token");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    let { uid, name } = req.body;
    let fire_token = res.locals.fire_token;

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      uid: uid,
      username: name,
    });

    await newUser.save();
    return res.status(200).json({ user: newUser, fire_token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    let { uid } = req.body;
    let fire_token = res.locals.firebase;

    const user = await User.findOne({ uid: uid });

    if (user) {
      return res.status(200).json({ user: user, fire_token: fire_token });
    } else {
      return create(req, res);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const _id = req.params._id;
    const user = await User.findById(_id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json("User not found");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const readAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(401).json("No users found");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default {
  create,
  validate,
  login,
  read,
  readAll,
};
