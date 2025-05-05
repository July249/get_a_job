---
title: React useReducer Hook
description: 리액트의 useReducer에 대한 설명
date: 2023-05-31
author: 이시현, 임하연
tags: [React, Hook, useReducer, State Management]
---

# React useReducer Hook

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

- `useState`의 대체 함수로, 복잡한 상태 로직을 관리할 때 유용
- 여러 개의 state 업데이트가 여러 이벤트 핸들러에 분산되어 있는 컴포넌트의 상태 관리에 적합
- reducer는 이전 상태와 action을 합쳐 새로운 state를 만드는 순수 함수

## useReducer의 기본 형태

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

- `state`: 컴포넌트에서 사용할 상태
- `dispatch`:
  - 첫번째 인자인 reducer 함수를 실행시킴
  - 컴포넌트 내에서 state의 업데이트를 일으키기 위해 사용하는 함수
- `reducer`:
  - 컴포넌트 외부에서 state를 업데이트하는 함수
  - 현재 state, action 객체를 인자로 받아 기존의 state를 대체하여 새로운 state를 반환하는 함수
- `initialArg`: 초기 state
- `init?`: 옵셔널 인자, 초기 함수(초기 state를 조금 지연해서 생성하기 위해 사용)

## useReducer의 구성 요소

### 1. 반환값

- `state`: 현재 상태
- `dispatch`: action을 발생시키는 함수
  - reducer 함수를 실행시킴
  - 컴포넌트 내에서 state 업데이트를 일으키기 위해 사용

### 2. 매개변수

- `reducer`:
  - 컴포넌트 외부에서 state를 업데이트하는 순수 함수
  - 현재 state와 action 객체를 인자로 받아 새로운 state를 반환
  - 이전 state를 변경하지 않고 새로운 state를 반환해야 함
- `initialArg`:
  - 초기 state가 계산되는 값
  - init 함수가 제공되지 않은 경우 초기 state로 사용됨
- `init` (선택적):
  - 초기 state를 지연 생성하기 위한 초기화 함수
  - `initialArg`를 인자로 받아 초기 state를 반환

## 사용 예시

### 1. 기본적인 사용법

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

### 2. 초기화 함수 사용

```jsx
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      return state;
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

## 주의사항

1. **Reducer는 순수 함수여야 함**

   - 같은 입력에 대해 항상 같은 출력을 반환해야 함
   - 사이드 이펙트를 발생시키지 않아야 함
   - 이전 state를 직접 수정하지 않아야 함

2. **Action 객체의 형태**

   - 주로 `type` 값을 지닌 객체 형태로 사용
   - action 객체의 형태는 자유롭게 정의 가능
   - 일반적으로 `type`과 `payload`를 포함

3. **useState vs useReducer**
   - 단순한 상태 관리: `useState`
   - 복잡한 상태 로직: `useReducer`
   - 여러 하위 값이 포함된 객체를 다룰 때: `useReducer`

## 📚 참고 자료

- [React 공식 문서 - useReducer](https://react.dev/reference/react/useReducer)
- [React 공식 문서 - State 로직을 Reducer로 추출하기](https://react.dev/learn/extracting-state-logic-into-a-reducer)
