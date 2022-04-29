import { toDate, format } from 'date-fns';

export const serializeError = (error: any) => {
  return JSON.stringify(
    error,
    Object.getOwnPropertyNames(error)
  );
};

export const formatTimestamp = (
  timestamp: number,
  formatStr: string,
  options?: any
) => {
  return format(toDate(timestamp), formatStr, options);
};