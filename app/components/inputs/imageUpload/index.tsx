'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { FC, useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import { ImageUploadProps } from '@/app/interfaces/inputs/imageUpload';

declare global {
  var cloudinary: any;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='ikmb1htj'
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className={styles['image-upload']}>
            <TbPhotoPlus size={50} />
            <div className={styles['image-upload__text']}>Click to upload</div>
            {value && (
              <div className='absolute w-full h-full inset-0'>
                <Image
                  fill
                  src={value}
                  alt='uploaded image'
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
