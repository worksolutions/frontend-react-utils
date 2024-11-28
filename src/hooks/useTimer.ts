import React from "react";

import { useBoolean } from "./common";
import { useSyncToRef } from "./useSyncToRef";

interface TimerOptions {
  interval: number;
  initialValue: number;
  tickHandler: (value: number) => number;
  finisher: (value: number) => boolean;
  onSuccess?: () => void;
  onStop?: () => void;
}

export function useTimer({ finisher, tickHandler, initialValue, interval, onSuccess, onStop }: TimerOptions) {
  const [value, setValue] = React.useState(initialValue);
  const valueRef = useSyncToRef(value);
  const [enabled, enable, disable] = useBoolean(false);

  React.useEffect(() => {
    if (!enabled) return;
    if (finisher(valueRef.current)) return void onSuccess?.();
    const timer = setInterval(() => {
      const newValue = tickHandler(valueRef.current);
      setValue(newValue);
      if (!finisher(valueRef.current)) return;
      clearInterval(timer);
      onSuccess?.();
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, finisher, interval, onSuccess, tickHandler, valueRef]);

  const start = React.useCallback(() => enable(), [enable]);

  const stop = React.useCallback(() => {
    onStop?.();
    disable();
  }, [disable, onStop]);

  const reset = React.useCallback(() => setValue(initialValue), [initialValue]);

  return { value, start, stop, reset };
}
