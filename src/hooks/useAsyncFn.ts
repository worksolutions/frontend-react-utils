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
export default function useAsyncFn<FUNC extends (...args: any[]) => Promise<any>>(
  func: FUNC,
  deps: DependencyList = [],
  initialState: AsyncState<ReturnType<FUNC>> = initialStateValue,
) {
  const lastCallId = React.useRef(0);
  const isMounted = useMountedState();
  const [state, setState] = React.useState(initialState);
  const stateRef = useSyncToRef(state);

  const callback = useCallback((...args: Parameters<FUNC>): ReturnType<FUNC> => {
    const callId = ++lastCallId.current;

    if (!stateRef.current.loading) setState(assoc("loading", true));

    return func(...args).then(
      (value) => {
        if (isMounted() && callId === lastCallId.current) setState({ value, loading: false });
        return value;
      },
      (error) => {
        if (isMounted() && callId === lastCallId.current) setState({ error, loading: false });
        return error;
      },
    ) as ReturnType<FUNC>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, callback] as const;
}
