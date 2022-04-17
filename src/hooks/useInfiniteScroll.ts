import React from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

import { useSyncToRef } from "./useSyncToRef";

type UseInfiniteScrollDirection = "down" | "up";

interface UseInfiniteScrollConfig {
  loading: boolean;
  hasNextPage: boolean;
  threshold?: number;
  startObservingDelay?: number;
  scrollCheckInterval?: number;
  direction?: UseInfiniteScrollDirection;
  onLoadMore: () => void;
}

type ScrollableElement = HTMLElement | Window | null | undefined;

function isWindow(element: HTMLElement | Window): element is Window {
  return element === window;
}

const scrollRemainderDetectors = {
  down: function (element: HTMLElement | Window) {
    if (isWindow(element)) return document.documentElement.scrollHeight - element.scrollY - element.innerHeight;
    return element.scrollHeight - element.scrollTop - element.offsetHeight;
  },
  up: function (element: HTMLElement | Window) {
    if (isWindow(element)) return element.scrollY;
    return element.scrollTop;
  },
};

export function useInfiniteScroll({
  scrollCheckInterval = 200,
  threshold = 200,
  loading,
  startObservingDelay = 0,
  direction = "down",
  hasNextPage,
  onLoadMore,
}: UseInfiniteScrollConfig) {
  const [scrollableElement, setScrollableElement] = React.useState<ScrollableElement | null>(null);
  const loadingRef = useSyncToRef(loading);
  const hasNextPageRef = useSyncToRef(hasNextPage);
  const onLoadMoreRef = useSyncToRef(onLoadMore);

  useScrollListener({
    scrollableElement,
    threshold,
    startObservingDelay,
    scrollCheckInterval,
    direction,
    hasNextPage: hasNextPageRef,
    loading: loadingRef,
    onLoadMore: onLoadMoreRef,
  });

  useResizeObserver({
    scrollableElement,
    scrollCheckInterval,
    hasNextPage: hasNextPageRef,
    loading: loadingRef,
    onLoadMore: onLoadMoreRef,
  });

  return setScrollableElement;
}

function useScrollListener({
  scrollableElement,
  hasNextPage,
  loading,
  threshold,
  direction,
  onLoadMore,
  scrollCheckInterval,
  startObservingDelay,
}: {
  scrollableElement: ScrollableElement | null;
  threshold: number;
  scrollCheckInterval: number;
  startObservingDelay: number;
  direction: UseInfiniteScrollDirection;
  hasNextPage: React.MutableRefObject<boolean>;
  loading: React.MutableRefObject<boolean>;
  onLoadMore: React.MutableRefObject<() => void>;
}) {
  React.useEffect(() => {
    if (!scrollableElement) return () => null;

    const listener = throttle(function () {
      if (!hasNextPage.current || loading.current) return;
      const scrollToEnd = scrollRemainderDetectors[direction](scrollableElement);
      if (scrollToEnd > threshold) return;
      onLoadMore.current();
    }, scrollCheckInterval);

    const startObservingTimeout = setTimeout(
      () => scrollableElement.addEventListener("scroll", listener),
      startObservingDelay,
    );

    return () => {
      clearTimeout(startObservingTimeout);
      scrollableElement.removeEventListener("scroll", listener);
    };
  }, [
    direction,
    startObservingDelay,
    hasNextPage,
    loading,
    onLoadMore,
    scrollCheckInterval,
    scrollableElement,
    threshold,
  ]);
}

function useResizeObserver({
  scrollableElement,
  hasNextPage,
  loading,
  onLoadMore,
  scrollCheckInterval,
}: {
  scrollableElement: ScrollableElement | null;
  scrollCheckInterval: number;
  hasNextPage: React.MutableRefObject<boolean>;
  loading: React.MutableRefObject<boolean>;
  onLoadMore: React.MutableRefObject<() => void>;
}) {
  const previousActiveClientHeight = useSyncToRef(0);

  React.useEffect(() => {
    if (!scrollableElement) return () => null;
    if (isWindow(scrollableElement)) return;

    const resizeObserver = new ResizeObserver(
      debounce(([entry]: ResizeObserverEntry[]) => {
        if (!entry) return;

        const newClientHeight = Math.round(entry.contentRect.height);

        if (newClientHeight === 0) return;
        if (previousActiveClientHeight.current === newClientHeight) return;
        if (!hasNextPage.current || loading.current) return;
        if (scrollableElement.clientHeight !== scrollableElement.scrollHeight) return;

        onLoadMore.current();
        previousActiveClientHeight.current = newClientHeight;
      }, scrollCheckInterval),
    );

    resizeObserver.observe(scrollableElement);
    return () => resizeObserver.disconnect();
  }, [scrollableElement, previousActiveClientHeight, hasNextPage, loading, scrollCheckInterval, onLoadMore]);
}
