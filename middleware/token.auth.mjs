import cookie from "cookie";
import jwt from "jsonwebtoken";
import chalk from "chalk";

export const authenticateToken = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  if (!cookies?.codesnip) {
    console.log(chalk.red("Error: cookie not found"));
    return res.status(401).send({ success: false, error: "Unauthorized" });
  }
  const token = cookies.codesnip;

  const jwt_secret_key = process.env.UUID_NAMESPACE;
  jwt.verify(token, jwt_secret_key, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ error: err.message });
    }
    next();
  });
};
