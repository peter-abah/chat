import classnames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { Message, ChatType } from '@/types';
import { FaFile } from 'react-icons/fa'

interface Props {
  message: Message | null | undefined;
  type: ChatType;
  className?: string;
}

const MessageBody = ({message}: { message?: Message | null }) => {
  if (!message) return <span>No Messages yet</span>

  if ('fileName' in message) {
    return (
      <span className='flex items-center truncate max-w-full'>
        <FaFile className='text-icon mr-1' />
        <span>{message.fileName}</span>
      </span>
    )
  }
  
  return <span>{message.body.substring(0, 300)}</span>;
}

const LastMessage = ({ message, type, className }: Props) => {
  const { currentUser } = useAppContext();

  let userName = message?.userName || '';
  if (message?.userId && (message.userId === currentUser?.uid)) {
    userName = 'You';
  }

  className = classnames(
    className,
    'text-sm max-w-full truncate inline-flex',
    { italic: !userName }
  );
  
  const body = <MessageBody message={message} />
  const showName = message && 
    (message.userId === currentUser?.uid || type === 'group')
  if (showName) {
    return (
      <p className={className}>
        <span className='mr-2'>{userName}:</span>
        {body}
      </p>
    )
  }

  return <p className={className}>{body}</p>
};

export default LastMessage;