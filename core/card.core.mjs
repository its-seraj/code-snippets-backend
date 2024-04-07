import { v5 as uuidv5 } from "uuid";
import { removeTags } from "../helper/validate.helper.mjs";
import { cardModel } from "../model/card.model.mjs";
import chalk from "chalk";

const validateCard = (cardBody) => {
  try {
    const validatedCardBody = cardBody;

    if (validatedCardBody.title) {
      const validatedTitle = removeTags(validatedCardBody.title);
      if (validatedTitle) {
        validatedCardBody.title = validatedTitle;
      } /* else {
        throw new Error("Title not provided.");
      } */
    } /* else {
      throw new Error("Title not provided.");
    } */
    /* if (validatedCardBody.description) {
      const validateddescription = removeTags(validatedCardBody.description);
      if (validateddescription) {
        validatedCardBody.description = validateddescription;
      } else {
        throw new Error("description not provided.");
      }
    } else {
      throw new Error("description not provided.");
    } */
    if (!validatedCardBody.cardUuid) {
      validatedCardBody.cardUuid = uuidv5(`${validatedCardBody.userId}${validatedCardBody.title}${new Date().toISOString()}`, process.env.UUID_NAMESPACE);
    }
    validatedCardBody.status = true;

    return validatedCardBody;
  } catch (e) {
    console.error(chalk.red("Error occured in validateCard core", e));
    return { status: false, error: e };
  }
};

const saveOrUpdateCard = async (cardBody) => {
  try {
    return await cardModel
      .findOneAndUpdate({ cardUuid: cardBody.cardUuid }, cardBody, {
        upsert: true,
        new: true,
      })
      .then((updatedDoc) => {
        console.log(chalk.green("card is upserted.👍"), updatedDoc);
        return updatedDoc;
      })
      .catch((e) => {
        console.log(chalk.red("Error occured while creating card", e));
      });
  } catch (e) {
    console.error(chalk.red("Error occured in saveOrUpdateCard core", e));
    return false;
  }
};

const getCards = async (userId) => {
  try {
    const cards = await cardModel.find({ userId, isDeleted: false }).sort({ displayorder: 1 });

    return cards;
  } catch (e) {
    console.error(chalk.red("Error occured error in getCards core"), e);
    return false;
  }
};

const deleteCardCore = async (userId, cardUuid) => {
  try {
    const cards = await cardModel.deleteOne({ userId, cardUuid });

    return cards;
  } catch (e) {
    console.error(chalk.red("Error occured error in deleteCard core"), e);
    return false;
  }
};

export { validateCard, saveOrUpdateCard, getCards, deleteCardCore };
