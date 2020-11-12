import { memoizeWith } from "ramda";
import { CSSProperties } from "react";
import { css } from "styled-components";

import { string1 } from "../../../libs/src/stringMemoHelper";

export const background = memoizeWith(
  string1,
  (background: CSSProperties["background"]) => css`
    background: ${background};
  `,
);

export const backgroundColor__maker = <T>(getColor: (color: T) => string) =>
  memoizeWith(
    string1,
    (backgroundColor: T) => css`
      background-color: ${getColor(backgroundColor)};
    `,
  );

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
