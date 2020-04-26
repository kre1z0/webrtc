import { css } from "styled-components";

export const commontStyles = css`
  body,
  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  ::-webkit-scrollbar-thumb {
    min-width: 6.25rem;
    min-height: 6.25rem;
  }

  * {
    box-sizing: border-box;
  }
`;
