import { useState, ImgHTMLAttributes } from 'react';
import FullScreenImage from '@/components/FullScreenImage';

type Props = ImgHTMLAttributes<HTMLImageElement>
const ImageWithView = (props: Props) => {
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <>
      <img {...props} onClick={() => setIsViewOpen(true)} />
      {isViewOpen && (
        <FullScreenImage
          imgProps={props}
          closeView={() => setIsViewOpen(false)}
        />
      )}
    </>
  )
};

export default ImageWithView;