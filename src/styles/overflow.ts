import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";
import { string1 } from "@worksolutions/utils";

export const verticalScroll = css`
  overflow-y: auto;
`;

export const horizontalScroll = css`
  overflow-x: auto;
`;

export const overflow = memoizeWith(
  string1,
  (value: CSSProperties["overflow"]) => css`
    overflow: ${value};
  `,
);

export const overflowX = memoizeWith(
  string1,
  (value: CSSProperties["overflowX"]) => css`
    overflow-x: ${value};
  `,
);

export const overflowY = memoizeWith(
  string1,
  (value: CSSProperties["overflowX"]) => css`
    overflow-y: ${value};
  `,
);
