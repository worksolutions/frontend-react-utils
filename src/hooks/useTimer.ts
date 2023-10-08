import { useCallback, useEffect, useRef } from "react";
import { isNil } from "@worksolutions/utils";

import { useForceUpdate } from "./common";

export function useTimer({
  finisher,
  tickHandler,
  initialValue,
  interval,
  onSuccess,
}: {
  interval: number;
  initialValue: () => number;
  tickHandler: (value: number) => number;
  finisher: (value: number) => boolean;
  onSuccess?: (canceled: boolean) => void;
}) {
  const forceUpdate = useForceUpdate();
  const timerRef = useRef<any>(null!);
  const valueRef = useRef(initialValue() || 0);

  const start = useCallback(
    (seconds?: number) => {
      clearInterval(timerRef.current);
      valueRef.current = isNil(seconds) ? initialValue() : seconds;
      forceUpdate();

      if (finisher(valueRef.current)) {
        if (onSuccess) onSuccess(false);
        return;
      }

      timerRef.current = setInterval(() => {
        valueRef.current = tickHandler(valueRef.current);
        forceUpdate();
        if (finisher(valueRef.current)) {
          clearInterval(timerRef.current);
          if (onSuccess) onSuccess(false);
        }
      }, interval);
    },
    [finisher, forceUpdate, tickHandler, initialValue, interval, onSuccess],
  );

  const stop = useCallback(() => {
    if (onSuccess) onSuccess(true);
    clearInterval(timerRef.current);
  }, [onSuccess]);

  useEffect(() => {
    valueRef.current = initialValue();
    return () => clearInterval(timerRef.current);
  }, [initialValue]);

  return {
    value: valueRef.current,
    start,
    stop,
  };
}
