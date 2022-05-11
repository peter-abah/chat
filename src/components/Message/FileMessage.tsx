import classnames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { FileMessage as MsgType, Chat} from '@/types';
import { formatTimestamp, formatFileSize } from '@/lib/utils';
import getIconFromMIME from '@/lib/getIconFromMIME';
import { MdDownload } from 'react-icons/md';

interface Props {
  message: MsgType;
  className: string;
  showName: boolean;
}

const FileMessage = ({ message, className, showName }: Props) => {
  const { currentUser } = useAppContext();
  const isUser = message.userId === currentUser?.uid;

  const { fileName, fileSize, url, fileType, userName, timestamp } = message;
  const FileIcon = getIconFromMIME(fileType);
  const iconClass = classnames('text-2xl',
    { 'text-icon-on-primary': isUser, 'text-icon': !isUser }
  );

  return (
    <div className={className}>
      {showName &&
        <span className='font-bold mb-1'>{userName}</span>
      }
      <div className='py-2 flex gap-4 justify-between w-10/12 mx-auto'>
        <FileIcon className={iconClass} />
        <p className='truncate max-w-[70%]'>{fileName}</p>
        <a href={url} download={fileName}>
          <MdDownload className={iconClass} />
        </a>
      </div>
      <div>
        <small className='ml-auto text-xs'>
          {formatFileSize(fileSize)}
        </small>
        <small className='ml-4 text-xs'>
          {formatTimestamp(timestamp*1000, 'd LLL p')}
        </small>
      </div>
    </div>
  )
};

export default FileMessage;