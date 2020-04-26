import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-flex;
`;

export const ResizeControl = styled.div`
  cursor: nwse-resize;
  position: absolute;
  width: 2rem;
  height: 2rem;
  bottom: 0;
  right: 0;
  background-color: green;
`;
