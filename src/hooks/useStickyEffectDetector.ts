import React from "react";

import { useEffectSkipFirst } from "./common";
import { useSyncToRef } from "./useSyncToRef";

export function useStickyEffectDetector(onChangeStickyEffect: (sticky: boolean) => void) {
  const [observer, setObserver] = React.useState<IntersectionObserver>();
  const onChangeStickyEffectRef = useSyncToRef(onChangeStickyEffect);
  React.useEffect(() => setObserver(createObserver(onChangeStickyEffectRef)), [onChangeStickyEffectRef]);

  useEffectSkipFirst(() => () => observer?.disconnect(), [observer]);

  const [observableElement, setObservableElement] = React.useState<HTMLElement>();
  React.useEffect(() => {
    if (!observer) return;
    if (!observableElement) return observer.disconnect();
    observer.observe(observableElement);
    return () => observer.unobserve(observableElement);
  }, [observableElement, observer]);

  return setObservableElement;
}

function createObserver(callbackRef: React.MutableRefObject<(sticky: boolean) => void>) {
  return new IntersectionObserver(
    ([entry]) => {
      if (entry.boundingClientRect.width === 0 || entry.boundingClientRect.height === 0) return;
      callbackRef.current(entry.intersectionRatio < 1);
    },
    { threshold: [1] },
  );
}
