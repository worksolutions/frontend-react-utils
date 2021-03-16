import { memoizeWith } from "ramda";
import { CSSProperties } from "react";
import { css } from "styled-components";
import { string1 } from "@worksolutions/utils";

import { COLOR_NAME_TYPE, GetColorType, IncomeColorVariant } from "./colorTypes";

export const background = memoizeWith(
  string1,
  (background: CSSProperties["background"]) => css`
    background: ${background};
  `,
);

export const backgroundColorWithoutMemoization__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(
  getColor: GetColorType<COLOR_NAME>,
) => (backgroundColorName: IncomeColorVariant<COLOR_NAME>) => css`
  background-color: ${getColor(backgroundColorName)};
`;

export const backgroundColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(string1, backgroundColorWithoutMemoization__maker(getColor));

export const backgroundImage = memoizeWith(
  string1,
  (value: CSSProperties["backgroundImage"]) => css`
    background-image: url("${value}");
  `,
);

export const backgroundRepeat = memoizeWith(
  string1,
  (value: CSSProperties["backgroundRepeat"]) => css`
    background-repeat: ${value};
  `,
);

export const backgroundSize = memoizeWith(
  string1,
  (value: CSSProperties["backgroundSize"]) => css`
    background-size: ${value};
  `,
);

export const backgroundPosition = memoizeWith(
  string1,
  (value: CSSProperties["backgroundPosition"]) => css`
    background-position: ${value};
  `,
);
