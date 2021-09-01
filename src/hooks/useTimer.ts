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
  onSuccess?: () => void;
  initialValue: () => number;
  finisher?: (value: number) => boolean;
  tickHandler: (value: number) => number;
}) {
  const forceUpdate = useForceUpdate();
  const timerRef = useRef<NodeJS.Timer>(null!);
  const valueRef = useRef(initialValue() || 0);

  const start = useCallback(
    (seconds?: number) => {
      clearInterval(timerRef.current);
      valueRef.current = isNil(seconds) ? initialValue() : seconds;
      forceUpdate();

      if (finisher && finisher(valueRef.current)) {
        if (onSuccess) onSuccess();
        return;
      }

      timerRef.current = setInterval(() => {
        valueRef.current = tickHandler(valueRef.current);
        forceUpdate();
        if (finisher && finisher(valueRef.current)) {
          clearInterval(timerRef.current);
          if (onSuccess) onSuccess();
        }
      }, interval);
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
  }, []);

  return {
    value: valueRef.current,
    start,
    stop,
  };
}
