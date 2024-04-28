import chalk from "chalk";
import { saveImg, getImg, saveSong, getSongs as getSongsCore } from "../core/lofi.core.mjs";
import { uploadImageFile } from "../service/imgbb.mjs";

const newImage = async (req, res) => {
  try {
    const { body } = req;

    const { image } = body;
    /* delete image object */
    delete body.image;

    const imgResp = await uploadImageFile(req.file);
    const returnData = { ...req.body };
    if (imgResp.success) {
      returnData.images = {
        image: imgResp.data.image?.url,
        thumb: imgResp.data.thumb?.url,
        medium: imgResp.data.medium?.url,
      };
    }
    const dbResp = await saveImg(returnData);

    return res.send({ success: true, data: dbResp });
  } catch (e) {
    console.error(chalk.red("Error occured in newImage-lofi controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getImages = async (req, res) => {
  try {
    const imageData = await getImg();

    return res.send({ success: true, count: imageData?.length, data: imageData });
  } catch (e) {
    console.error(chalk.red("Error occured in getImages-lofi controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};
const newSong = async (req, res) => {
  try {
    const { body } = req;
    if (Object.keys(body)?.length <= 0) {
      return res.send({ success: false, error: "body shouldn't empty" });
    }

    const dbResp = await saveSong(body);

    return res.send({ success: true, data: dbResp });
  } catch (e) {
    console.error(chalk.red("Error occured in newSong-lofi controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getSongs = async (req, res) => {
  try {
    const songsData = await getSongsCore();

    return res.send({ success: true, count: songsData?.length, data: songsData });
  } catch (e) {
    console.error(chalk.red("Error occured in getSongs-lofi controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};

export { newImage, getImages, newSong, getSongs };
