---
title: React의 렌더링 방식
date: 2024-05-08
author: 안정음, 이시현
tags: [React, Rendering, Component, Virtual DOM]
---

# React의 렌더링 방식

## 📝 개요

렌더링이란 React가 컴포넌트에게 현재 props와 state의 상태에 기반하여 UI를 어떻게 구성할지 요청하는 과정입니다. React는 Virtual DOM을 사용하여 효율적인 렌더링을 수행합니다.

## 💡 렌더링이 발생하는 경우

React 컴포넌트는 다음과 같은 상황에서 렌더링이 발생합니다:

1. **상태 변경**
   - 컴포넌트의 내부 상태(state)가 변경될 때
   - 부모로부터 전달받은 props가 변경될 때
   - Redux store와 같은 전역 상태가 변경될 때
   - Context 값이 변경될 때

2. **부모 컴포넌트 렌더링**
   - 부모 컴포넌트가 리렌더링될 때, 자식 컴포넌트도 함께 리렌더링됨
   - 단, 다음 조건을 모두 만족하면 리렌더링에서 제외될 수 있음:
     - 이전에 렌더링된 적이 있는 컴포넌트
     - 변경된 props가 없음
     - 사용 중인 context 값이 변경되지 않음
     - 예정된 상태 업데이트가 없음

## 🔍 렌더링 방식

### 1. 초기 렌더링
```jsx
// 1. 루트 DOM 요소 선택
const container = document.getElementById("root");

// 2. React 루트 생성
const root = ReactDOM.createRoot(container);

// 3. 컴포넌트 렌더링
root.render(<App />);
```

### 2. 렌더링 순서
```jsx
// App 컴포넌트
function App() {
  useEffect(() => {
    console.log("👵🏻 App 렌더링");
  }, []);
  
  return (
    <div className="App">
      <Child1 />
    </div>
  );
}

// Child1 컴포넌트
function Child1() {
  useEffect(() => {
    console.log("👱🏻 Child1 렌더링");
  }, []);
  
  return (
    <>
      <Child2 />
    </>
  );
}

// Child2 컴포넌트
function Child2() {
  useEffect(() => {
    console.log("👶🏻 Child2 렌더링");
  }, []);
  
  return <></>;
}
```

렌더링 순서:
1. Child2 → Child1 → App (컴포넌트 트리 하위에서 상위로)
2. App → Child1 → Child2 (실제 DOM 업데이트는 상위에서 하위로)

## 📊 렌더링 최적화

### 1. React.memo
```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // props가 변경되지 않으면 리렌더링되지 않음
  return <div>{props.value}</div>;
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수 (선택사항)
  return prevProps.value === nextProps.value;
});
```

### 2. useMemo
```jsx
const memoizedValue = useMemo(() => {
  // 복잡한 계산 결과를 메모이제이션
  return computeExpensiveValue(a, b);
}, [a, b]); // 의존성 배열이 변경될 때만 재계산
```

### 3. useCallback
```jsx
const memoizedCallback = useCallback(() => {
  // 함수를 메모이제이션
  doSomething(a, b);
}, [a, b]); // 의존성 배열이 변경될 때만 함수 재생성
```

## 🤔 렌더링 과정

1. **렌더링 트리거**
   - 상태 변경
   - props 변경
   - 부모 컴포넌트 리렌더링
   - Context 값 변경

2. **렌더링 단계**
   - 컴포넌트 함수 실행
   - JSX 반환
   - Virtual DOM 생성
   - 이전 Virtual DOM과 비교 (Reconciliation)

3. **커밋 단계**
   - 변경된 부분만 실제 DOM에 반영
   - useEffect 훅 실행 (레이아웃 측정 후)

## 💡 실전 사용 팁

1. **불필요한 리렌더링 방지**
   - `React.memo`로 컴포넌트 메모이제이션
   - `useMemo`와 `useCallback`으로 값과 함수 메모이제이션
   - 상태 구조 최적화
   - Context 분할 사용

2. **렌더링 성능 개선**
   - 큰 리스트는 `windowing` 기법 사용 (react-window, react-virtualized)
   - 무거운 계산은 `useMemo` 사용
   - 이벤트 핸들러는 `useCallback` 사용
   - 불필요한 상태 업데이트 방지

3. **디버깅**
   - React DevTools의 Profiler 사용
   - `console.log`로 렌더링 시점 확인
   - `useEffect`의 의존성 배열 관리
   - React.StrictMode 활용

4. **렌더링 최적화 도구**
   - React.lazy와 Suspense로 코드 스플리팅
   - useTransition과 useDeferredValue로 렌더링 우선순위 조정
   - Error Boundary로 렌더링 에러 처리

## 📚 참고 자료

- [React 공식 문서 - 렌더링](https://ko.legacy.reactjs.org/docs/rendering-elements.html)
- [React 렌더링 심층 분석](https://yceffort.kr/2022/04/deep-dive-in-react-rendering)
- [React는 언제 컴포넌트를 렌더링하나요?](https://velog.io/@eunbinn/when-does-react-render-your-component)
- [React 공식 문서 - 성능 최적화](https://ko.legacy.reactjs.org/docs/optimizing-performance.html)

---

작성자: 안정음, 이시현
