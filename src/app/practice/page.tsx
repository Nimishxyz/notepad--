'use client'
import '@/app/ui/global.css';
import { roboto_mono } from "../fonts";
import TextBox from "../ui/TextBox";
import { useEffect, useState } from 'react';

function findTypos(str1: string, str2: string) {
    let typos: number[] = [];
    str2.split("").forEach(function (character, index) {
        if (character !== str1.charAt(index)) typos.push(index);
    });
    return typos;
}

export default function Practice() {
    const paragraph = `Coding is the best.`;

    const [typedText, setTypedText] = useState("");
    const [speed, setSpeed] = useState(0);
    const [time, setTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [typoIndexes, setTypoIndexes] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setTypoIndexes(findTypos(paragraph, typedText));

        if (typedText.length === 1 && time === null) {
            setTime(new Date().getTime());
        } else if (typedText.length === 0) {
            setSpeed(0);
            setTime(null);
            setElapsedTime(0);
        } else {
            const t = new Date().getTime();
            const wordsTyped = typedText.trim().split(" ");
            const correctWords = wordsTyped.filter((word, index) => {
                const paragraphWords = paragraph.split(" ").slice(0, index + 1);
                return word === paragraphWords[index];
            });

            const elapsedMinutes = (t - time!) / 60000;
            const wpm = Math.floor(correctWords.length / elapsedMinutes);
            setSpeed(wpm);
            setElapsedTime(Math.floor((t - time!) / 1000)); // Update elapsed time in seconds

            // Check if the typing is complete
            if (typedText === paragraph) {
                setIsComplete(true);
            }
        }
    }, [typedText]);

    return (
        <html lang="en" className={roboto_mono.className}>
            <body className="bg-black overflow-hidden">
                
                <div className="flex flex-row items-center justify-center h-screen min-w-full">
                    <TextBox placeholder='Type Each Word Reversely.' disabled={false} text={typedText} setText={setTypedText} className='flex bg-black text-white text-2xl w-1/2 h-full h-screen'/>
                    <p className='bg-black text-white text-2xl w-1/2 h-full h-screen'>
                        {paragraph.split("").map((character, index) => {
                            const characterClass = typedText.length > index
                                ? typoIndexes.includes(index)
                                    ? "incorrect"
                                    : "correct"
                                : "";
                            return (
                                <span key={index} className={characterClass}>
                                    {character}
                                </span>
                            );
                        })}
                    </p>
                </div>
                <p className='absolute bottom-0 right-0 text-white text-2xl w-1/2'>
                    Speed: {speed} WPM | Time: {elapsedTime} seconds
                </p>

                {isComplete && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                        <div className="mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
                            <div className="h-fit w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                                <div className="flex flex-col h-full w-full items-center justify-center bg-gray-800 back p-5">
                                    <h1 className="text-white text-4xl font-bold mb-4">Congratulations!</h1>
                                    <h1 className="text-white text-2xl">You've completed the paragraph.</h1>
                                    <h1 className="text-white text-2xl mt-2">Your speed: {speed} WPM</h1>
                                    <h1 className="text-white text-2xl mt-2">Elapsed time: {elapsedTime} seconds</h1>
                                    <button
                                        className="m-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                                        onClick={() => {
                                            setTypedText(""); // Reset typing
                                            setIsComplete(false); // Hide the congratulatory box
                                            setSpeed(0);
                                            setTime(null);
                                            setElapsedTime(0);
                                        }}
                                    >
                                        Start Again
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </body>
        </html>
    );
}