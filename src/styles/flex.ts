import { css } from "styled-components";
import { memoizeWith } from "ramda";
import { CSSProperties } from "react";
import { string1 } from "@worksolutions/utils";

import { stringOrPixels } from "./common";

export const flex = css`
  display: flex;
`;

export const inlineFlex = css`
  display: inline-flex;
`;

export const flexWrap = css`
  flex-wrap: wrap;
`;

export const flexValue = memoizeWith(
  string1,
  (value: string | number) => css`
    flex: ${value};
  `,
);

export const flexGrow = memoizeWith(
  string1,
  (grow: number) => css`
    flex-grow: ${grow};
  `,
);

export const flexBasis = memoizeWith(
  string1,
  (basis: number | string) => css`
    flex-basis: ${stringOrPixels(basis)};
  `,
);

export const flexShrink = memoizeWith(
  string1,
  (shrink: number) => css`
    flex-shrink: ${shrink};
  `,
);

export const flexColumn = css`
  flex-direction: column;
`;

export const jc = memoizeWith(
  string1,
  (value: CSSProperties["justifyContent"]) => css`
    justify-content: ${value};
  `,
);

export const alignSelf = memoizeWith(
  string1,
  (value: CSSProperties["alignSelf"]) => css`
    align-self: ${value};
  `,
);

export const alignContent = memoizeWith(
  string1,
  (value: CSSProperties["alignContent"]) => css`
    align-content: ${value};
  `,
);

export const ai = memoizeWith(
  string1,
  (value: CSSProperties["alignItems"]) => css`
    align-items: ${value};
  `,
);

export const order = memoizeWith(
  string1,
  (value: CSSProperties["order"]) => css`
    order: ${value};
  `,
);
