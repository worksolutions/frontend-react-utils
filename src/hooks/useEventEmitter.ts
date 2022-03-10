import { useEffect, useRef } from "react";
import { EventEmitter } from "@worksolutions/utils";

type HandlerResult = void | (() => void);

export function useEventEmitter<
  EventsMap,
  Event extends keyof EventsMap,
  Handler extends (payload: EventsMap[Event]) => HandlerResult,
>(eventEmitter: EventEmitter<EventsMap>, eventType: Event, handler: Handler) {
  const previousHandlerRef = useRef<Handler | null>(null);
  const previousHandlerResultRef = useRef<HandlerResult>();

  useEffect(() => {
    if (previousHandlerRef.current) eventEmitter.removeListener(eventType, previousHandlerRef.current);
    const resultHandler = ((payload) => {
      if (previousHandlerResultRef.current) previousHandlerResultRef.current();
      return (previousHandlerResultRef.current = handler(payload));
    }) as Handler;
    eventEmitter.on(eventType, resultHandler);
    previousHandlerRef.current = resultHandler;
  }, [previousHandlerRef, eventEmitter, eventType, handler]);

  useEffect(
    () => () => {
      if (!previousHandlerRef.current) return;
      eventEmitter.removeListener(eventType, previousHandlerRef.current);
    },
    [previousHandlerRef, eventEmitter, eventType],
  );
}
