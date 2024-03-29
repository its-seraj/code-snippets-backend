export const protect = async (req, res, next) => {
  process.stdout.write("middleware - ");

  const { host } = req.headers;
  if (host === process.env.LOCAL_LISTEN_ADDRESS) {
    process.stdout.write("authenticated \n");
    next();
  } else {
    res.send("hi");
  }
};
