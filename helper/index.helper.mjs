export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month as it's zero-based
  // const year = date.getFullYear();
  return `${day}${month}`;
};
