**useMemo**  
useMemo는 컴포넌트 최상단에서 useMemo를 호출하고 리렌더링 사이의 계산 결과를 캐시할 수 있는 React 훅이다. 성능을 최적화 할 때 자주 쓰이는 훅이다.

```js
const cachedValue = useMemo(calculateValue, dependencies);
```

- calculateValue  
  캐시하려는 값을 계산하는 함수다. 이 함수는 순수함수여야 하며 인자를 받지 않는다. 반드시 어떤 타입이든 값을 반환해야한다.

- dependencies  
  이 배열 안에 넣은 내용이 바뀔 경우 우리가 등록한 함수를 호출하여 값을 연산해주고, 만약에 내용이 바뀌지 않을 경우 이전에 연산한 값을 재사용한다.

- return  
  초기 렌더링에선 useMemo는 인자 없이 calculateValue를 호출한 결과를 반환하고, 의존성이 변경되지 않을 경우에는 마지막 렌더링에서 저장된 값을 반환, 변경된 경우 calculateValue를 다시 호출하여 그 결과를 반환한다.

-[useMemo](https://react-ko.dev/reference/react/useMemo)  
-[useMemo 를 사용하여 연산한 값 재사용하기](https://react.vlpt.us/basic/17-useMemo.html)
