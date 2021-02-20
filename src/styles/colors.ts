import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { isFunction, path, string1, string2 } from "@worksolutions/utils";

import { COLOR_NAME_TYPE, GetColorType, IncomeColorVariant, StyledComponentsPropsWithTheme } from "./colorTypes";

export const getColor__maker = <COLORS extends Record<COLOR_NAME_TYPE, string>>(): GetColorType<keyof COLORS> => (
  colorName,
) => (props) => {
  const resultColorName = isFunction(colorName) ? colorName(props).toString() : colorName.toString();
  if (resultColorName.startsWith("overrides")) return path(resultColorName, props.theme);
  return props.theme.colors[resultColorName] || colorName;
};

export const color__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(string1, (colorName: IncomeColorVariant<COLOR_NAME>) => {
    return css`
      color: ${getColor(colorName)};
    `;
  });

export const createAlphaColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string2,
    (colorName: IncomeColorVariant<COLOR_NAME>, alpha: number) => (props: StyledComponentsPropsWithTheme<COLOR_NAME>) =>
      `
        ${getColor(colorName)(props)}${alpha.toString(16).padStart(2, "0")}
      ` as COLOR_NAME,
  );

export const fillColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string1,
    (colorName: IncomeColorVariant<COLOR_NAME>) => css`
      fill: ${getColor(colorName)};
    `,
  );
