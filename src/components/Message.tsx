import classnames from 'classnames';
import { useAppContext } from'@/context/AppContext';
import { Message as MsgType, Chat} from '@/types';
import { formatTimestamp } from '@/lib/utils';

interface Props {
  message: MsgType;
  chat: Chat;
}
const Message = ({ message, chat }: Props) => {
  const { currentUser } = useAppContext();
  const isUser = message.userId === currentUser?.uid;
  const className = classnames(
    'bg-msg-other grid max-w-[90%] rounded-lg w-fit my-2 p-2 whitespace-pre-wrap',
    {
      'bg-msg-other mr-auto': !isUser,
      'bg-msg-user text-white ml-auto': isUser
    }
  );
  
  const { attachment } = message;
  const showName = chat.type === 'group' && message.userId !== currentUser?.uid;

  return (
    <>
      {attachment?.type === 'image' && (
        <img 
          src={attachment.url}
          className={className}
        />
      )}

      <div className={className}>
        {showName && <span className='font-bold mb-1'>{message.userName}</span>}
        <p>{message.body}</p>
        <small 
          className={classnames(
            'ml-auto text-xs',
            {'text-meta-user': isUser })
          }>
          {formatTimestamp(message.timestamp*1000, 'd LLL p')}
        </small>
      </div>
    </>
  )
};

export default Message;