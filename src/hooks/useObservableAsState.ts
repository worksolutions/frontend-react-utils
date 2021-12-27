import React from "react";
import { observe, toJS } from "mobx";
import { isString } from "@worksolutions/utils";

export type ObservableAsStateOptions = { fireImmediately?: boolean; convertToJS?: boolean };

export function useObservableAsState<T, K extends keyof T>(target: T, key: K, options?: ObservableAsStateOptions): T[K];
export function useObservableAsState<T>(target: T, options?: ObservableAsStateOptions): T;
export function useObservableAsState<T>(target: T, ...otherOptions: any[]) {
  const { key, convertToJS, fireImmediately } = getOverloadedParams(otherOptions);
  const getValue = React.useCallback(() => {
    const value = key === undefined ? target : target[key as keyof T];
    return convertToJS ? toJS(value) : value;
  }, [convertToJS, key, target]);

  const [value, setValue] = React.useState(getValue);

  React.useEffect(() => {
    let enabled = true;
    const dispose = createObserver(
      target,
      key,
      function () {
        if (!enabled) return;
        setValue(getValue);
      },
      fireImmediately,
    );
    return function () {
      enabled = false;
      dispose();
    };
  }, [fireImmediately, getValue, key, target]);

  return value;
}

function getOverloadedParams(params: any[]): {
  key: string | undefined;
  fireImmediately?: boolean;
  convertToJS?: boolean;
} {
  if (isString(params[0])) return { key: params[0], ...(params[1] || {}) };
  return { key: undefined, ...(params[0] || {}) };
}

function createObserver(target: any, key: any, callback: () => void, fireImmediately?: boolean) {
  if (key === undefined) return observe(target, callback, fireImmediately);
  return observe(target, key, callback, fireImmediately);
}
