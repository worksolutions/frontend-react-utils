import { css } from "styled-components";

export const child = (styles: any, preSelector = "> *") => css`
  ${preSelector} {
    ${styles};
  }
`;

export const firstChild = (styles: any, preSelector = ">") => css`
  ${preSelector}:first-child {
    ${styles};
  }
`;

export const lastChild = (styles: any, preSelector = ">") => css`
  ${preSelector}:last-child {
    ${styles};
  }
`;

export const nthChild = (selector: string | number, styles: any, preSelector = ">") => css`
  ${preSelector}:nth-child(${selector}) {
    ${styles};
  }
`;
