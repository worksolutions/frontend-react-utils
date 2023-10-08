import React from "react";

export function useStackState<ELEMENT>(initialStack?: ELEMENT[]) {
  const [stack, setStack] = React.useState(() => (initialStack ? [...initialStack] : []));
  const stackLast = React.useMemo(() => stack[stack.length - 1], [stack]);
  const push = React.useCallback((element: ELEMENT) => setStack((stack) => [...stack, element]), []);
  const pop = React.useCallback(() => setStack((stack) => stack.slice(0, -1)), []);
  const reset = React.useCallback((newStack: ELEMENT[] = []) => setStack(newStack), []);

  return React.useMemo(
    () => [stack, { length: stack.length, last: stackLast, push, pop, reset }] as const,
    [stack, stackLast, push, pop, reset],
  );
}
