'use client'

export default function MainHeading() {
    return (
        //vertical and horizontal centering
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="underline text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-bold">
                Bored with Traditional Typing? Try Reverse Typing!
            </p>            
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl text-center text-white font-bold py-10 sm:py-20">
                Notepad--
            </h1>
            <button onClick={() => window.location.href = "/new"} className="m-2 sm:m-5 p-3 sm:p-5 pointer-events-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-large rounded-lg text-lg sm:text-2xl px-4 sm:px-5 py-3 sm:py-5 text-center me-2 mb-2">
                New Note
            </button>
            <button onClick={() => window.location.href = "/practice"} className="m-2 sm:m-5 p-3 sm:p-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-large rounded-lg text-lg sm:text-2xl px-4 sm:px-5 py-3 sm:py-5 text-center me-2 mb-2 pointer-events-auto">
                Practice
            </button>
        </div>    
    );
}