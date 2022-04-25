interface Props {
  imgUrl?: string | null;
  name: string;
  className: string;
};

const ProfileImage = ({ imgUrl, name, className }: Props) => {
  className += ' w-12 h-12 text-lg text-white grid place-items-center rounded-full bg-gray-700';

  if (imgUrl) {
    return (
      <img className={className} src={imgUrl} alt={name} />
    )
  }
  
  return (
    <span className={className}>
      {name[0]?.toUpperCase()}
    </span>
  )
};

export default ProfileImage;