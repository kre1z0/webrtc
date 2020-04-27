import React, { ReactElement, useEffect, useState, useRef } from "react";

import { getPosition } from "utils/events";
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
  const startRef = useRef(null);

  const setFromEvent = (event): void => setPosition(getPosition(event));
  const setOnlyStartFromEvent = (event): { x: number; y: number } =>
    (startRef.current = getPosition(event));

  const setDrop = (event): void => {
    const rect = container.current.getBoundingClientRect();
    const { left, top } = rect;
    const difX = startRef.current.x - left;
    const difY = startRef.current.y - top;
    const evt = getPosition(event);

    container.current.style.left = `${evt.x - difX}px`;
    container.current.style.top = `${evt.y - difY}px`;
  };

  const onMouseUp = () => {
    ["mousemove", "touchmove"].forEach((evt) => window.removeEventListener(evt, setFromEvent));
    setStartPosition(null);
    setElementWidth(+element.getAttribute("width"));
    element.setAttribute("draggable", "true");
  };

  const setStartFromEvent = (event): void => {
    ["mousemove", "touchmove"].forEach((evt) => window.addEventListener(evt, setFromEvent));
    ["mouseup", "touchend"].forEach((evt) => window.addEventListener(evt, onMouseUp));

    setStartPosition(getPosition(event));
    element.setAttribute("draggable", "false");
  };

  useEffect(() => {
    return () => {
      ["mousemove", "touchmove"].forEach((evt) => window.removeEventListener(evt, setFromEvent));
      ["mouseup", "touchend"].forEach((evt) => window.removeEventListener(evt, onMouseUp));
    };
  }, []);

  useEffect(() => {
    if (element) {
      element.setAttribute("draggable", "true");

      ["dragstart", "touchstart"].forEach((evt) =>
        element.addEventListener(evt, setOnlyStartFromEvent),
      );
      ["dragend", "touchend"].forEach((evt) => element.addEventListener(evt, setDrop));

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
      <ResizeControl
        onMouseDown={setStartFromEvent}
        onTouchStart={setStartFromEvent}
        draggable={false}
      />
    </Container>
  );
};
