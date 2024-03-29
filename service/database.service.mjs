import mongoose from "mongoose";
import chalk from "chalk";

export const mongodb = () => {
  try {
    const dburl = process.env.MONGO_URL;
    mongoose.connect(dburl);

    mongoose.connection.on("connected", () => {
      console.log(chalk.bold.green(`connected to mongoDB`));
    });

    mongoose.set('debug', true);

    mongoose.connection.on("error", (err) => {
      console.log(chalk.bold.red(`MongoDB has occured ${err}`));
    });

    mongoose.connection.on("disconnected", () => {
      console.log(chalk.grey.bold("MongoDB disconnected"));
    });

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("MongoDB is disconnected due to application termination");
        process.exit(0);
      });
    });
  } catch (e) {}
};
