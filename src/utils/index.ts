export const sendResponse = <
  T extends { message: string } & Record<string, unknown>,
>(
  data: T,
) => {
  return data;
};

export const switchInvalidCase = (message?: string): never => {
  throw new Error(
    message || "Unhandled or invalid case encountered in switch statement.",
  );
};
