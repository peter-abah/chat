import classnames from 'classnames';
import { useAppContext } from'@/context/AppContext';
import { Message as MsgType, Chat} from '@/types';
import { formatTimestamp } from '@/lib/utils';

import TextMessage from './TextMessage';
import FileMessage from './FileMessage';

interface Props {
  message: MsgType;
  chat: Chat;
}
const Message = ({ message, chat }: Props) => {
  const { currentUser } = useAppContext();
  const isUser = message.userId === currentUser?.uid;

  const className = classnames(
    'bg-msg-other grid max-w-[90%] md:max-w-[60%]',
    'rounded-lg w-fit my-2 p-2 whitespace-pre-wrap',
    { 
      'bg-msg-other mr-auto': !isUser,
      'bg-msg-user text-white ml-auto': isUser
    }
  );
  
  const showName = chat.type === 'group' && message.userId !== currentUser?.uid
  
  if ('fileName' in message) { // message is file
    return (
      <FileMessage
        message={message}
        className={className}
        showName={showName}
      />
    );
  }
  
  // message is text
  return (
    <TextMessage
      message={message}
      className={className}
      showName={showName}
    />
  );
};

export default Message;