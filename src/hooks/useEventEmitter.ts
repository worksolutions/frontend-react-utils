import { useEffect, useRef } from "react";
import { EventEmitter } from "@worksolutions/utils";

export function useEventEmitter<EventsMap, Event extends keyof EventsMap>(
  eventEmitter: EventEmitter<EventsMap>,
  eventType: Event,
  handler: (payload: EventsMap[Event]) => void,
) {
  const previousHandlerRef = useRef<any>(null);
  useEffect(() => {
    const previousHandler = previousHandlerRef.current;
    previousHandler && eventEmitter.removeListener(eventType, previousHandler);
    eventEmitter.on(eventType, handler);
    previousHandlerRef.current = handler;
  }, [eventEmitter, eventType, handler]);

  useEffect(
    () => () => {
      eventEmitter.removeListener(eventType, previousHandlerRef.current);
    },
    [eventEmitter, eventType],
  );
}
