import React from "react";
import { observe, toJS } from "mobx";
import { deepObserve } from "mobx-utils";
import { isString } from "@worksolutions/utils";

export type ObservableAsStateOptions = { fireImmediately?: boolean; convertToJS?: boolean; deep?: boolean };

export function useObservableAsSimpleValue<T, K extends keyof T>(
  target: T,
  key: K,
  options?: ObservableAsStateOptions,
): T[K];
export function useObservableAsSimpleValue<T>(target: T, options?: ObservableAsStateOptions): T;
export function useObservableAsSimpleValue<T>(target: T, ...otherOptions: any[]) {
  const { key, convertToJS, fireImmediately, deep } = getOverloadedParams(otherOptions);
  const getValue = React.useCallback(() => {
    const value = key === undefined ? target : target[key as keyof T];
    return convertToJS ? toJS(value) : value;
  }, [convertToJS, key, target]);

  const [value, setValue] = React.useState(getValue);

  React.useEffect(() => {
    let enabled = true;
    const dispose = createObserverForStateHook(
      target,
      key,
      function () {
        if (!enabled) return;
        setValue(getValue);
      },
      { fireImmediately, deep },
    );
    return function () {
      enabled = false;
      dispose();
    };
  }, [deep, fireImmediately, getValue, key, target]);

  return value;
}

function getOverloadedParams(params: any[]): {
  key: string | undefined;
  fireImmediately?: boolean;
  convertToJS?: boolean;
  deep?: boolean;
} {
  if (isString(params[0])) return { key: params[0], ...(params[1] || {}) };
  return { key: undefined, ...(params[0] || {}) };
}

export function createObserverForStateHook(
  target: any,
  key: any,
  callback: () => void,
  { fireImmediately, deep }: { fireImmediately?: boolean; deep?: boolean },
) {
  if (key === undefined) {
    if (deep) {
      if (fireImmediately) callback();
      return deepObserve(target, callback);
    }
    return observe(target, callback, fireImmediately);
  }

  if (deep) {
    if (fireImmediately) callback();
    return deepObserve(target[key], callback);
  }

  return observe(target, key, callback, fireImmediately);
}
