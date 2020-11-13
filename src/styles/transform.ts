import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";
import { string1 } from "@worksolutions/utils";

export const transform = memoizeWith(
  string1,
  (transform: CSSProperties["transform"]) => css`
    transform: ${transform};
  `,
);

export const transformOrigin = memoizeWith(
  string1,
  (transformOrigin: CSSProperties["transformOrigin"]) => css`
    transform-origin: ${transformOrigin};
  `,
);

export const transition = memoizeWith(
  string1,
  (value: CSSProperties["transition"]) => css`
    transition: ${value};
  `,
);
