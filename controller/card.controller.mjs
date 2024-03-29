import chalk from "chalk";
import { validateCard, saveOrUpdateCard, getCards } from "../core/card.core.mjs";

const newCard = async (req, res) => {
  try {
    const { body } = req;

    const validatedData = await validateCard(body);
    if (validatedData) {
      const dbResp = await saveOrUpdateCard(validatedData);

      return res.send({ success: true, data: dbResp });
    }

    return res.status(400).send({ success: false, message: "Something went wrong." });
  } catch (e) {
    console.error(chalk.red("Error occured in NewCard controller"), e);
    res.status(400).send({ success: false, message: e.message });
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
