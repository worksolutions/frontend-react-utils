import { css } from "styled-components";
import { memoizeWith } from "ramda";
import { CSSProperties } from "react";
import { string1, string2, string3 } from "@worksolutions/utils";

import { stringOrPixels } from "./common";

export const border__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string3,
    (size: number, color: T, mode: CSSProperties["borderStyle"] = "solid") => css`
      border: ${size}px ${mode} ${getColor(color)};
    `,
  );

export const borderWidth = memoizeWith(
  string1,
  (size: number) =>
    css`
      border-width: ${size}px;
    `,
);

export const borderColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string1,
    (color: T) => css`
      border-color: ${getColor(color)};
    `,
  );

export const borderBottom__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string2,
    (size: number, color: T) => css`
      border-bottom: ${size}px solid ${getColor(color)};
    `,
  );

export const borderLeft__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string2,
    (size: number, color: T) => css`
      border-left: ${size}px solid ${getColor(color)};
    `,
  );

export const borderTop__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string2,
    (size: number, color: T) => css`
      border-top: ${size}px solid ${getColor(color)};
    `,
  );

export const borderRight__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string2,
    (size: number, color: T) => css`
      border-right: ${size}px solid ${getColor(color)};
    `,
  );

export const borderLeftColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string1,
    (color: T) => css`
      border-left-color: ${getColor(color)};
    `,
  );

export const borderRadius = memoizeWith(
  string1,
  (borderRadius: number | string) => css`
    border-radius: ${stringOrPixels(borderRadius)};
  `,
);

export const borderLeftRadius = memoizeWith(
  string1,
  (borderRadius: number | string) => css`
    border-bottom-left-radius: ${stringOrPixels(borderRadius)};
    border-top-left-radius: ${stringOrPixels(borderRadius)};
  `,
);

export const borderRightRadius = memoizeWith(
  string1,
  (borderRadius: number | string) => css`
    border-bottom-right-radius: ${stringOrPixels(borderRadius)};
    border-top-right-radius: ${stringOrPixels(borderRadius)};
  `,
);

export const borderBottomRadius = memoizeWith(
  string1,
  (borderRadius: number | string) => css`
    border-bottom-right-radius: ${stringOrPixels(borderRadius)};
    border-bottom-left-radius: ${stringOrPixels(borderRadius)};
  `,
);

export const borderTopRadius = memoizeWith(
  string1,
  (borderRadius: number | string) => css`
    border-top-right-radius: ${stringOrPixels(borderRadius)};
    border-top-left-radius: ${stringOrPixels(borderRadius)};
  `,
);
