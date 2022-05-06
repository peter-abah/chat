import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

import toast from 'react-hot-toast';
import { getCroppedImage, serializeError } from '@/lib/utils';

interface Props {
  src: string | null;
  onSaveCrop: (croppedImage: File, crop: PixelCrop) => void
};

function CropDemo({ src, onSaveCrop }: Props) {
  const navigate = useNavigate();
  const [crop, setCrop] = useState<PixelCrop>();
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const {width, height} = e.currentTarget;
    const length = Math.min(width, height) / 3;
    
    // center crop with aspect ratio of 
    setCrop({
      unit: 'px',
      x: length,
      y: length,
      width: length,
      height: length
    })
  };
  
  const _onSaveCrop = async () => {
    try {
      if (!imageRef.current || !crop) return;

      const croppedImage = await getCroppedImage(imageRef.current, crop);

      onSaveCrop(croppedImage, crop);
      navigate(-1);
    } catch (e) {
      toast.error('Unable to crop');
      navigate(-1);
    }
  };

  return (
    <div
      className='min-w-screen min-h-screen p-8 flex flex-col items-center justify-center'
    >
      <ReactCrop crop={crop} aspect={1} keepSelection onChange={c => setCrop(c)}>
        <img
          ref={imageRef}
          className='w-full h-auto max-h-full max-w-full'
          src={src || ''} 
          onLoad={handleImageLoad}
        />
      </ReactCrop>
      <button
        className='bg-primary rounded-lg text-white px-4 py-2 mt-8'
        type='button'
        onClick={_onSaveCrop}
      >Save Crop</button>
    </div>
  );
};

export default CropDemo;