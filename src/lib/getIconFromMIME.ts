import {
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileAlt,
  FaFileCode,
  FaFileArchive,
  FaFile
} from 'react-icons/fa';

interface IconClassesType {
  // All the icons have the same signature so using any IconCompoent for type
  [index: string]: typeof FaFile;
}
const ICON_CLASSES: IconClassesType = {
  // Media
  image: FaFileImage,
  audio: FaFileAudio,
  video: FaFileVideo,
  // Documents
  "application/pdf": FaFilePdf,
  "application/msword": FaFileWord,
  "application/vnd.ms-word": FaFileWord,
  "application/vnd.oasis.opendocument.text": FaFileWord,
  "application/vnd.openxmlformats-officedocument.wordprocessingml":
    FaFileWord,
  "application/vnd.ms-excel": FaFileExcel,
  "application/vnd.openxmlformats-officedocument.spreadsheetml":
    FaFileExcel,
  "application/vnd.oasis.opendocument.spreadsheet": FaFileExcel,
  "application/vnd.ms-powerpoint": FaFilePowerpoint,
  "application/vnd.openxmlformats-officedocument.presentationml":
    FaFilePowerpoint,
  "application/vnd.oasis.opendocument.presentation": FaFilePowerpoint,
  "text/plain": FaFileAlt,
  "text/html": FaFileCode,
  "application/json": FaFileCode,
  // Archives
  "application/gzip": FaFileArchive,
  "application/zip": FaFileArchive
};

const getIconFromMIME = (mimeType: string) => {
  for (let key of Object.keys(ICON_CLASSES)) {
    if (mimeType.startsWith(key)) {
      return ICON_CLASSES[key];
    }
  }
  
  return FaFile;
}

export default getIconFromMIME;