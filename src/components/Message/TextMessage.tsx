import classnames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { TextMessage as MsgType, Chat} from '@/types';
import { formatTimestamp } from '@/lib/utils';

import ImageWithView from '../ImageWithView'

interface Props {
  message: MsgType;
  className: string;
  showName: boolean;
}

const Message = ({ message, className, showName }: Props) => {
  const { currentUser } = useAppContext();
  const isUser = message.userId === currentUser?.uid;

  const imgClassName = classnames(
    'max-w-[15rem] w-[90%] rounded-lg bg-msg-other max-w-[25rem]',
    { 'ml-auto': isUser, 'mr-auto': !isUser }
  );
  
  const { userName, attachment, body, timestamp } = message;
  return (
    <>
      {attachment?.type === 'image' && (
        <ImageWithView
          src={attachment.url}
          className={imgClassName}
          width={225}
          height={400}
        />
      )}

      <div className={className}>
        {showName &&
          <span className='font-bold mb-1'>{userName}</span>
        }
        <p>{body}</p>
        <small className='ml-auto text-xs'>
          {formatTimestamp(timestamp*1000, 'd LLL p')}
        </small>
      </div>
    </>
  )
};

export default Message;