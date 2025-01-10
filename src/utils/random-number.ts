export const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
};

export const generateRandomNumberInRange = (min: number, max: number) => {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomNumberOfDigits = (length: number) => {
  if (length <= 0) throw new Error("Length must be a positive integer.");
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return generateRandomNumberInRange(min, max);
};
