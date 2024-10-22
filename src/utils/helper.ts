const generateRandomString = (length: number) => {
  return Array(length)
    .fill(null)
    .map(() => Math.floor(Math.random() * 10).toString())
    .join("");
};

export { generateRandomString };
