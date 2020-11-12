import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";
import { isString } from "@worksolutions/utils";

import { string1 } from "../../../libs/src/stringMemoHelper";

export const stringOrPixels = (value: number | string) => (isString(value) ? value : `${value}px`);

export const disableOutline = css`
  outline: none;
`;

export const zIndex = memoizeWith(
  string1,
  (value: number) => css`
    z-index: ${value};
  `,
);

export const display = memoizeWith(
  string1,
  (value: CSSProperties["display"]) => css`
    display: ${value};
  `,
);

export const opacity = memoizeWith(
  string1,
  (value: string | number) => css`
    opacity: ${value};
  `,
);

export const visibility = memoizeWith(
  string1,
  (value: CSSProperties["visibility"]) => css`
    visibility: ${value};
  `,
);

export const content = memoizeWith(
  string1,
  (value: string) => css`
    content: "${value}";
  `,
);

export const verticalAlign = memoizeWith(
  string1,
  (value: CSSProperties["verticalAlign"]) => css`
    vertical-align: ${value};
  `,
);

export const willChange = memoizeWith(
  string1,
  (value: CSSProperties["willChange"]) => css`
    will-change: ${value};
  `,
);
