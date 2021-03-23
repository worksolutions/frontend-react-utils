import { memoizeWith } from "ramda";
import { css } from "styled-components";
import { CSSProperties } from "react";
import { string1 } from "@worksolutions/utils";

export const filterStyle = memoizeWith(
  string1,
  (transform: CSSProperties["filter"]) => css`
    filter: ${transform};
  `,
);
