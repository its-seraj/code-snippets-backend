import chalk from "chalk";
import { saveOrUpdateSVG, getSVGs, deleteSVGCore } from "../core/svg.core.mjs";

const newSVG = async (req, res) => {
  try {
    const { body } = req;

    if (body?.svg) {
      const dbObject = {
        ...body
      }
      
      const dbResp = await saveOrUpdateSVG(dbObject);

      return res.send({ success: true, data: dbResp });
    }

    return res.status(400).send({ success: false, error: "svg not found" });
  } catch (e) {
    console.error(chalk.red("Error occured in NewCard controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getSVG = async (req, res) => {
  try {
    const svgsData = await getSVGs();

    return res.send({ success: true, count: svgsData?.length, data: svgsData });
  } catch (e) {
    console.error(chalk.red("Error occured in getSVG controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};

const deleteSVG = async (req, res) => {
  try {
    const { svgUuid } = req.query;

    const cardsData = await saveOrUpdateSVG({ svgUuid, isDeleted: true });

    return res.send({ success: true, data: cardsData });
  } catch (e) {
    console.error(chalk.red("Error occured in deleteSVG controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};

export { newSVG, getSVG, deleteSVG };
