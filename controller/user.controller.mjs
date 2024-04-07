import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
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
    const token = jwt.sign({}, jwt_secret_key, { expiresIn: "1h" });
    console.log("token generated", date, passkey, passkeyShouldBe, jwt_secret_key, token);

    res.cookie("codesnip", token, { httpOnly: true, secure: true });
    res.send({ success: true, token: token });
  } catch (e) {
    console.error(chalk.red("Error occured in login controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

export { login };
