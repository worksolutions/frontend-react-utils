import { css } from "styled-components";
import { isString } from "@worksolutions/utils";

export const stringOrPixels = (value: number | string) => (isString(value) ? value : `${value}px`);

export const hover = (styles: any, childSelector = "") => css`
  :hover ${childSelector} {
    ${styles}
  }
`;

export const focus = (styles: any, childSelector = "") => css`
  :focus ${childSelector} {
    ${styles}
  }
`;

export const active = (styles: any, childSelector = "") => css`
  :active ${childSelector} {
    ${styles}
  }
`;

export const mediaScreen = (mediaQueries: string, values: any) => css`
  @media screen and ${mediaQueries} {
    ${values}
  }
`;
