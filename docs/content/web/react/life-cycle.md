---
title: React의 생명주기(Life Cycle)
date: 2024-05-01
author: 임하연, 이지형
tags: [React, Life Cycle, Hook, Component]
---

# React의 생명주기(Life Cycle)

## 📝 개요

React 컴포넌트는 마치 사람의 생애처럼 태어나고(생성), 변화하고(업데이트), 사라지는(제거) 과정을 거칩니다. 이를 '생명주기(Life Cycle)'라고 합니다. React 16.8 버전부터 도입된 Hooks를 통해 함수형 컴포넌트에서도 생명주기를 관리할 수 있게 되었습니다.

## 💡 컴포넌트의 생명주기 단계

React 컴포넌트의 생명주기는 크게 세 단계로 나눌 수 있습니다:

1. **마운트(Mount)**: 컴포넌트가 처음 화면에 나타날 때
2. **업데이트(Update)**: 컴포넌트의 상태나 props가 변경될 때
3. **언마운트(Unmount)**: 컴포넌트가 화면에서 사라질 때

## 🔍 함수형 컴포넌트 vs 클래스형 컴포넌트

React에서는 두 가지 방식으로 컴포넌트를 작성할 수 있습니다:

### 1. 클래스형 컴포넌트
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // 상태 정의
  }

  // 생명주기 메소드들
  componentDidMount() {
    // 컴포넌트가 마운트된 후 실행
    // API 호출, 이벤트 리스너 등록 등에 사용
  }

  componentDidUpdate(prevProps, prevState) {
    // 컴포넌트가 업데이트된 후 실행
    // props나 state가 변경되었을 때 추가 작업 수행
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트되기 전 실행
    // 이벤트 리스너 제거, 구독 해제 등 정리 작업
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

### 2. 함수형 컴포넌트
```jsx
function MyComponent() {
  const [count, setCount] = useState(0); // 상태 정의

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행
    // API 호출, 이벤트 리스너 등록 등

    // componentWillUnmount
    return () => {
      // 컴포넌트가 언마운트되기 전 실행
      // 이벤트 리스너 제거, 구독 해제 등
    };
  }, [count]); // count가 변경될 때만 실행

  return <div>{count}</div>;
}
```

## 📊 Hook의 생명주기

### 1. Mount 단계
- Hook 객체가 생성됨
- 초기 상태값이 설정됨
```jsx
function mountState(initialState) {
  const hook = {
    memoizedState: initialState,
    baseState: initialState,
    queue: null,
    next: null
  };
  return [hook.memoizedState, dispatch];
}
```

### 2. Update 단계
- 상태 변경이 발생하면 Hook의 queue에 저장
- 새로운 상태값으로 업데이트
```jsx
function updateState(initialState) {
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  // 상태 업데이트 로직
  return [hook.memoizedState, dispatch];
}
```

## 🤔 주요 생명주기 메소드와 Hook

### 클래스형 컴포넌트의 주요 메소드
1. **마운트**
   - `constructor()`: 컴포넌트 생성 시 호출, 초기 상태 설정
   - `static getDerivedStateFromProps()`: props로부터 state를 도출
   - `render()`: 화면에 그릴 내용을 반환
   - `componentDidMount()`: 컴포넌트가 화면에 나타난 후 호출

2. **업데이트**
   - `static getDerivedStateFromProps()`: props 변경 시 호출
   - `shouldComponentUpdate()`: 리렌더링 여부 결정
   - `render()`: 변경된 내용을 화면에 반영
   - `getSnapshotBeforeUpdate()`: DOM 업데이트 직전 호출
   - `componentDidUpdate()`: 컴포넌트가 업데이트된 후 호출

3. **언마운트**
   - `componentWillUnmount()`: 컴포넌트가 화면에서 사라지기 전 호출

### 함수형 컴포넌트의 주요 Hook
1. **useState**: 상태 관리
```jsx
const [state, setState] = useState(초기값);
```

2. **useEffect**: 생명주기 관리
```jsx
// 1. 마운트 + 업데이트 시 실행
useEffect(() => {
  // 실행할 코드
});

// 2. 마운트 시에만 실행
useEffect(() => {
  // 실행할 코드
}, []);

// 3. 특정 값이 변경될 때만 실행
useEffect(() => {
  // 실행할 코드
}, [의존성값]);

// 4. 정리(cleanup) 함수 포함
useEffect(() => {
  // 실행할 코드
  return () => {
    // 정리할 코드
  };
}, [의존성값]);
```

3. **useLayoutEffect**: DOM 업데이트 직전에 동기적으로 실행
```jsx
useLayoutEffect(() => {
  // DOM 업데이트 직전에 실행할 코드
}, [의존성값]);
```

## 💡 실전 사용 팁

1. **함수형 컴포넌트 사용 권장**
   - 코드가 더 간결하고 이해하기 쉬움
   - Hook을 통한 생명주기 관리가 직관적
   - React 팀에서도 함수형 컴포넌트 사용을 권장

2. **useEffect 사용 시 주의사항**
   - 의존성 배열을 올바르게 설정
   - 불필요한 리렌더링 방지
   - 무한 루프 주의
   - 클린업 함수 활용

3. **상태 관리**
   - `useState`로 간단한 상태 관리
   - 복잡한 상태는 `useReducer` 사용 고려
   - 전역 상태는 Context API나 Redux 사용

4. **성능 최적화**
   - `React.memo`로 불필요한 리렌더링 방지
   - `useCallback`과 `useMemo`로 함수와 값 메모이제이션
   - `useRef`로 DOM 요소 참조

## 📚 참고 자료

- React 공식 문서: https://react.dev/learn/lifecycle-of-reactive-effects
- React Hooks 문서: https://react.dev/reference/react/hooks
- React 생명주기 다이어그램: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

---

작성자: 임하연, 이지형
