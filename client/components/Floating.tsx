import React from "react";
import Image from "next/image";
import SendSVG from "../assets/send.svg"

interface Props {
    children: React.ReactNode;
}

interface InnerProps {
    onClick: () => void;
}

export const Floating = ({children}: Props) =>
{
    return (
        <div className="fixed z-10 bottom-2.5 right-2.5 flex flex-col gap-1">{children}</div>
    )
}

export const FloatingAddButton = ({onClick}: InnerProps) => {
    return (
        <button className="rounded-3xl h-8 w-8 opacity-50 bg-red-500" onClick={onClick}>+</button>
    ) 
}

export const FloatingSendButton = ({onClick}: InnerProps) => {
    return (
        <button className="relative rounded-3xl p-1 h-8 w-8 opacity-50 bg-red-500" onClick={onClick}>
            <Image className='m-auto' src={SendSVG} alt='send' width={20} height={20} />
        </button>
    ) 
}