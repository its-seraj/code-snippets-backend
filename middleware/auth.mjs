export const protect = async (req, res, next) => {
  process.stdout.write("middleware - ");

  const allowedAddress = process.env.LOCAL_LISTEN_ADDRESS.split(",");

  const { host } = req.headers;
  if (allowedAddress.includes(host)) {
    process.stdout.write("authenticated \n");
    next();
  } else {
    res.send({ success: false, message: "Middleware not allowing this request" });
  }
};
