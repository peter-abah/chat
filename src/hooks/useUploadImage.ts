import React, { useState, useEffect } from 'react';

const useUploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (imgUrl) {
      URL.revokeObjectURL(imgUrl)
    }
    const url = image ? URL.createObjectURL(image) : null;
    setImgUrl(url);
  }, [image]);
  
  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.currentTarget.files?.[0];
    if (img) setImage(img);
  };
  
  return { image, setImage, imgUrl, onImgChange };
};

export default useUploadImage;