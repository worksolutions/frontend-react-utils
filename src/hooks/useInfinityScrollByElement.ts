import React from "react";
import throttle from "lodash.throttle";

import { useSyncToRef } from "./useSyncToRef";

interface UseInfinityScrollByElementConfig {
  loading: boolean;
  hasNextPage: boolean;
  targetElementThresholdPercent?: number;
  startObservingDelay?: number;
  scrollCheckInterval?: number;
  onLoadMore: () => void;
}

type TargetElement = HTMLElement | null | undefined;

export function useInfinityScrollByElement({
  scrollCheckInterval = 200,
  targetElementThresholdPercent = 0,
  loading,
  startObservingDelay = 0,
  hasNextPage,
  onLoadMore,
}: UseInfinityScrollByElementConfig) {
  const [targetElement, setTargetElement] = React.useState<TargetElement>(null);
  const loadingRef = useSyncToRef(loading);
  const hasNextPageRef = useSyncToRef(hasNextPage);
  const onLoadMoreRef = useSyncToRef(onLoadMore);

  useScrollListener({
    targetElement,
    targetElementThresholdPercent,
    startObservingDelay,
    scrollCheckInterval,
    hasNextPage: hasNextPageRef,
    loading: loadingRef,
    onLoadMore: onLoadMoreRef,
  });

  return setTargetElement;
}

function useScrollListener({
  targetElement,
  hasNextPage,
  loading,
  targetElementThresholdPercent,
  onLoadMore,
  scrollCheckInterval,
  startObservingDelay,
}: {
  targetElement: TargetElement;
  targetElementThresholdPercent: number;
  scrollCheckInterval: number;
  startObservingDelay: number;
  hasNextPage: React.MutableRefObject<boolean>;
  loading: React.MutableRefObject<boolean>;
  onLoadMore: React.MutableRefObject<() => void>;
}) {
  React.useEffect(() => {
    if (!targetElement) return () => null;

    const listener = throttle(function ([entry]: IntersectionObserverEntry[]) {
      if (!hasNextPage.current || loading.current) return;
      if (!entry.isIntersecting) return;
      onLoadMore.current();
    }, scrollCheckInterval);

    let observer: IntersectionObserver | undefined = undefined;

    const startObservingTimeout = setTimeout(() => {
      observer = new IntersectionObserver(listener, {
        root: null,
        rootMargin: "0px",
        threshold: targetElementThresholdPercent,
      });
      observer.observe(targetElement);
    }, startObservingDelay);

    return () => {
      clearTimeout(startObservingTimeout);
      if (observer) observer.disconnect();
    };
  }, [
    hasNextPage,
    loading,
    onLoadMore,
    scrollCheckInterval,
    startObservingDelay,
    targetElement,
    targetElementThresholdPercent,
  ]);
}
