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
const paragraphs = [
    "In a world where technology advances at a rapid pace, staying current with the latest trends and tools becomes essential. The integration of artificial intelligence into everyday applications has opened up new possibilities, transforming how we interact with our devices and access information. Whether it's through virtual assistants that help manage our schedules or algorithms that recommend content tailored to our interests, AI is becoming an increasingly integral part of our lives. As we embrace these innovations, it’s important to consider both the opportunities and the ethical implications they present, ensuring that technology serves to enhance our lives while respecting privacy and security.",
  
    "The art of storytelling has evolved significantly over the centuries, adapting to the changing mediums and cultural contexts of different eras. From oral traditions passed down through generations to the written word and modern digital formats, storytelling remains a powerful way to convey ideas, emotions, and experiences. Each medium brings its own unique qualities to the narrative, influencing how stories are told and received. As technology continues to advance, new forms of storytelling, such as interactive media and virtual reality, offer exciting opportunities for creative expression and audience engagement. The enduring appeal of storytelling lies in its ability to connect us to our shared humanity and spark our imagination.",
  
    "Gardening is more than just a hobby; its a practice that offers numerous benefits for both physical and mental well-being. Cultivating a garden allows individuals to connect with nature, enjoy the outdoors, and engage in a productive and rewarding activity. The process of planting, nurturing, and harvesting plants can be both therapeutic and fulfilling, providing a sense of accomplishment and relaxation. Additionally, gardening can promote healthy eating by encouraging the consumption of fresh, home-grown produce. Whether tending to a small balcony garden or a large backyard plot, the act of gardening can enhance one's quality of life and contribute to overall health and happiness.",
  
    "Exploring different cuisines is a delightful way to experience new cultures and broaden ones palate. Each region of the world has its own unique culinary traditions, shaped by its history, geography, and local ingredients. From the spicy curries of India to the delicate pastries of France, the diversity of flavors and cooking techniques offers endless opportunities for culinary exploration. Trying new dishes can also be an educational experience, as it provides insight into the customs and values of different communities. Whether cooking at home or dining out, embracing a variety of cuisines can enrich one's understanding of global cultures and enhance the enjoyment of food.",
  
    "The importance of regular exercise cannot be overstated when it comes to maintaining a healthy lifestyle. Engaging in physical activity has been shown to provide numerous benefits, including improved cardiovascular health, enhanced mood, and increased energy levels. Exercise can take many forms, from brisk walking and cycling to strength training and yoga, allowing individuals to choose activities that align with their interests and fitness goals. Incorporating exercise into one’s routine can also foster a sense of discipline and achievement, contributing to overall well-being. As part of a balanced lifestyle, regular exercise plays a crucial role in promoting long-term health and vitality.",
  
    "Reading is a gateway to new worlds, offering endless opportunities for learning, entertainment, and personal growth. Whether its a gripping novel, an informative non-fiction book, or a thought-provoking article, reading enriches the mind and stimulates the imagination. It allows us to explore different perspectives, gain knowledge on a wide range of topics, and escape into fascinating narratives. For many, reading is also a form of relaxation, providing a quiet retreat from the hustle and bustle of everyday life. By making reading a regular habit, one can continuously expand their horizons and cultivate a lifelong love of learning.",
  
    "Traveling is one of the most enriching experiences one can have, offering the chance to explore new cultures, meet diverse people, and see the world from a different perspective. Each journey brings unique memories, from the thrill of discovering historical landmarks to the simple joy of tasting local delicacies. Travel broadens the mind and nurtures a sense of curiosity and adventure. It challenges preconceived notions and encourages a deeper understanding of the world’s complexity. Whether it's a short weekend getaway or an extended international adventure, the act of traveling adds a valuable dimension to life, creating lasting impressions and broadening ones outlook.",
  
    "Music is a universal language that transcends cultural and linguistic barriers, capable of evoking deep emotions and bringing people together. From classical compositions to modern pop hits, music plays a significant role in our lives, accompanying us through various moments and moods. It has the power to uplift, soothe, inspire, and connect us to memories and experiences. Whether performed live or enjoyed through recordings, music has a unique ability to resonate with our innermost feelings. Engaging with music, whether by listening, playing an instrument, or singing, can be a deeply enriching and joyful experience.",
  
    "Education is the cornerstone of personal and societal development, providing the knowledge and skills necessary to navigate the world. It opens doors to opportunities and empowers individuals to achieve their goals. In a rapidly changing world, education equips people with the critical thinking and problem-solving abilities needed to adapt and thrive. Beyond formal schooling, education is a lifelong pursuit, with learning opportunities available in every stage of life. Whether through academic study, vocational training, or self-directed learning, the process of education enriches lives and contributes to the progress of society as a whole.",
  ];
  
  
const paragraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];

export default function Practice() {

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
                                    <h1 className="text-white text-2xl">You have completed the paragraph.</h1>
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