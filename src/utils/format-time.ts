export const convertToMilliseconds = (
  value: number,
  unit: "seconds" | "minutes" | "hours" | "days",
): number => {
  if (value <= 0) throw new Error(`${unit} must be a positive integer.`);

  const unitMultipliers = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
  };

  return value * unitMultipliers[unit];
};

export const getFutureTime = (durationInMs: number): Date => {
  return new Date(Date.now() + durationInMs);
};
