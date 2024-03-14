import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";

export function useBoolean(initial: boolean | (() => boolean)) {
  const [state, setState] = useState(initial);
  const enable = React.useCallback(() => setState(true), []);
  const disable = React.useCallback(() => setState(false), []);
  return [state, enable, disable] as const;
}

export function useToggle(initial: boolean | (() => boolean)) {
  const [state, setState] = useState(initial);
  const toggle = React.useCallback(() => setState((state) => !state), []);
  return [state, toggle] as const;
}

export function useForceUpdate() {
  const [, updateState] = useState({});
  return useCallback(() => updateState({}), []);
}

export function useDebounceRef<ARGS extends any[]>(debounceTime: number, callback: (...args: ARGS) => void) {
  const memoizedDebounce = useMemo(() => debounce(callback, debounceTime), [callback, debounceTime]);
  const debounceRef = useRef<((...args: ARGS) => void) & { cancel: Function }>(memoizedDebounce);
  useEffectSkipFirst(() => void (debounceRef.current = memoizedDebounce), [memoizedDebounce]);
  useEffect(() => () => debounceRef.current.cancel(), [memoizedDebounce]);
  return debounceRef;
}

export function useEffectSkipFirst(callback: React.EffectCallback, dependencies?: React.DependencyList) {
  const wasChanged = useRef(false);
  useEffect(function () {
    if (wasChanged.current) return callback();
    wasChanged.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useMemo(() => void (ref.current = value), [value]);
  return ref.current;
}
