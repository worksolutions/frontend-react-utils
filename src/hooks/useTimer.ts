import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { isNil } from "ramda";

import { useEffectSkipFirst, useForceUpdate } from "./common";

enum TimerStatus {
  Stopped = "Stopped",
  Running = "Running",
}

enum ReducerType {
  ChangeValue = "ChangeValue",
}

type timerState = { status: TimerStatus; value: number };
type Action = { type: TimerStatus | ReducerType; payload?: { status?: TimerStatus; value?: number } };

const reducer = (state: timerState, action: Action) => {
  if (action.type === TimerStatus.Running) return { ...state, ...action.payload };
  if (action.type === TimerStatus.Stopped) return { ...state, ...action.payload };
  if (action.type === ReducerType.ChangeValue) return { ...state, ...action.payload };
  return { status: TimerStatus.Stopped, value: 0 };
};

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
  const timerRef = useRef<NodeJS.Timer>(null!);
  const [{ value, status }, dispatch] = useReducer(reducer, {
    status: TimerStatus.Stopped,
    value: initialValue() || 0,
  });

  const start = useCallback(
    () => dispatch({ type: TimerStatus.Running, payload: { value: initialValue(), status: TimerStatus.Running } }),
    [],
  );
  const stop = useCallback(() => {
    dispatch({ type: TimerStatus.Stopped, payload: { status: TimerStatus.Stopped } });
    if (onSuccess) onSuccess();
  }, [onSuccess]);

  const changeValue = useCallback(
    (value) => dispatch({ type: ReducerType.ChangeValue, payload: { value: tickHandler(value) } }),
    [tickHandler],
  );

  useEffect(() => {
    if (status !== TimerStatus.Stopped) {
      if (finisher && finisher(value)) stop();
    }
  }, [finisher, onSuccess, value, status]);

  useEffect(() => {
    if (status === TimerStatus.Running) {
      timerRef.current = setInterval(() => changeValue(value), interval);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, value, tickHandler, timerRef.current]);

  return { value, start, stop };
}
