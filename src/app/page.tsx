'use client'
import '@/app/ui/global.css';
import MainHeading from '@/app/ui/MainHeading';
import { roboto_mono } from "./fonts";
import { useState } from 'react';

export default function Page() {
	const AnimatedLetter = ({ index }: { index: number }) => {
		const [isAnimating, setIsAnimating] = useState(false);
	  
		const handleMouseEnter = () => {
		  setIsAnimating(true);
		};
	  
		const handleAnimationEnd = () => {
		  setIsAnimating(false);
		};
	  
		return (
		  <p
			className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl m-1 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 z-999 ${isAnimating ? 'animate-waving text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500' : 'text-white opacity-10'}`}
			onMouseEnter={handleMouseEnter}
			onAnimationEnd={handleAnimationEnd}
		  >
			{String.fromCharCode(65 + (25 - index))}
		  </p>
		);
	  };
	  
  	const backgroundDiv = (
		<div className='flex flex-wrap items-center justify-center absolute top-0 left-0 w-full h-full bg-black z-0 text-wrap overflow-hidden' style={{ overflowWrap: 'break-word' }}>
		  {Array.from({ length: 26 }, (_, i) => (
			<div key={`container-${i}`} className='flex flex-row items-center'>
			  <AnimatedLetter index={i} />
			  {i !== 25 && (
			  <p className='text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl opacity-10' style={{ lineHeight: '1' }}>
			  ·
			  </p>
			  )}
			</div>
		  ))}
		</div>  
	  );
	  
  return (
    <html lang="en" className={roboto_mono.className}>
      <body className="bg-gray-800">
        {backgroundDiv}
        <div className='relative z-10 flex flex-col items-center justify-center h-screen pointer-events-none'>
          <MainHeading />
        </div>
      </body>
    </html>
  );
}