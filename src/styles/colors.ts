import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { isFunction, path, string1, string2 } from "@worksolutions/utils";

import { COLOR_NAME_TYPE, GetColorType, IncomeColorVariant, StyledComponentsPropsWithTheme } from "./colorTypes";
import { stringOrPixels } from "./common";

export const getColor__maker = <COLORS extends Record<COLOR_NAME_TYPE, string>>(): GetColorType<keyof COLORS> => (
  colorName,
) => (props) => {
  const calculatedColorName = isFunction(colorName) ? colorName(props).toString() : colorName.toString();

  const resultColorName = calculatedColorName.startsWith("definitions")
    ? path(calculatedColorName, props.theme)
    : calculatedColorName;

  return props.theme.colors[resultColorName] || resultColorName;
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
      (getColor(colorName)(props) + alpha.toString(16).padStart(2, "0")) as COLOR_NAME,
  );

export interface RadialGradientPointInterface<COLOR extends COLOR_NAME_TYPE> {
  color: COLOR;
  filling?: string;
}

export const createRadialGradientColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(
  getColor: GetColorType<COLOR_NAME>,
) =>
  memoizeWith(
    (...args) => JSON.stringify(args),
    (
      { color: fromColor, filling: fromFilling = "" }: RadialGradientPointInterface<COLOR_NAME>,
      { color: toColor, filling: toFilling = "" }: RadialGradientPointInterface<COLOR_NAME>,
      { x, y }: { x: string | number; y: string | number } = { x: "center", y: "center" },
    ) => (props: StyledComponentsPropsWithTheme<COLOR_NAME>) => {
      const pos = `at ${stringOrPixels(x)} ${stringOrPixels(y)}`;
      const from = `${getColor(fromColor)(props)} ${fromFilling}`;
      const to = `${getColor(toColor)(props)} ${toFilling}`;
      return `radial-gradient(${pos}, ${from}, ${to})` as COLOR_NAME;
    },
  );

export const fillColor__maker = <COLOR_NAME extends COLOR_NAME_TYPE>(getColor: GetColorType<COLOR_NAME>) =>
  memoizeWith(
    string1,
    (colorName: IncomeColorVariant<COLOR_NAME>) => css`
      fill: ${getColor(colorName)};
    `,
  );
