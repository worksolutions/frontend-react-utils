import { css, Keyframes } from "styled-components";
import { CSSProperties } from "react";
import { isString, memoizeWithContext, string1 } from "@worksolutions/utils";
import { memoizeWith } from "ramda";

export interface AnimationConfig {
  name: Keyframes;
  duration?: CSSProperties["animationDuration"];
  timingFunction?: CSSProperties["animationTimingFunction"];
  delay?: CSSProperties["animationDelay"];
  iterationCount?: CSSProperties["animationIterationCount"];
  direction?: CSSProperties["animationDirection"];
  fillMode?: CSSProperties["animationFillMode"];
  playState?: CSSProperties["animationPlayState"];
}

const makeAnimation = ({
  name,
  duration,
  timingFunction,
  delay,
  iterationCount,
  direction,
  fillMode,
  playState,
}: AnimationConfig) => {
  return [name, " " + [duration, timingFunction, delay, iterationCount, direction, fillMode, playState].join(" ")];
};

export const animation = memoizeWithContext(
  function (a: AnimationConfig[]) {
    const result = a.map(makeAnimation);
    this.animations = result;
    return result
      .map(([keyFrame, string]) => {
        // @ts-ignore
        return `${isString(keyFrame) ? keyFrame : keyFrame.id}${string}`;
      })
      .join("");
  },
  function (animations: AnimationConfig[]) {
    return css`
      animation: ${(this.animations as ReturnType<typeof makeAnimation>[]).map((el, index) => [
        index === 0 ? "" : ", ",
        ...el,
      ])};
    `;
  },
);

export const animationDuration = memoizeWith(
  string1,
  (value: CSSProperties["animationDuration"]) => css`
    animation-duration: ${value};
  `,
);
