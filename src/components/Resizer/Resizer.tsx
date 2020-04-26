import React, { ReactElement, useEffect, useState } from "react";

import { Container, ResizeControl } from "components/Resizer/styled";

type ResizerProps = {
  element?: HTMLElement;
  children?: ReactElement;
  ratio: number;
};

const defaultStartPosition = {
  x: 0,
  y: 0,
};

export const Resizer: React.FC<ResizerProps> = ({ element, ratio= 1, children }) => {
  const [startPosition, setStartPosition] = useState(defaultStartPosition);

  const setStartFromEvent = (event): void => {
    window.addEventListener("mouseup", () => setStartPosition(defaultStartPosition));
    setStartPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    // if (element) {}
  }, [element]);

  // useEffect(() => {
  //   console.info("--> ggwp 4444 element", startPosition);
  // }, [startPosition]);

  return (
    <Container>
      {children}
      <ResizeControl onMouseDown={setStartFromEvent} />
    </Container>
  );
};
