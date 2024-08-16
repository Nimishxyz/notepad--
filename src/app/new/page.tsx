"use client";
import '@/app/ui/global.css';
import { roboto_mono } from "../fonts";
import TextBox  from "../ui/TextBox";
import { useState } from 'react';
export default function NewNote() {
    const [typedText, setTypedText] = useState("");
    return (
        <html lang="en" className={roboto_mono.className}>
            <body className="bg-black">
                <div className="flex flex-col items-center justify-center h-screen">     
                    <TextBox placeholder='Start Reverse Typing, Ctrl+S to Save.' disabled={false} text={typedText} setText={setTypedText} className='flex bg-black text-white text-2xl w-full h-full h-screen'/>
                </div>
            </body>
        </html>
      );
}