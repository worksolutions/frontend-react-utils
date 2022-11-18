import React, { DependencyList } from "react";
import { memoizeWith } from "ramda";

/**
 * Memoize callback in React.useCallback hook
 * @param callback - useCallback hook callback
 * @param deps - useCallback hook dependencies
 * @param memoizeWithParam - function to detect changes: => key for memoize
 */
export function useMemoizeCallback<ARGS extends any[], RESULT>(
  callback: (...args: ARGS) => RESULT,
  deps: DependencyList,
  memoizeWithParam: (...args: ARGS) => any,
): (...args: ARGS) => RESULT {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = React.useCallback(callback, deps);

  return React.useMemo(
    () => memoizeWith(memoizeWithParam as any, memoizedCallback as any),
    [memoizeWithParam, memoizedCallback],
  );
}
