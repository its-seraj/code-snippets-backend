import { v5 as uuidv5 } from "uuid";
import { svgModel } from "../model/svg.model.mjs";
import chalk from "chalk";

const saveOrUpdateSVG = async (svgBody) => {
  try {
    if (!svgBody.svgUuid) {
      svgBody.svgUuid = uuidv5(`${svgBody.title}${new Date().toISOString()}`, process.env.UUID_NAMESPACE);
    }
    return await svgModel
      .findOneAndUpdate({ svgUuid: svgBody.svgUuid }, svgBody, {
        upsert: true,
        new: true,
      })
      .then((updatedDoc) => {
        console.log(chalk.green("svg is upserted.👍"), updatedDoc);
        return updatedDoc;
      })
      .catch((e) => {
        console.log(chalk.red("Error occured while creating svg", e));
      });
  } catch (e) {
    console.error(chalk.red("Error occured in saveOrUpdateSVG core", e));
    return false;
  }
};

const getSVGs = async (offset, search) => {
  try {
    if (search) {
      return await svgModel
        .find({
          isDeleted: false,
          $or: [{ title: { $regex: new RegExp(search, "i") } }, { category: { $regex: new RegExp(search, "i") } }],
        })
        .skip(offset)
        .limit(200);
    }
    const cards = await svgModel.find({ isDeleted: false }).skip(offset).limit(200);

    return cards;
  } catch (e) {
    console.error(chalk.red("Error occured error in getSVGs core"), e);
    return false;
  }
};

const getCounts = async (search) => {
  try {
    if (search) {
      return await svgModel.countDocuments({ isDeleted: false, $or: [{ title: { $regex: new RegExp(search, "i") } }, { category: { $regex: new RegExp(search, "i") } }] });
    }
    const counts = await svgModel.countDocuments({ isDeleted: false });

    return counts;
  } catch (e) {
    console.error(chalk.red("Error occured error in getCounts core"), e);
    return false;
  }
};

const deleteSVGCore = async (svgUuid) => {
  try {
    const cards = await svgModel.deleteOne({ svgUuid });

    return cards;
  } catch (e) {
    console.error(chalk.red("Error occured error in deleteSVG core"), e);
    return false;
  }
};

export { saveOrUpdateSVG, getSVGs, getCounts, deleteSVGCore };
