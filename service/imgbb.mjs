import chalk from "chalk";
import axios from "axios";
import FormData from "form-data";

export const uploadImage = async (imageData) => {
  try {
    /* remove appended data:image/png;base64, in binary */
    imageData = imageData.slice(imageData.indexOf("base64,") + 7);

    const formData = new FormData();
    formData.append("image", imageData);

    const imgbb_key = process.env.IMGBB_KEY;
    const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: imgbb_url,
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    };

    const response = await axios.request(config);
    console.log(chalk.green("Image file successfully uploaded. ✅", response?.data?.data?.url));

    return response?.data;
  } catch (e) {
    console.log(chalk.red("Error occured in uploadImage service", e));
    return { success: false, error: e.message };
  }
};

export const uploadImageFile = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("image", imageData.buffer, {
      filename: imageData.originalname,
      contentType: imageData.mimetype,
    });

    const imgbb_key = process.env.IMGBB_KEY;
    const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: imgbb_url,
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    };

    const response = await axios.request(config);
    console.log(chalk.green("Image file successfully uploaded. ✅", response?.data?.data?.url));

    return response?.data;
  } catch (e) {
    console.log(chalk.red("Error occured in uploadImage service", e));
    return { success: false, error: e.message };
  }
};
