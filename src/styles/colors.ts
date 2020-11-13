import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { string1, string2, string3 } from "@worksolutions/utils";

import { stringOrPixels } from "./common";

export const getColor__maker = <T extends Record<string, string>>(colors: T) => (color: keyof T | string) =>
  (colors[color] || color) as string;

export const createLinearGradientColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string3,
    (fromColor: T, toColor: T, angle: number) =>
      `linear-gradient(${angle}, ${getColor(fromColor)} 0%, ${getColor(toColor)} 100%)`,
  );

export const createRadialGradientColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    (data) => JSON.stringify(data),
    (
      { color: fromColor, filling: fromFilling }: { color: T; filling?: string },
      { color: toColor, filling: toFilling }: { color: T; filling?: string },
      { x, y }: { x: string | number; y: string | number } = { x: "center", y: "center" },
    ) => {
      const pos = `at ${stringOrPixels(x)} ${stringOrPixels(y)}`;
      const from = `${getColor(fromColor)} ${fromFilling || ""}`;
      const to = `${getColor(toColor)} ${toFilling || ""}`;
      return `radial-gradient(${pos}, ${from}, ${to})`;
    },
  );

export const createAlphaColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(string2, (color: T, alpha: number) => `${getColor(color)}${alpha.toString(16).padStart(2, "0")}`);

export const color__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(string1, (value: T) => {
    const color = getColor(value);
    return css`
      color: ${color};
    `;
  });

export const fillColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string1,
    (color: T) => css`
      fill: ${getColor(color)};
    `,
  );
