import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { path, string1, string2 } from "@worksolutions/utils";

import { COLOR_NAME_TYPE, GetColorType, Theme } from "./colorTypes";

export const getColor__maker = <COLORS extends Record<COLOR_NAME_TYPE, string>>(): GetColorType<keyof COLORS> => (
  colorName,
) => (props) => {
  const resultColorName = colorName.toString();
  if (resultColorName.startsWith("overrides")) return path(resultColorName, props.theme);
  return props.theme.colors[colorName] || colorName;
};

export const color__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(string1, (colorName: COLOR_NAME) => {
    return css`
      color: ${getColor(colorName)};
    `;
  });

export const createAlphaColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string2,
    (colorName: COLOR_NAME, alpha: number) =>
      `${getColor(colorName)({ theme: {} as Theme<COLOR_NAME> })}${alpha.toString(16).padStart(2, "0")}` as COLOR_NAME,
  );

export const fillColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string1,
    (colorName: COLOR_NAME) => css`
      fill: ${getColor(colorName)};
    `,
  );
