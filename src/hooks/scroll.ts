import React from "react";
import useMeasureDirty from "react-use/esm/useMeasureDirty";
import { identity } from "ramda";

function getWindowScrollPosition() {
  return { x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop };
}

export function useScrollCallback(callback: (y: number, x: number) => void, triggerOnElementChange = false) {
  const disposeRef = React.useRef<Function>();
  const runListener = React.useCallback(
    (element: HTMLElement | Window | null) => {
      if (!element) return identity;
      if (triggerOnElementChange) callback(0, 0);

      const scrollHandler =
        element === window
          ? () => {
              const { x, y } = getWindowScrollPosition();
              callback(y, x);
            }
          : () => {
              callback((element as HTMLElement).scrollTop, (element as HTMLElement).scrollLeft);
            };

      element.addEventListener("scroll", scrollHandler);
      return () => element.removeEventListener("scroll", scrollHandler);
    },
    [callback, triggerOnElementChange],
  );

  React.useEffect(() => () => disposeRef.current && disposeRef.current(), []);

  return React.useCallback(
    (el: HTMLElement | Window | null) => {
      if (disposeRef.current) disposeRef.current();
      disposeRef.current = runListener(el);
    },
    [runListener],
  );
}

export function useScrollOnStart() {
  const [scrolled, setScrolled] = React.useState(false);
  const setScrollableElement = useScrollCallback((y) => {
    if (y === 0) {
      setTimeout(setScrolled, 1, false);
      return;
    }
    if (scrolled) return;
    setTimeout(setScrolled, 1, true);
  });

  return [scrolled, setScrollableElement] as const;
}

export function useScrollToElement(center: boolean, behavior?: ScrollBehavior, position = "relative") {
  const scrollRef = React.useRef<HTMLElement | null>(null);
  const scrollToElementRef = React.useRef<HTMLElement | null>(null);
  const size = useMeasureDirty(scrollRef as any);
  const [run, setRun] = React.useState(false);

  React.useEffect(() => {
    scrollRef.current!.style.position = position;
  }, []);

  React.useEffect(() => {
    if (!run) return;
    if (size.height === 0) return;
    const { offsetTop, offsetHeight } = scrollToElementRef.current!;
    setRun(false);
    if (center) {
      scrollRef.current!.scrollTo({ behavior, top: offsetTop + offsetHeight / 2 - size.height / 2 });
      return;
    }
    scrollRef.current!.scrollTo({ behavior, top: offsetTop });
  }, [size, run]);

  return {
    scrollRef,
    scrollToElementRef,
    run() {
      setRun(true);
    },
  };
}


export interface ScrollInfo {
  inStartPos: boolean;
  inEndPos: boolean;
  value: number;
}
function getScrollInfo(target: HTMLElement | Window): ScrollInfo {
  let inEndPos = false;
  let inStartPos = false;
  let scrollValue = 0;
  let elHeight = 0;
  let scrollHeight = 0;

  if (target) {
    if ("pageYOffset" in target) {
      scrollValue = target.pageYOffset;
      elHeight = target.outerHeight;
      scrollHeight = target.outerHeight;
    } else {
      scrollValue = target.scrollTop;
      elHeight = target.clientHeight;
      scrollHeight = target.scrollHeight;
    }
    inEndPos = elHeight + scrollValue === scrollHeight;
    inStartPos = scrollValue === 0;
  }

  return {
    inStartPos,
    inEndPos,
    value: scrollValue,
  };
}

export function useVerticalScrollInfo(callback: (args: ScrollInfo) => void, triggerOnElementChange = false) {
  const disposeRef = React.useRef<Function>();
  const runListener = React.useCallback(
    (element: HTMLElement | Window | null) => {
      if (!element) return identity;
      if (triggerOnElementChange) callback(getScrollInfo(element));

      const scrollHandler = () => callback(getScrollInfo(element));

      element.addEventListener("scroll", scrollHandler);
      return () => element.removeEventListener("scroll", scrollHandler);
    },
    [callback, triggerOnElementChange],
  );

  React.useEffect(() => () => disposeRef.current && disposeRef.current(), []);

  return React.useCallback(
    (el: HTMLElement | Window | null) => {
      if (disposeRef.current) disposeRef.current();
      disposeRef.current = runListener(el);
    },
    [runListener],
  );
}
