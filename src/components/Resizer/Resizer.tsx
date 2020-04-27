import React, { ReactElement, useEffect, useState, useRef } from "react";

import { Container, ResizeControl } from "components/Resizer/styled";

type ResizerProps = {
  element?: HTMLElement;
  children?: ReactElement;
  ratio: number;
};

export const Resizer: React.FC<ResizerProps> = ({ element, ratio = 1, children }) => {
  const [startPosition, setStartPosition] = useState(null);
  const [position, setPosition] = useState(null);
  const [elementWidth, setElementWidth] = useState(null);
  const container = useRef(null);
  const myStateRef = useRef(null);

  const setFromEvent = (event): void => setPosition({ x: event.clientX, y: event.clientY });
  const setOnlyStartFromEvent = (event): { x: number; y: number } =>
    (myStateRef.current = { x: event.clientX, y: event.clientY });

  const setDrop = (event): void => {
    const rect = container.current.getBoundingClientRect();
    const { left, top } = rect;
    const difX = myStateRef.current.x - left;
    const difY = myStateRef.current.y - top;

    container.current.style.left = `${event.clientX - difX}px`;
    container.current.style.top = `${event.clientY - difY}px`;
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", setFromEvent);
    setStartPosition(null);
    setElementWidth(+element.getAttribute("width"));
    element.setAttribute("draggable", "true");
  };

  const setStartFromEvent = (event): void => {
    window.addEventListener("mousemove", setFromEvent);
    window.addEventListener("mouseup", onMouseUp);
    setStartPosition({ x: event.clientX, y: event.clientY });
    element.setAttribute("draggable", "false");
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (element) {
      element.setAttribute("draggable", "true");
      element.addEventListener("dragstart", setOnlyStartFromEvent);
      element.addEventListener("dragend", setDrop);
      setElementWidth(+element.getAttribute("width"));
    }
  }, [element]);

  useEffect(() => {
    if (position && element) {
      const { x: startX } = startPosition;
      const { x } = position;
      const width = elementWidth + x - startX;
      const height = (width / ratio).toString();

      element.setAttribute("width", width.toString());
      element.setAttribute("height", height);
    }
  }, [position]);

  return (
    <Container ref={container}>
      {children}
      <ResizeControl onMouseDown={setStartFromEvent} draggable={false} />
    </Container>
  );
};
