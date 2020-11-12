import { memoizeWith } from "ramda";
import { css } from "styled-components";

import { stringOrPixels } from "./common";

export type BoxShadowTypeMaker<Colors> = [
  number | string,
  number | string,
  number | string,
  number | string,
  Colors,
  boolean?,
];

export const boxShadowString__maker = <T, BoxShadow extends BoxShadowTypeMaker<T>>(getColor: (color: T) => string) =>
  memoizeWith(
    (data) => JSON.stringify(data),
    ([offsetX, offsetY, blurRadius, spread, color, inset]: BoxShadow) =>
      `${inset ? "inset " : ""}${stringOrPixels(offsetX)} ${stringOrPixels(offsetY)} ${stringOrPixels(
        blurRadius,
      )} ${stringOrPixels(spread)} ${getColor(color)}`,
  );

export const boxShadow__maker = <T, BoxShadow extends BoxShadowTypeMaker<T>>(
  getColor: (color: T) => string,
  makeBorderBoxShadow: (borderBox: BoxShadow) => string,
) =>
  memoizeWith(
    (...shadows) => JSON.stringify(shadows),
    (...shadows: BoxShadow[]) => css`
      box-shadow: ${shadows.map(makeBorderBoxShadow).join(", ")};
    `,
  );
