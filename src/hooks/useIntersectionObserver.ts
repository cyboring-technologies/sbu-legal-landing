import { useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Reusable hook for IntersectionObserver
 * Consolidates observer logic to reduce memory overhead
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  callback: (isIntersecting: boolean) => void,
  options: UseIntersectionObserverOptions = {}
): RefObject<T> {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasTriggeredRef.current) return;
            callback(true);
            hasTriggeredRef.current = true;
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, threshold, rootMargin, triggerOnce]);

  return ref;
}

/**
 * Hook for observing multiple elements with staggered animation
 */
export function useStaggeredIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  count: number,
  callback: (index: number) => void,
  delay: number = 150,
  options: UseIntersectionObserverOptions = {}
): RefObject<T>[] {
  const { threshold = 0.2 } = options;
  const refs = useRef<RefObject<T>[]>(Array.from({ length: count }, () => ({ current: null })));

  useEffect(() => {
    const currentRefs = refs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                callback(index);
              }, index * delay);
            }
          });
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (currentRefs[index].current) {
          observer.unobserve(currentRefs[index].current!);
        }
      });
    };
  }, [count, callback, delay, threshold]);

  return refs.current as RefObject<T>[];
}
