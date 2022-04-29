import { Message, ChatType } from '@/types';

interface Props {
  message: Message;
  type: ChatType;
  className?: string;
};

const LastMessage = ({ message, type, className }: Props) => {
  const { userName } = message;
  const body = message.body.substring(0, 300);
  className += ' text-sm max-w-full truncate'
  if (type === 'group') {
    return <p className={className}>{userName}: {body}</p>;
  }

  return <p className={className}>{body}</p>
};

export default LastMessage;