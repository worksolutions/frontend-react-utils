import { css } from "styled-components";
import { memoizeWith } from "ramda";
import { CSSProperties } from "react";
import { string1, string2, string3 } from "@worksolutions/utils";

import { stringOrPixels } from "./common";
import { COLOR_NAME_TYPE, GetColorType, IncomeColorVariant } from "./colorTypes";

export const border__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string3,
    (size: number, colorName: IncomeColorVariant<COLOR_NAME>, mode: CSSProperties["borderStyle"] = "solid") => css`
      border: ${size}px ${mode} ${getColor(colorName)};
    `,
  );

export const borderWidth = memoizeWith(
  string1,
  (size: number) =>
    css`
      border-width: ${size}px;
    `,
);

export const borderColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string1,
    (color: IncomeColorVariant<COLOR_NAME>) => css`
      border-color: ${getColor(color)};
    `,
  );

export const borderBottom__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string3,
    (size: number, color: IncomeColorVariant<COLOR_NAME>, mode: CSSProperties["borderStyle"] = "solid") => css`
      border-bottom: ${size}px ${mode} ${getColor(color)};
    `,
  );

export const borderLeft__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string3,
    (size: number, color: IncomeColorVariant<COLOR_NAME>, mode: CSSProperties["borderStyle"] = "solid") => css`
      border-left: ${size}px ${mode} ${getColor(color)};
    `,
  );

export const borderTop__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string3,
    (size: number, color: IncomeColorVariant<COLOR_NAME>, mode: CSSProperties["borderStyle"] = "solid") => css`
      border-top: ${size}px ${mode} ${getColor(color)};
    `,
  );

export const borderRight__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string3,
    (size: number, color: IncomeColorVariant<COLOR_NAME>, mode: CSSProperties["borderStyle"] = "solid") => css`
      border-right: ${size}px ${mode} ${getColor(color)};
    `,
  );

export const borderLeftColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string1,
    (color: IncomeColorVariant<COLOR_NAME>) => css`
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
