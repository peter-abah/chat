import { MdCheckCircle } from 'react-icons/md';

interface Props {
  imgUrl?: string | null;
  name: string;
  className: string;
  isSelected?: boolean;
};

const ProfileImage = ({ imgUrl, name, className, isSelected }: Props) => {
  className += ' w-10 h-10 text-lg text-white grid place-items-center rounded-full bg-gray-700';
  let imgElem;
  if (imgUrl) {
    imgElem = <img className={className} src={imgUrl} alt={name} /> 
  } else {
    imgElem = <span className={className}>{name[0]?.toUpperCase()}</span>
  }
  
  return (
    <div className='relative w-fit'>
      {imgElem}
      {isSelected && (
        <MdCheckCircle
          className='absolute right-2 bottom-0 text-lg text-green-400'
        />
      )}
    </div>
  )
};

export default ProfileImage;