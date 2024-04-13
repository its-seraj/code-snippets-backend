import chalk from "chalk";
import { v5 as uuidv5 } from "uuid";
import AdmZip from "adm-zip";
import { saveOrUpdateSVG, getSVGs, getCounts, deleteSVGCore } from "../core/svg.core.mjs";

const newSVG = async (req, res) => {
  try {
    const { body } = req;

    if (body?.svg) {
      const dbObject = {
        ...body,
      };

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
    const { offset } = req.query;
    const svgsData = await getSVGs(offset ?? 0);

    return res.send({ success: true, count: svgsData?.length, data: svgsData });
  } catch (e) {
    console.error(chalk.red("Error occured in getSVG controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};

const getCount = async (req, res) => {
  try {
    const counts = await getCounts();

    return res.send({ success: true, counts: counts });
  } catch (e) {
    console.error(chalk.red("Error occured in getCount controller"), e);
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

const zipUpload = async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== "application/zip") {
      return res.status(400).send("Please upload a ZIP file.");
    }
    console.log(req.file);

    const zip = new AdmZip(req.file.buffer);
    const zipEntries = zip.getEntries();
    const finalArray = [];
    for (const entry of zipEntries) {
      if (entry.isDirectory || !entry.entryName?.includes(".svg") || entry.entryName?.includes("svgexport")) {
        // Skip directories and non-SVG files
        continue;
      }

      const icon_name = entry.entryName?.split(".svg")?.[0];
      const title = icon_name || "";
      const category = req.body.category;
      const svg = zip.readAsText(entry);
      const svgUuid = uuidv5(`${title}${new Date().toISOString()}`, process.env.UUID_NAMESPACE);
      const finalObj = {
        svgUuid,
        title,
        category,
        svg,
      };
      const dbResp = await saveOrUpdateSVG(finalObj);
      if (dbResp) {
        finalArray.push(finalObj);
      }
    }

    console.log("SVG object with length", finalArray[0], finalArray?.length);

    res.send({ success: true, message: "svg uploaded successfully.", count: finalArray?.length });
  } catch (e) {
    console.error(chalk.red("Error occured in zipUpload controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};

export { newSVG, getSVG, getCount, deleteSVG, zipUpload };
