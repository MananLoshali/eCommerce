import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 395px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 580px) {
      ${props}
    }
  `;
};
