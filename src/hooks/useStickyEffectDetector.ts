import React from "react";

import { useEffectSkipFirst, usePrevious } from "./common";

function useStickyEffectDetector(onChangeStickyEffect: (sticky: boolean) => void) {
  const onChangeStickyEffectRef = React.useRef(onChangeStickyEffect);

  useEffectSkipFirst(() => {
    onChangeStickyEffectRef.current = onChangeStickyEffect;
  }, [onChangeStickyEffect]);

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.boundingClientRect.width === 0 || entry.boundingClientRect.height === 0) return;
          onChangeStickyEffectRef.current(entry.intersectionRatio < 1);
        },
        { threshold: [1] },
      ),
    [],
  );

  const previousObserver = usePrevious(observer);

  useEffectSkipFirst(() => previousObserver.disconnect(), [observer]);

  return React.useMemo(
    () => (element?: HTMLElement) => {
      if (!element) return;
      observer.observe(element);
    },
    [observer],
  );
}
