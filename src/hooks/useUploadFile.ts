import React, { useState, useEffect } from 'react';

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl)
    }
    const url = file ? URL.createObjectURL(file) : null;
    setFileUrl(url);
  }, [file]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) setFile(file);
  };
  
  return { file, setFile, fileUrl, handleFileChange };
};

export default useUploadFile;