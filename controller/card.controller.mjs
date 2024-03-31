import chalk from "chalk";
import { validateCard, saveOrUpdateCard, getCards } from "../core/card.core.mjs";
import { uploadImage } from "../service/imgbb.mjs";

const newCard = async (req, res) => {
  try {
    const { body } = req;

    const { image } = body;
    /* delete image object */
    delete body.image;

    const validatedData = await validateCard(body);
    if (validatedData?.status === true) {
      /* delete status - used for validation only */
      delete validatedData.status;

      const imgResp = await uploadImage(image);
      if (imgResp.success) {
        validatedData.images = {
          image: imgResp.data.image?.url,
          thumb: imgResp.data.thumb?.url,
          medium: imgResp.data.medium?.url,
        };
      }
      const dbResp = await saveOrUpdateCard(validatedData);

      return res.send({ success: true, data: dbResp });
    }

    return res.status(400).send({ success: false, error: validatedData?.error?.message });
  } catch (e) {
    console.error(chalk.red("Error occured in NewCard controller"), e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getCard = async (req, res) => {
  try {
    const { userId } = req.query;

    const cardsData = await getCards(userId);

    return res.send({ success: true, data: cardsData });
  } catch (e) {
    console.error(chalk.red("Error occured in getCard controller"), e);
    res.status(400).send({ success: false, message: e.message });
  }
};

export { newCard, getCard };
