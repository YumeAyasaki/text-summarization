import React from "react";

interface Props {
    children: React.ReactNode;
}

interface InnerProps {
    onClick: () => void;
}

export const Floating = ({children}: Props) =>
{
    return (
        <div className="fixed z-10 bottom-2.5 right-2.5 ">{children}</div>
    )
}

export const FloatingButton = ({onClick}: InnerProps) => {
    return (
        <button className="rounded-3xl h-6 w-6 opacity-50 bg-red-500" onClick={onClick}>+</button>
    ) 
}