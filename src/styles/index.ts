import * as activations from "./activations";
import * as animations from "./animations";
import * as backgroundStyles from "./background";
import * as borderStyles from "./border";
import * as children from "./children";
import * as cleaner from "./cleaner";
import * as colors from "./colors";
import * as common from "./common";
import * as cursor from "./cursor";
import * as flex from "./flex";
import * as overflow from "./overflow";
import * as positions from "./positions";
import * as shadows from "./shadows";
import * as sizes from "./sizes";
import * as text from "./text";
import * as transform from "./transform";
import { COLOR_NAME_TYPE } from "./colorTypes";

export * from "./colorTypes";

export function buildStyles<COLORS extends COLOR_NAME_TYPE>() {
  const {
    backgroundWithoutMemoization__maker,
    background__maker,
    backgroundColorWithoutMemoization__maker,
    backgroundColor__maker,
    ...otherBackground
  } = backgroundStyles;
  const {
    border__maker,
    borderBottom__maker,
    borderColor__maker,
    borderLeft__maker,
    borderLeftColor__maker,
    borderRight__maker,
    borderTop__maker,
    ...otherBorder
  } = borderStyles;
  const {
    getColor__maker,
    color__maker,
    createAlphaColor__maker,
    createRadialGradientColor__maker,
    fillColor__maker,
    ...otherColors
  } = colors;
  const { boxShadow__maker, boxShadowString__maker, ...otherShadows } = shadows;

  const getColor = getColor__maker<Record<COLORS, string>>();

  const backgroundWithoutMemoization = backgroundWithoutMemoization__maker(getColor);
  const background = background__maker(getColor);
  const backgroundColorWithoutMemoization = backgroundColorWithoutMemoization__maker(getColor);
  const backgroundColor = backgroundColor__maker(getColor);
  const border = border__maker(getColor);
  const borderBottom = borderBottom__maker(getColor);
  const borderColor = borderColor__maker(getColor);
  const borderLeft = borderLeft__maker(getColor);
  const borderLeftColor = borderLeftColor__maker(getColor);
  const borderRight = borderRight__maker(getColor);
  const borderTop = borderTop__maker(getColor);
  const color = color__maker(getColor);
  const createAlphaColor = createAlphaColor__maker(getColor);
  const createRadialGradientColor = createRadialGradientColor__maker(getColor);
  const fillColor = fillColor__maker(getColor);
  const boxShadowString = boxShadowString__maker(getColor);
  const boxShadow = boxShadow__maker(boxShadowString);

  return {
    ...activations,
    ...animations,
    ...otherBackground,
    ...otherBorder,
    ...children,
    ...cleaner,
    ...otherColors,
    ...common,
    ...cursor,
    ...flex,
    ...overflow,
    ...positions,
    ...otherShadows,
    ...sizes,
    ...text,
    ...transform,
    getColor,
    backgroundWithoutMemoization,
    background,
    backgroundColorWithoutMemoization,
    backgroundColor,
    border,
    borderBottom,
    borderColor,
    borderLeft,
    borderLeftColor,
    borderRight,
    borderTop,
    color,
    createAlphaColor,
    createRadialGradientColor,
    fillColor,
    boxShadowString,
    boxShadow,
  };
}
