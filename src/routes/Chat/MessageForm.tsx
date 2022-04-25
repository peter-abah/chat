import TextArea from 'react-textarea-autosize';

const MessageForm = () => {
  return (
    <form 
      className='sticky bottom-0 z-10 flex items-start p-2'
    >
      <TextArea className='border px-4 py-2 grow' />
      <button className='ml-2 px-3 py-1' type='submit'>Send</button>
    </form>
  )
};

export default MessageForm;