import { Message as MsgType} from '@/types';

const Message = ({ message }: { message: MsgType}) => {
  return (
    <div className='border rounded-lg w-fit my-2 p-2'>
      <p>{message.body}</p>
    </div>
  )
};

export default Message;