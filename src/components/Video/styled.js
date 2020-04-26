import styled from "styled-components";

export const VideoContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

export const Resizer = styled.div.attrs(({ width }) => ({
  style: { width, height: width }
}))`
  user-select: none;
  cursor: nwse-resize;
  position: absolute;
  background-color: green;
  right: 0;
  bottom: 0;
`;
