import { asyncHandler } from "../../../service/asyncHandler.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import sendEmail from "../../../service/Email.js";
import userModel from "../../../../DB/model/User.model.js";
// import loggerDev from "../../../service/logger.dev.js";
// const logger = new loggerDev("auth");
export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password, phone } = req.body;
  const searchuser = await userModel.findOne({ email });
  if (searchuser) {
    next(new Error("email exist", { cause: 409 }));
  } else {
    const hashpassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALTROUND)
    );
    const hashphone = CryptoJS.AES.encrypt(phone, "c38pouiyuk").toString();
    const newuser = await userModel({
      userName,
      email,
      password: hashpassword,
      phone: hashphone,
    });
    const token = jwt.sign({ _id: newuser._id }, process.env.EMAILTOKEN, {
      expiresIn: "20h",
    });
    const reftoken = jwt.sign({ _id: newuser._id }, process.env.EMAILTOKEN);
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`;
    const reflink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${reftoken}`;
    const message = `<a href='${link}'>follow me to confirm u account</a><br></br>
    <a href='${reflink}'>send confirm email</a>`;
    const info = sendEmail(email, "Confirmation Email", message);
    if (info) {
      const saveduser = await newuser.save();
      res.status(200).json({ message: "done", saveduserId: saveduser._id });
    } else {
      next(new Error("rejected email", { cause: 400 }));
    }
  }
});

export const confirmemail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAILTOKEN);
  if (!decoded?._id) {
    next(new Error("in_valid payload", { cause: 400 }));
  } else {
    const user = await userModel.findOneAndUpdate(
      { _id: decoded._id, confirmEmail: false },
      { confirmEmail: true }
    );
    if (!user) {
      logger.info(`try to confirm email`);
      res
        .status(400)
        .json({ message: "email already confirmed or in-valid token" });
    } else {
      res.status(200).redirect(process.env.FEURL);
    }
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    next(new Error("email not exist", { cause: 404 }));
  } else {
    if (!user.confirmEmail) {
      next(new Error("email not confirmed", { cause: 404 }));
    } else {
      if (user.isDeleted) {
        return next(new Error("email is deleted", { cause: 404 }));
      }
      if (user.blocked) {
        next(new Error("email blocked", { cause: 404 }));
      } else {
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
          next(new Error("i-valid password", { cause: 404 }));
        } else {
          await userModel.updateOne({ _id: user._id }, { isOnline: true });
          const token = jwt.sign(
            { _id: user._id, isLoggedIn: true },
            process.env.TOKENSIGNIN,
            { expiresIn: "24h" }
          );
          // logger.info(`${user.email} login success`);
          res.status(200).json({ message: "done", token });
        }
      }
    }
  }
});
