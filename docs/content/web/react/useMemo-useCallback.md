---
title: React useMemo와 useCallback
date: 2023-05-31
author: 임하연, 이시현
tags: [React, Hook, useMemo, useCallback, Performance]
---

# React useMemo와 useCallback

## 렌더링과 리렌더링

- `useMemo`와 `useCallback`은 렌더에서 수행해야 하는 작업의 양을 줄이고, 컴포넌츠가 다시 렌더링해야하는 횟수를 줄이면서 **리렌더링 최적화**를 하게 됨
- 컴포넌트의 렌더링
  - 누군가가 함수(컴포넌트)를 호출해 실행되는 것
  - 함수가 실행될 때마다 내부에 선언되어 있던 표현식(변수, 또는 다른 함수 등)도 매번 다시 선언되어 사용됨
- 리렌더링
  - 리액트에서 초기에 한번 렌더링을 진행하고, 그 이후에 **특정 조건이 발생하면 다시 렌더링을 진행**하는 것

<br>

### 리액트에서 리렌더링이 일어나는 조건

1. 자신의 state가 변경이 될 때
2. 부모 컴포넌트로부터 전달받은 props가 변경될 때
3. 부모 컴포넌트가 리렌더링 될 때
4. `forceUpdate` 함수가 실행될 때

<br>

## 메모이제이션(Memoization)

- 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때 이전에 계산한 값을 메모리에 저장하는 것
- `useMemo`와 `useCallback`은 메모이제이션 기능을 제공하는 React의 내장 hook
- 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술

<br>

## useMemo

```jsx
const cachedValue = useMemo(calculateValue, dependencies);
```

- 계산 비용이 높은 함수의 **결과를 캐싱**해 **동일한 입력값에 대해서는 이전에 계산된 결과값을 반환**하면서 성능을 최적화하는 데 사용됨
- 첫 번째 인자(calculateValue):
  - 캐시하려는 값을 계산하는 순수 함수
  - 인자를 받지 않음
  - 반드시 어떤 타입이든 값을 반환해야 함
- 두 번째 인자(dependencies):
  - 의존성 배열의 값이 변경될 때만 calculateValue를 다시 실행
  - 변경되지 않으면 이전에 계산된 값을 재사용

### useMemo 사용 시점

1. **복잡한 계산이 필요한 경우**

   ```jsx
   // 필터링과 합계 계산이 매 렌더링마다 실행되는 것을 방지
   const expensiveValue = useMemo(() => {
     return items.filter((item) => item.price > 1000).reduce((sum, item) => sum + item.price, 0);
   }, [items]);
   ```

2. **참조 동일성이 중요한 경우**

   ```jsx
   // 정렬된 배열이 매 렌더링마다 새로 생성되는 것을 방지
   const sortedList = useMemo(() => {
     return [...items].sort((a, b) => a.name.localeCompare(b.name));
   }, [items]);
   ```

3. **자식 컴포넌트에 객체를 props로 전달할 때**
   ```jsx
   // 매 렌더링마다 새로운 객체가 생성되는 것을 방지
   const memoizedValue = useMemo(
     () => ({
       id: item.id,
       name: item.name,
       price: item.price,
     }),
     [item.id, item.name, item.price]
   );
   ```

<br>

## useCallback

```jsx
const cachedFunction = useCallback(fn, dependencies);
```

- 함수 자체를 메모이제이션하여 불필요한 함수 재생성을 방지
- 첫 번째 인자(fn): 메모이제이션할 함수
- 두 번째 인자(dependencies): 의존성 배열

### useCallback 사용 시점

1. **자식 컴포넌트에 함수를 props로 전달할 때**

   ```jsx
   // 매 렌더링마다 새로운 함수가 생성되는 것을 방지
   const handleClick = useCallback(() => {
     setCount((c) => c + 1);
   }, []); // 의존성이 없으므로 항상 동일한 함수 참조
   ```

2. **이벤트 핸들러 함수를 재사용할 때**

   ```jsx
   // formData가 변경될 때만 새로운 함수 생성
   const handleSubmit = useCallback(
     (e) => {
       e.preventDefault();
       submitData(formData);
     },
     [formData]
   );
   ```

3. **useEffect의 의존성으로 함수를 사용할 때**

   ```jsx
   // fetchData 함수가 변경될 때만 effect 실행
   const fetchData = useCallback(async () => {
     const response = await api.getData();
     setData(response.data);
   }, []);

   useEffect(() => {
     fetchData();
   }, [fetchData]);
   ```

<br>

## useMemo와 useCallback의 차이점

1. **메모이제이션 대상**

   - `useMemo`: 계산된 **값**을 메모이제이션
   - `useCallback`: **함수** 자체를 메모이제이션

2. **사용 목적**

   - `useMemo`: 복잡한 계산 결과를 캐싱하여 성능 최적화
   - `useCallback`: 함수의 참조 동일성을 유지하여 불필요한 리렌더링 방지

3. **렌더링 과정**

   - `useMemo`: 렌더링 과정 중에 실행되어 계산된 값을 반환
   - `useCallback`: 렌더링 과정 중에 실행되어 메모이제이션된 함수를 반환

4. **실제 사용 예시**

   ```jsx
   // useMemo: 계산된 값을 메모이제이션
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

   // useCallback: 함수 자체를 메모이제이션
   const memoizedCallback = useCallback(() => {
     doSomething(a, b);
   }, [a, b]);
   ```

<br>

## 주의사항

1. **불필요한 사용 지양**

   - 간단한 계산이나 함수의 경우 메모이제이션이 오히려 성능을 저하시킬 수 있음
   - 메모이제이션 자체도 비용이 발생하므로, 실제 성능 이점이 있는 경우에만 사용
   - 예시:

     ```jsx
     // ❌ 불필요한 메모이제이션
     const value = useMemo(() => 1 + 1, []); // 단순 계산
     const fn = useCallback(() => console.log('hello'), []); // 단순 함수

     // ✅ 필요한 메모이제이션
     const value = useMemo(() => {
       return items.reduce((sum, item) => sum + item.price, 0);
     }, [items]); // 복잡한 계산
     ```

2. **의존성 배열 관리**

   - 필요한 모든 의존성을 포함시켜야 함
   - 불필요한 의존성은 제거하여 불필요한 재계산 방지
   - ESLint 규칙을 준수하여 의존성 배열 관리

3. **객체나 함수를 의존성으로 사용할 때**

   - 객체나 함수를 의존성 배열에 포함시킬 때는 주의 필요
   - 가능하면 useMemo나 useCallback으로 감싸서 사용
   - 예시:

     ```jsx
     // ❌ 잘못된 사용
     const obj = { id: 1, name: 'test' };
     useEffect(() => {
       console.log(obj);
     }, [obj]); // 매 렌더링마다 새로운 객체가 생성됨

     // ✅ 올바른 사용
     const obj = useMemo(() => ({ id: 1, name: 'test' }), []);
     useEffect(() => {
       console.log(obj);
     }, [obj]); // 메모이제이션된 객체 사용
     ```

## 📚 참고 자료

- [React 공식 문서 - useMemo](https://react.dev/reference/react/useMemo)
- [React 공식 문서 - useCallback](https://react.dev/reference/react/useCallback)
- [React 공식 문서 - 메모이제이션](https://react.dev/learn/memoization)

---

작성자: 임하연
