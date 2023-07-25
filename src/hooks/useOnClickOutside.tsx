import { RefObject, useEffect, useRef } from "react";

type AnyEvent = MouseEvent | TouchEvent;

type EventType = "mousedown" | "touchstart";

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
  eventTypes: EventType[] = ["mousedown", "touchstart"]
): void => {
  const listener = useRef((event: AnyEvent) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Element)) {
      return;
    }

    handler(event);
  });

  useEffect(() => {
    eventTypes.forEach((eventType) => {
      document.addEventListener(eventType, listener.current);
    });

    return () => {
      eventTypes.forEach((eventType) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        document.removeEventListener(eventType, listener.current);
      });
    };
  }, [ref, handler, eventTypes]);
};

export default useOnClickOutside;
