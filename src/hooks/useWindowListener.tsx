import { useEffect } from "react";

type EventType = keyof WindowEventMap;

const useWindowListener = (eventType: EventType, listener: EventListener) => {
  useEffect(() => {
    window.addEventListener(eventType, listener);

    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
};

export default useWindowListener;
