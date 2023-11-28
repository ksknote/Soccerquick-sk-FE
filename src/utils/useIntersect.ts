import { useCallback, useEffect, useRef } from 'react';
import debounce from './debounce';

type IntersectHandler = () => void;

const useIntersect = (
  onIntersect: IntersectHandler, //타겟의 가시성 상태가 변경될 때 호출될 콜백 함수
  options?: IntersectionObserverInit //Intersection Observer의 설정 옵션
) => {
  let observerRef = useRef<IntersectionObserver | null>(null);
  const ref = useRef<HTMLDivElement>(null); // Intersection Observer를 연결할 DOM 요소

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        onIntersect(); //타겟이 뷰포트에 노출된 경우
      }
    },
    [onIntersect]
  );

  const debouncedCallback = debounce(callback, 300);

  // Intersection Observer 설정
  useEffect(() => {
    if (!ref.current) return; //마운트 되었는지 확인
    // eslint-disable-next-line
    observerRef.current = new IntersectionObserver(debouncedCallback, options);
    observerRef.current.observe(ref.current); //타겟 관찰
    return () => {
      //컴포넌트가 언마운트되면 관찰 중지
      observerRef.current && observerRef.current.disconnect();
    };
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;
