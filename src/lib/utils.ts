export const serializeError = (error: any) => {
  return JSON.stringify(
    error,
    Object.getOwnPropertyNames(error)
  );
};