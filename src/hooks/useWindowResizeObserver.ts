import React from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

export function useWindowResizeObserver(
  callback: () => void,
  { debounce: debounceTime = 300, throttle: throttleTime = 300, enabled = true } = {},
) {
  React.useEffect(() => {
    if (!enabled) return;
    const disposers: Function[] = [];

    const debouncedObserver = debounce(callback, debounceTime);
    window.addEventListener("resize", debouncedObserver);
    disposers.push(() => window.removeEventListener("resize", debouncedObserver));

    if (throttleTime !== 0) {
      const throttledObserver = throttle(callback, throttleTime);
      window.addEventListener("resize", throttledObserver);
      disposers.push(() => window.removeEventListener("resize", throttledObserver));
    }

    return () => disposers.forEach((func) => func());
  }, [callback, debounceTime, enabled, throttleTime]);
}
