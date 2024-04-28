import { lofiImgModel } from "../model/lofiImg.model.mjs";
import { lofiSongsModel } from "../model/lofiSongs.model.mjs";
import chalk from "chalk";

const saveImg = async (imgBody) => {
  try {
    const dbObject = new lofiImgModel(imgBody);
    return await dbObject
      .save()
      .then((updatedDoc) => {
        console.log(chalk.green("image is upserted.👍"), updatedDoc);
        return updatedDoc;
      })
      .catch((e) => {
        console.log(chalk.red("Error occured while saveImg-lofi", e));
      });
  } catch (e) {
    console.error(chalk.red("Error occured in saveImg-lofi core", e));
    return false;
  }
};

const getImg = async () => {
  try {
    const dbResp = await lofiImgModel.aggregate([{ $sample: { size: 1000000 } }]);
    const imageArr = dbResp.map((itr) => itr?.images?.image);

    return imageArr;
  } catch (e) {
    console.error(chalk.red("Error occured error in getImg-lofi core"), e);
    return false;
  }
};
const saveSong = async (songBody) => {
  try {
    return await lofiSongsModel
      .findOneAndUpdate({}, songBody, {
        upsert: true,
        new: true,
      })
      .then((updatedDoc) => {
        console.log(chalk.green("song is upserted.👍"), updatedDoc);
        return updatedDoc;
      })
      .catch((e) => {
        console.log(chalk.red("Error occured while saveSong-lofi", e));
      });
  } catch (e) {
    console.error(chalk.red("Error occured in saveSong-lofi core", e));
    return false;
  }
};

const getSongs = async () => {
  try {
    const dbResp = await lofiSongsModel.aggregate([{ $sample: { size: 1000000 } }]);
    const imageArr = dbResp.map((itr) => itr?.images?.image);

    return imageArr;
  } catch (e) {
    console.error(chalk.red("Error occured error in getSongs-lofi core"), e);
    return false;
  }
};

/* const deleteCardCore = async (userId, cardUuid) => {
  try {
    const cards = await cardModel.deleteOne({ userId, cardUuid });

    return cards;
  } catch (e) {
    console.error(chalk.red("Error occured error in deleteCard core"), e);
    return false;
  }
}; */

export { saveImg, getImg, saveSong, getSongs };
