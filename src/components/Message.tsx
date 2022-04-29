import classnames from 'classnames';
import { useAppContext } from'@/context/AppContext';
import { Message as MsgType} from '@/types';

const Message = ({ message }: { message: MsgType}) => {
  const { currentUser } = useAppContext();
  const className = classnames(
    'bg-msg-other max-w-[90%] rounded-lg w-fit my-2 p-2 whitespace-pre-wrap',
    {
      'bg-msg-other mr-auto': message.userId !== currentUser?.uid,
      'bg-msg-user text-white ml-auto': message.userId === currentUser?.uid
    }
  )
  return (
    <div className={className}>
      <p>{message.body}</p>
    </div>
  )
};

export default Message;