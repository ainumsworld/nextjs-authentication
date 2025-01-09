export const sendResponse = <
  T extends { message: string } & Record<string, unknown>,
>(
  data: T,
) => data;
