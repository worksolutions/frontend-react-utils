import React from "react";
import { identity } from "ramda";

function getWindowScrollPosition() {
  return { x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop };
}

export function useScrollCallback(callback: (y: number, x: number) => void, runCallbackOnElementChange = false) {
  const disposeRef = React.useRef<Function>();

  const runListener = React.useCallback(
    (element: HTMLElement | Window | null) => {
      if (!element) return identity;
      if (runCallbackOnElementChange) callback(0, 0);

      function windowScroller() {
        const { x, y } = getWindowScrollPosition();
        callback(y, x);
      }

      function elementScroller() {
        callback((element as HTMLElement).scrollTop, (element as HTMLElement).scrollLeft);
      }

      const scrollHandler = element === window ? windowScroller : elementScroller;

      element.addEventListener("scroll", scrollHandler);
      return () => element.removeEventListener("scroll", scrollHandler);
    },
    [callback, runCallbackOnElementChange],
  );

  React.useEffect(() => () => disposeRef.current?.(), []);

  return React.useCallback(
    (element: HTMLElement | Window | null) => {
      if (disposeRef.current) disposeRef.current();
      disposeRef.current = runListener(element);
    },
    [runListener],
  );
}
