export const removeTags = (inputString) => {
  const htmlTagsRegex = /<[^>]*>/g;

  if (inputString && inputString.trim().length > 0) {
    const stringWithoutTags = inputString.replace(htmlTagsRegex, "");

    return stringWithoutTags;
  } else {
    return false;
  }
};
