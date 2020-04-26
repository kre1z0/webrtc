import { useEffect, useState } from "react";

export const useMousePosition = (): { x: number; y: number } => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (event): void => setPosition({ x: event.clientX, y: event.clientY });

    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};
