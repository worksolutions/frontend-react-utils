import { useCallback, useEffect, useRef } from "react";
import { isNil } from "ramda";

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
  onSuccess?: () => void;
}) {
  const forceUpdate = useForceUpdate();
  const timerRef = useRef<NodeJS.Timeout>(null!);
  const valueRef = useRef(0);

  const start = useCallback(
    (seconds?: number) => {
      clearInterval(timerRef.current);
      if (finisher(valueRef.current)) {
        if (onSuccess) onSuccess();
        return;
      }

      valueRef.current = isNil(seconds) ? initialValue() : seconds;
      forceUpdate();

      timerRef.current = setInterval(() => {
        valueRef.current = tickHandler(valueRef.current);
        forceUpdate();
        if (finisher(valueRef.current)) {
          clearInterval(timerRef.current);
          if (onSuccess) onSuccess();
        }
      }, interval) as any;
    },
    [finisher, forceUpdate, tickHandler, initialValue, interval, onSuccess],
  );

  const stop = useCallback(() => {
    if (onSuccess) onSuccess();
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
