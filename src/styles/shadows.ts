import { memoizeWith } from "ramda";
import { css } from "styled-components";

import { stringOrPixels } from "./common";
import { COLOR_NAME_TYPE, GetColorType, IncomeColorVariant, StyledComponentsPropsWithTheme } from "./colorTypes";

export type BoxShadowTypeMaker<COLOR_NAME extends COLOR_NAME_TYPE> = [
  number | string,
  number | string,
  number | string,
  number | string,
  IncomeColorVariant<COLOR_NAME>,
  boolean?,
];

export const boxShadowString__maker = <
  COLOR_NAME extends COLOR_NAME_TYPE,
  BOX_SHADOW extends BoxShadowTypeMaker<COLOR_NAME>
>(
  getColor: GetColorType<COLOR_NAME>,
) => (props: StyledComponentsPropsWithTheme<COLOR_NAME>) =>
  memoizeWith(
    (data) => JSON.stringify(data),
    ([offsetX, offsetY, blurRadius, spread, color, inset]: BOX_SHADOW) =>
      `${inset ? "inset " : ""}${stringOrPixels(offsetX)} ${stringOrPixels(offsetY)} ${stringOrPixels(
        blurRadius,
      )} ${stringOrPixels(spread)} ${getColor(color)(props)}`,
  );

export const boxShadow__maker = <COLOR_NAME extends COLOR_NAME_TYPE, BOX_SHADOW extends BoxShadowTypeMaker<COLOR_NAME>>(
  makeBorderBoxShadow: (props: StyledComponentsPropsWithTheme<COLOR_NAME>) => (borderBox: BOX_SHADOW) => string,
) =>
  memoizeWith(
    (...shadows) => JSON.stringify(shadows),
    (...shadows: BOX_SHADOW[]) => css`
      box-shadow: ${(props) => shadows.map(makeBorderBoxShadow(props)).join(", ")};
    `,
  );
