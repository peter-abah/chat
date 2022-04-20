import { Message, ChatType } from '../../types';

interface Props {
  message: Message;
  type: ChatType;
  className?: string;
};

const LastMessage = ({ message, type, className }: Props) => {
  const { userName, body } = message;
  className += ' text-sm'
  if (type === 'group') {
    return <p className={className}>{userName}: {body}</p>;
  }

  return <p className={className}>{body}</p>
};

export default LastMessage;