import { asyncHandler } from "./asyncHandler.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import userModel from "../../DB/model/User.model.js";

export const addAdmin = async (req, res, next) => {
  const userName = "AbdullahAhmed20";
  const email = "bedo88232@gmail.com";
  const age = 21;
  const password = "Abdullah@123";
  const hashpassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALTROUND)
  );
  const phone = "01090524452";
  const hashphone = CryptoJS.AES.encrypt(phone, "c38pouiyuk").toString();
  const confirmEmail = true;
  const Role = "admin";
  const Admins = await userModel.find({ Role: "admin" });
  if (Admins.length > 2) {
    console.log("there is admin");
  } else {
    await userModel.create({
      userName,
      email,
      password: hashpassword,
      phone: hashphone,
      age,
      confirmEmail,
      Role,
    });
    console.log("Admin Added Done");
  }
};
