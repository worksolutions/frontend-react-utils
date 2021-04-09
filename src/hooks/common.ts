import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { once } from "ramda";

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

export const useOnce = (cb: (data?: any) => any, delay = 0) => {
  const [func] = useState(() => once(delay ? (data?: any) => setTimeout(() => cb(data), delay) : cb));
  return func;
};

export function useForceUpdate() {
  const [, updateState] = useState({});
  return useCallback(() => updateState({}), []);
}

export function useDebounce(debounceTime: number, callback: (...args: any[]) => void) {
  const debounceRef = useRef<ReturnType<typeof debounce>>(null!);
  useEffect(() => {
    debounceRef.current = debounce(callback, debounceTime);
    return () => debounceRef.current.cancel();
  }, [callback]);

  return { run: (...args: any) => debounceRef.current(...args), debounceRef };
}

export const useEffectSkipFirst = (callback: React.EffectCallback, dependencies?: any[]) => {
  const wasChanged = useRef(false);
  useEffect(function () {
    if (wasChanged.current) return callback();
    wasChanged.current = true;
  }, dependencies);
};

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
