// Reference: https://github.com/streamich/react-use/blob/master/src/useAsyncFn.ts

import React, { DependencyList, useCallback } from "react";
import { useMountedState } from "react-use";
import { assoc } from "ramda";

import { useSyncToRef } from "./useSyncToRef";

export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

const initialStateValue = { loading: false };
export function useAsyncFn<FUNC extends (...args: any[]) => Promise<FUNC_RESULT>, FUNC_RESULT>(
  func: FUNC,
  deps: DependencyList = [],
  initialState: AsyncState<FUNC_RESULT> = initialStateValue,
) {
  const lastCallId = React.useRef(0);
  const isMounted = useMountedState();
  const [state, setState] = React.useState(initialState);
  const stateRef = useSyncToRef(state);
  const loadingAvailable = React.useRef(true);
  const enableLoadingAvailable = useCallback(() => (loadingAvailable.current = true), []);
  const disableLoadingAvailable = useCallback(() => (loadingAvailable.current = false), []);

  const callback = useCallback((...args: Parameters<FUNC>) => {
    const callId = ++lastCallId.current;

    if (!stateRef.current.loading && loadingAvailable.current) setState(assoc("loading", true));

    return func(...args).then(
      (value) => {
        if (isMounted() && callId === lastCallId.current) setState({ value, loading: false });
        return value;
      },
      (error) => {
        if (isMounted() && callId === lastCallId.current) setState({ error, loading: false });
        return error;
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps) as FUNC;

  return [state, callback, enableLoadingAvailable, disableLoadingAvailable] as const;
}
