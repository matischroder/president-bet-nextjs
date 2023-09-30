import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type LoginButtonProps = {
  providerName: string;
  handleSignIn: () => void;
  background: string;
  color: string;
  widestButtonWidth: number;
  setWidestButtonWidth: Dispatch<SetStateAction<number>>
};

const LoginButton: FC<LoginButtonProps> = ({ providerName, handleSignIn, background, color, widestButtonWidth, setWidestButtonWidth }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const width = buttonRef.current.offsetWidth;
      if (width > widestButtonWidth) {
        setWidestButtonWidth(width);
      }
    }
  }, [widestButtonWidth, setWidestButtonWidth]);

  return (
    <div className='py-1.5'>
      <button
        ref={buttonRef}
        className={`${background} ${color} text-black font-semibold py-2 px-4 rounded flex items-center border border-gray-900`}
        style={{ minWidth: `${widestButtonWidth}px` }}
        onClick={() => handleSignIn()}
      >
        <Image
          src={`/login/${providerName}.svg`}
          width={15}
          height={15}
          alt={`Ingresar con ${providerName}`}
          className="mr-2"
        /><p className='ml-2'>
          Continuar con {providerName[0].toUpperCase() + providerName.slice(1)}</p>
      </button>
    </div>
  );
};

export default LoginButton;
