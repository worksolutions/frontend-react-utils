import React from "react";
import { append, remove, last } from "ramda";

export function useStackState<ELEMENT>(initialStack?: ELEMENT[]) {
  const [stack, setStack] = React.useState(() => (initialStack ? [...initialStack] : []));
  const stackLast = React.useMemo(() => last(stack), [stack]);
  const push = React.useCallback((element: ELEMENT) => setStack(append(element)), []);
  const pop = React.useCallback(() => setStack(remove(-1, 1)), []);
  const reset = React.useCallback((newStack: ELEMENT[] = []) => setStack(newStack), []);

  return React.useMemo(() => ({ stack, length: stack.length, last: stackLast, push, pop, reset }), [
    stack,
    stackLast,
    push,
    pop,
    reset,
  ]);
}
