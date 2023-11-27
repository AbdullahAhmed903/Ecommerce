import moment from "moment/moment.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import CryptoJS from "crypto-js";

export const signOut = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const user = await userModel.findOneAndUpdate(
    { _id, isOnline: true },
    { isOnline: false, lastSeen: moment().format() }
  );
  return user
    ? res.status(200).json({ message: "done" })
    : next(new Error("some thing went wrong", { cause: 400 }));
});

export const blockAccount = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findOneAndUpdate(
    { _id: id, blocked: false, isDeleted: false },
    { blocked: true },
    { new: true }
  );
  return user
    ? res.status(200).json({ message: "done" })
    : next(new Error("in-valid userId OR user blocked", { cause: 400 }));
});

export const deleteAccount = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  return user
    ? res.status(200).json({ message: "done" })
    : next(new Error("in-valid userId OR user deleted", { cause: 400 }));
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const usersList = await userModel
    .find({})
    .select(
      "userName email phone confirmEmail Role blocked isDeleted age lastSeen"
    );
  for (const user of usersList) {
    var bytes = CryptoJS.AES.decrypt(user.phone, "c38pouiyuk");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    user.phone = originalText;
  }
  res.status(201).json({ message: "done", usersList });
});
