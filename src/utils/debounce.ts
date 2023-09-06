let timer: NodeJS.Timeout | null = null; //지연 호출을 관리할 타이머 선언

const debounce = (fn: Function, delay: number) => {
  return (...args: any[]) => {
    //클로저(debounce된 함수) 반환
    if (timer) {
      clearTimeout(timer); //새로운 함수 호출이 들어올 때마다 타이머 리셋
      timer = null;
    }
    timer = setTimeout(() => {
      fn(...args); //새로운 타이머 설정 delay밀리초 후에 func함수 호출
    }, delay);
  };
};

//새로운 호출이 delay 밀리초 내에 들어오면, 이전 타이머가 취소되고 새로운 타이머가 설정되며, 함수는 마지막 호출 이후에 실행됩니다.
//만약 delay 밀리초 동안 다른 호출이 없으면, 타이머가 만료되고 해당 함수가 실행됩니다.

export default debounce;
