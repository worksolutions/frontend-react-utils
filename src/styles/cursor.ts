import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";

import { string1 } from "../../../libs/src/stringMemoHelper";

export const pointer = css`
  cursor: pointer;
`;

export const pointerEvents = memoizeWith(
  string1,
  (value: CSSProperties["pointerEvents"]) => css`
    pointer-events: ${value};
  `,
);

export const cursor = memoizeWith(
  string1,
  (value: CSSProperties["cursor"]) => css`
    cursor: ${value};
  `,
);
