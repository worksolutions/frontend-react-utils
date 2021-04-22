import React, { DependencyList } from "react";
import { memoizeWith } from "ramda";

/**
 * Memoize callback in React.useCallback hook
 * @param memoizeWithParam - function to detect changes: => key for memoize
 * @param callback - useCallback hook callback
 * @param deps - useCallback hook dependencies
 */
export function useCallbackMemoFabric<ARGS extends any[], RESULT>(
  memoizeWithParam: null | ((...args: ARGS) => any),
  callback: (...args: ARGS) => RESULT,
  deps: DependencyList = [],
) {
  return React.useMemo(() => memoizeWith((memoizeWithParam || (() => null)) as any, callback as any), [
    memoizeWithParam,
    callback,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);
}
