import React, { useCallback, useEffect, useRef } from 'react';

type IntersectHandler = () => void;

const useIntersect = (
  onIntersect: IntersectHandler, //타겟의 가시성 상태가 변경될 때 호출될 콜백 함수
  options?: IntersectionObserverInit //Intersection Observer의 설정 옵션
) => {
  const ref = useRef<HTMLDivElement>(null); // Intersection Observer를 연결할 DOM 요소

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(); //타겟이 뷰포트에 노출된 경우
      });
    },
    [onIntersect]
  );

  // Intersection Observer 설정
  useEffect(() => {
    if (!ref.current) return; //마운트 되었는지 확인
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current); //타겟 관찰
    return () => observer.disconnect(); //컴포넌트가 언마운트되면 관찰 중지
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;
