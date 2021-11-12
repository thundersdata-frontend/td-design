/* eslint-disable */
import { useEffect, useRef } from 'react';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit(val: T) {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  }

  useSubscription(cb: Subscription<T>) {
    const callbackRef = useRef<Subscription<T>>();
    callbackRef.current = cb;

    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }

      this.subscriptions.add(subscription);

      return () => {
        this.subscriptions.delete(subscription);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }
}

export default function useEventEmitter<T = void>() {
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}
