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

const getSVGs = async () => {
  try {
    const cards = await svgModel.find({ isDeleted: false });

    return cards;
  } catch (e) {
    console.error(chalk.red("Error occured error in getSVGs core"), e);
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

export { saveOrUpdateSVG, getSVGs, deleteSVGCore };
