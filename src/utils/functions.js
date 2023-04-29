export const splitWordsToArray = (string) => {
  if (!string) return [];
  let str = string.toLowerCase().replace(/\s/g, "").split(",");
  return str;
};

export const getFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

export const getInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`;
};

export const joinWords = (array) => {
  return array.join(", ");
};
