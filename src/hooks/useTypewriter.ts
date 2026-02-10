import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  speed?: number;
  loop?: boolean;
  pauseDuration?: number;
}

export const useTypewriter = (
  text: string,
  { speed = 30, loop = true, pauseDuration = 2000 }: UseTypewriterOptions = {}
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const typeText = () => {
      setDisplayedText("");
      setIsComplete(false);
      currentIndex = 0;

      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(intervalId);

          // Se loop estiver ativado, reinicia após pauseDuration
          if (loop) {
            timeoutId = setTimeout(() => {
              typeText();
            }, pauseDuration);
          }
        }
      }, speed);
    };

    typeText();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, loop, pauseDuration]);

  return { displayedText, isComplete };
};
