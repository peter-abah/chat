import { useRef, ImgHTMLAttributes } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { MdClose } from 'react-icons/md';

interface Props {
  imgProps: ImgHTMLAttributes<HTMLImageElement>;
  closeView: () => void;
}
const FullScreenImage = ({imgProps, closeView}: Props) => {
  const ref = useRef(null);
  useOnClickOutside(ref, closeView);

  return (
    <div
      className='fixed z-50 top-0 left-0 h-screen w-screen flex items-center bg-black/70'
    >
      <img
        ref={ref}
        {...imgProps}
        className='w-full max-h-full h-auto object-contain'
      />
      <button
        className='absolute top-4 right-4 border-2 rounded-full border-white p-1'
      >
        <MdClose className='text-3xl font-bold text-white' />
      </button>
    </div>
  )
};

export default FullScreenImage;