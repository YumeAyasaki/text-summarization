import React from 'react';
import Image from 'next/image';
import SendSVG from '../assets/send.svg';
import UploadSVG from '../assets/upload.svg';

interface Props {
  children: React.ReactNode;
}

interface InnerProps {
  onClick: () => void;
}

interface EventInnerProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Floating = ({ children }: Props) => {
  return (
    <div className='fixed bottom-2.5 right-2.5 z-10 flex flex-col gap-1'>
      {children}
    </div>
  );
};

export const FloatingAddButton = ({ onClick }: InnerProps) => {
  return (
    <button
      className='h-8 w-8 rounded-3xl bg-red-500 opacity-50'
      onClick={onClick}
    >
      +
    </button>
  );
};

export const FloatingSendButton = ({ onClick }: InnerProps) => {
  return (
    <button
      className='relative h-8 w-8 rounded-3xl bg-red-500 p-1 opacity-50'
      onClick={onClick}
    >
      <Image
        className='m-auto'
        src={SendSVG}
        alt='send'
        width={20}
        height={20}
      />
    </button>
  );
};

export const FloatingMassUploadButton = ({ onClick }: EventInnerProps) => {
  return (
    <button
      className='relative h-8 w-8 rounded-3xl bg-red-500 p-1 opacity-50'
      onClick={onClick}
    >
      <Image
        className='m-auto'
        src={UploadSVG}
        alt='send'
        width={20}
        height={20}
      />
    </button>
  );
};
