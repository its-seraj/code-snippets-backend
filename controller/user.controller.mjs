import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import chalk from "chalk";
import { formatDate } from "../helper/index.helper.mjs";

const login = (req, res) => {
  try {
    const { passkey } = req.body;

    const date = formatDate(new Date());
    const passkeyShouldBe = CryptoJS.MD5(date).toString();
    if (passkey !== passkeyShouldBe) {
      console.log("user login failed");
      return res.send({ success: false });
    }

    const jwt_secret_key = process.env.UUID_NAMESPACE;
    const token = jwt.sign({ resource: "admin" }, jwt_secret_key, { expiresIn: "1h" });
    console.log("token generated", date, passkey, passkeyShouldBe, jwt_secret_key, token);

    res.cookie("codesnip", token, { httpOnly: true, secure: true, maxAge: 3600000, sameSite: "None" });
    res.send({ success: true, resource: "admin" });
  } catch (e) {
    console.error(chalk.red("Error occured in login controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const logout = (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    console.log("logout - ", cookies);

    res.clearCookie("codesnip");
    res.send({ success: true });
  } catch (e) {
    console.error(chalk.red("Error occured in logout controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

export { login, logout };
