import React from "react";

import { useEffectSkipFirst } from "./common";
import { useSyncToRef } from "./useSyncToRef";

export function useStickyEffectDetector(onChangeStickyEffect: (sticky: boolean) => void, rootMargin?: string) {
  const [observer, setObserver] = React.useState<IntersectionObserver>();
  const onChangeStickyEffectRef = useSyncToRef(onChangeStickyEffect);
  React.useEffect(
    () => setObserver(createObserver(onChangeStickyEffectRef, rootMargin)),
    [onChangeStickyEffectRef, rootMargin],
  );

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

function createObserver(callbackRef: React.MutableRefObject<(sticky: boolean) => void>, rootMargin?: string) {
  return new IntersectionObserver(
    ([entry]) => {
      if (entry.boundingClientRect.width === 0 || entry.boundingClientRect.height === 0) return;
      callbackRef.current(entry.intersectionRatio < 1);
    },
    { threshold: [1], rootMargin },
  );
}
