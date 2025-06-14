/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type DecryptedTextProps = {
  text: string;
  speed?: number;
  characters?: string;
  animateOn?: "hover" | "view";
  className?: string;
};

export default function DecryptedText({
  text,
  speed = 40,
  characters = "!<>-_\\/[]{}—=+*^?#_",
  animateOn = "view",
  className = "font-mono text-green-400",
}: DecryptedTextProps) {
  const [display, setDisplay] = useState<string[]>([]);
  const [resolved, setResolved] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    setDisplay(Array(text.length).fill(""));
  }, [text]);

  const decrypt = () => {
    let frame = 0;
    const totalFrames = text.length + 10;

    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, i) => {
          if (frame >= i) return text[i];
          return characters[Math.floor(Math.random() * characters.length)];
        })
      );

      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setResolved(true);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view" && isInView && !resolved) {
      decrypt();
    }
  }, [isInView]);

  const handleHover = () => {
    if (animateOn === "hover" && !resolved) {
      decrypt();
    }
  };

  return (
    <motion.span
      ref={containerRef}
      className={className}
      onMouseEnter={handleHover}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {display.join("")}
    </motion.span>
  );
}
