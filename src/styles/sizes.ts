import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { string1 } from "@worksolutions/utils";

import { stringOrPixels } from "./common";

export const width = memoizeWith(
  string1,
  (width: string | number) => css`
    width: ${stringOrPixels(width)};
  `,
);

export const minWidth = memoizeWith(
  string1,
  (minWidth: string | number) => css`
    min-width: ${stringOrPixels(minWidth)};
  `,
);

export const maxWidth = memoizeWith(
  string1,
  (maxWidth: string | number) => css`
    max-width: ${stringOrPixels(maxWidth)};
  `,
);

export const height = memoizeWith(
  string1,
  (height: string | number) => css`
    height: ${stringOrPixels(height)};
  `,
);

export const minHeight = memoizeWith(
  string1,
  (minHeight: string | number) => css`
    min-height: ${stringOrPixels(minHeight)};
  `,
);

export const maxHeight = memoizeWith(
  string1,
  (maxHeight: string | number) => css`
    max-height: ${stringOrPixels(maxHeight)};
  `,
);

export const fullWidth = css`
  width: 100%;
`;

export const fullHeight = css`
  height: 100%;
`;

export const margin = memoizeWith(
  string1,
  (margin: string | number) => css`
    margin: ${stringOrPixels(margin)};
  `,
);

export const verticalMargin = memoizeWith(
  string1,
  (value: string | number) => css`
    margin-top: ${stringOrPixels(value)};
    margin-bottom: ${stringOrPixels(value)};
  `,
);

export const horizontalMargin = memoizeWith(
  string1,
  (value: string | number) => css`
    margin-left: ${stringOrPixels(value)};
    margin-right: ${stringOrPixels(value)};
  `,
);

export const marginLeft = memoizeWith(
  string1,
  (marginLeft: string | number) => css`
    margin-left: ${stringOrPixels(marginLeft)};
  `,
);

export const marginRight = memoizeWith(
  string1,
  (marginRight: string | number) => css`
    margin-right: ${stringOrPixels(marginRight)};
  `,
);

export const marginTop = memoizeWith(
  string1,
  (marginTop: string | number) => css`
    margin-top: ${stringOrPixels(marginTop)};
  `,
);

export const marginBottom = memoizeWith(
  string1,
  (marginBottom: string | number) => css`
    margin-bottom: ${stringOrPixels(marginBottom)};
  `,
);

export const padding = memoizeWith(
  string1,
  (padding: string | number) => css`
    padding: ${stringOrPixels(padding)};
  `,
);

export const verticalPadding = memoizeWith(
  string1,
  (value: string | number) => css`
    padding-top: ${stringOrPixels(value)};
    padding-bottom: ${stringOrPixels(value)};
  `,
);

export const horizontalPadding = memoizeWith(
  string1,
  (value: string | number) => css`
    padding-left: ${stringOrPixels(value)};
    padding-right: ${stringOrPixels(value)};
  `,
);

export const paddingLeft = memoizeWith(
  string1,
  (paddingLeft: number) => css`
    padding-left: ${paddingLeft}px;
  `,
);

export const paddingRight = memoizeWith(
  string1,
  (paddingRight: number) => css`
    padding-right: ${paddingRight}px;
  `,
);

export const paddingTop = memoizeWith(
  string1,
  (paddingTop: number) => css`
    padding-top: ${paddingTop}px;
  `,
);

export const paddingBottom = memoizeWith(
  string1,
  (paddingBottom: number) => css`
    padding-bottom: ${paddingBottom}px;
  `,
);
