'use client'
import { useRef, useEffect } from 'react';

export default function TextBox({disabled=false, text, setText, className, placeholder}: {readonly disabled: boolean, readonly text: string, readonly setText: (text: string) => void, readonly className: string, readonly placeholder: string}) {
    const textArea = useRef(null) as unknown as { current: HTMLTextAreaElement | null };

    function updateText(event: any) {
        if (textArea.current === null ) return;
        let t = textArea.current.value;
        
        if (event.nativeEvent.data === ' ') {
            setText(text + ' ');
            return;
        } else if (event.nativeEvent.data === null) {
            if (!text.includes(" "))
                setText(text.slice(1));
            else if (text.endsWith(' '))
                setText(text.slice(0, text.lastIndexOf(' ')));
            else if (textArea.current.selectionStart == textArea.current.value.length)
                setText(text.slice(0, text.lastIndexOf(' ') + 1) + text.slice(text.lastIndexOf(' ') + 2));
            return;
        }

        if (textArea.current.selectionStart == textArea.current.value.length) {
            t = t.slice(0, t.length - 1);
            if (t.lastIndexOf(' ') === -1) 
                t = event.nativeEvent.data + t;
            else 
                t = t.slice(0, t.lastIndexOf(' ') + 1) + event.nativeEvent.data + t.slice(t.lastIndexOf(' ') + 1);
        } else {
            t = t.slice(0, textArea.current.selectionStart) + event.nativeEvent.data + t.slice(textArea.current.selectionStart);
        }
        
        setText(t);
    }

    function saveTextAsFile() {
        const blob = new Blob([text], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.download = 'notepad--.txt';
        anchor.href = window.URL.createObjectURL(blob);
        anchor.click();
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                saveTextAsFile();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [text]);

    return (
        <textarea 
            onSelect={(e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.selectionStart = e.target.value.length} 
            disabled={disabled} 
            ref={textArea} 
            onInput={updateText} 
            value={text} 
            className={className}
            placeholder={placeholder}
        ></textarea>
    );
}