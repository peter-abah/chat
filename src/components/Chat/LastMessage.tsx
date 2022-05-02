import classnames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { Message, ChatType } from '@/types';

interface Props {
  message: Message | null | undefined;
  type: ChatType;
  className?: string;
};

const LastMessage = ({ message, type, className }: Props) => {
  const { currentUser } = useAppContext();
  let userName = message?.userName || '';
  if (message?.userId && (message.userId === currentUser?.uid)) {
    userName = 'You';
  }

  const body = message ? 
    message.body.substring(0, 300) :
    'No messages yet.';
  className += classnames(
    ' text-sm max-w-full truncate',
    { italic: !userName }
  );
  
  if (type === 'group' && message?.userName) {
    return <p className={className}>{userName}: {body}</p>;
  }

  return <p className={className}>{body}</p>
};

export default LastMessage;