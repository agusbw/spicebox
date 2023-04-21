export const splitWordsToArray = (string) => {
  if (!string) return [];
  let str = string.toLowerCase().replace(/\s/g, "").split(",");
  return str;
};

export const getFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};
