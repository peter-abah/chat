import { toDate, format } from 'date-fns';
import { PixelCrop } from 'react-image-crop';

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

export const removeProperty = (object: any, key: string) => {
  const { [key]: omit, ...rest } = object;
  return rest;
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// promisify a callback first function.
// returns a promise returning function.
export const promisify = function<T>(
  func: (cb: (data: T) => void, ...args: any[]) => void
) {
  const promiseFunc = (...args: any[]) => {
    return new Promise((resolve, reject) => {
      func((data) => resolve(data), ...args);
    })
  }
  return promiseFunc;
};

export const partitionArray = <T>(arr: T[], partitionLength: number) => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % partitionLength === 0) result.push([]);
    const last = result[result.length - 1]
    last.push(arr[i])
  }
  
  return result;
};

export const getCroppedImage = async (image: HTMLImageElement, crop: PixelCrop) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const canvasToBlobPromise = promisify<Blob | null>(canvas.toBlob.bind(canvas));

  if (!context) throw new Error('canvas context is null');

  let { x, y, width, height } = crop;
  // getting dimensions for image since drawImage uses natural width and
  // crop uses image element width and height.
  const scaleX = image.width / image.naturalWidth;
  const scaleY = image.height / image.naturalHeight;
  x /= scaleX;
  y /= scaleY;
  const cropWidth = width / scaleX;
  const cropHeight = height / scaleY;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(
    image, x, y, cropWidth, cropHeight, 0, 0, width, height
  );

  const blob = await canvasToBlobPromise() as Blob;
  return new File([blob], "");
};

const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
export const formatFileSize = (size: number) => {
  // 0 is special, log 0 is infinity.
  // There can't be negative size so also treat as zero
  if (size <= 0) return '0 B';

  // gets the exponent
  let n = Math.floor(Math.log(size) / Math.log(1024));
  
  // converts it to a number between 1 and 1023
  const reducedSize = Math.floor(size / (1024 ** n))
  
  // For extremely large sizes, size > 1024 yottabyte
  if (n > 8) n = 8;
  
  return `${reducedSize} ${sizes[n]}`
}