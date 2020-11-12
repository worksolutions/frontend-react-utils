import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";

import { string1 } from "../../../libs/src/stringMemoHelper";
import { stringOrPixels } from "./common";

export const position = memoizeWith(
  string1,
  (position: CSSProperties["position"]) => css`
    position: ${position};
  `,
);

export const left = memoizeWith(
  string1,
  (left: string | number) => css`
    left: ${stringOrPixels(left)};
  `,
);

export const right = memoizeWith(
  string1,
  (right: string | number) => css`
    right: ${stringOrPixels(right)};
  `,
);

export const top = memoizeWith(
  string1,
  (top: string | number) => css`
    top: ${stringOrPixels(top)};
  `,
);

export const bottom = memoizeWith(
  string1,
  (bottom: string | number) => css`
    bottom: ${stringOrPixels(bottom)};
  `,
);

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
