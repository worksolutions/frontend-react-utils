import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";
import { string1 } from "@worksolutions/utils";

import { stringOrPixels } from "./common";

export const textOverflow = memoizeWith(
  string1,
  (value: CSSProperties["textOverflow"]) => css`
    text-overflow: ${value};
  `,
);

export const whiteSpace = memoizeWith(
  string1,
  (value: CSSProperties["whiteSpace"]) => css`
    white-space: ${value};
  `,
);

export const lineHeight = memoizeWith(
  string1,
  (value: number | string) => css`
    line-height: ${stringOrPixels(value)};
  `,
);

export const fontSize = memoizeWith(
  string1,
  (value: string | number) => css`
    font-size: ${stringOrPixels(value)};
  `,
);

export const letterSpacing = memoizeWith(
  string1,
  (value: number | string) => css`
    letter-spacing: ${stringOrPixels(value)};
  `,
);

export const fontWeight = memoizeWith(
  string1,
  (value: string | number) => css`
    font-weight: ${value};
  `,
);

export const capitalizeFirstLetter = css`
  display: block;
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const textTransform = memoizeWith(
  string1,
  (value: CSSProperties["textTransform"]) => css`
    text-transform: ${value};
  `,
);

export const textAlign = memoizeWith(
  string1,
  (value: CSSProperties["textAlign"]) => css`
    text-align: ${value};
  `,
);

export const textDots = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
`;

export const disableDecoration = css`
  text-decoration: none;
`;
