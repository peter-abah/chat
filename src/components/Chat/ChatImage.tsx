import { Chat } from '../../types';
import { getChatInfo } from '../../lib/chats';

interface Props {
  chat: Chat;
  className?: string;
};

const ChatImage = ({ chat, className }: Props) => {
  const { picture, name } = getChatInfo(chat);
  className += ' w-10 h-10 rounded-full bg-gray-700';

  if (picture) {
    return <img className={className} src={picture} alt={name} />
  }
  
  return <span className={className} />
};

export default ChatImage;