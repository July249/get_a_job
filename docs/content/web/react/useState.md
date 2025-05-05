---
title: React useState Hook
description: 리액트의 useState에 대한 설명
date: 2023-05-24
author: 안정음
tags: [React, Hook, useState, State Management]
---

# React useState Hook

## useState

```jsx
const [state, setState] = useState(initialValue);
```

- 함수형 컴포넌트 안에서 state를 사용할 수 있게 해주는 React의 기본 Hook
- 컴포넌트가 리렌더링되어도 state 값이 유지됨
- state가 변경되면 컴포넌트가 자동으로 리렌더링됨

<br>

## state와 setState

### state

- state는 컴포넌트의 데이터를 저장하고 관리하는 공간
- 컴포넌트 내부에서 관리되는 자바스크립트 객체
- props와의 차이점:
  - props: 부모 컴포넌트로부터 전달받는 읽기 전용 데이터
  - state: 컴포넌트 내부에서 관리되는 변경 가능한 데이터

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

### setState

```jsx
const [count, setCount] = useState(0);
setCount(count + 1); // 직접 값 설정
setCount((prevCount) => prevCount + 1); // 이전 값 기반으로 설정
```

- state의 값을 갱신하기 위한 함수
- 두 가지 방식으로 사용 가능:
  1. 직접 값 설정: `setCount(5)`
  2. 이전 값 기반으로 설정: `setCount(prevCount => prevCount + 1)`
- setState 호출 후 state는 즉시 업데이트되지 않음 (비동기적 업데이트)

<br>

## useState의 초깃값

### 1. 기본 타입 초깃값

```jsx
// 숫자
const [count, setCount] = useState(0);

// 문자열
const [name, setName] = useState('');

// 불리언
const [isLoading, setIsLoading] = useState(false);

// 배열
const [items, setItems] = useState([]);

// 객체
const [user, setUser] = useState({ name: '', age: 0 });
```

- 초깃값은 컴포넌트의 첫 렌더링에서만 사용됨
- 이후 렌더링에서는 무시됨

### 2. 함수형 초깃값

```jsx
// 복잡한 계산이 필요한 경우
const [value, setValue] = useState(() => {
  const initialValue = calculateExpensiveValue();
  return initialValue;
});

// localStorage에서 초깃값을 가져오는 경우
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
});
```

- 초깃값 계산이 복잡하거나 비용이 큰 경우 사용
- 함수는 첫 렌더링에서만 실행됨
- 이후 렌더링에서는 이전에 계산된 값을 재사용

<br>

## useState 사용 시 주의사항

### 1. 비동기적 업데이트

```jsx
// ❌ 잘못된 사용
const [count, setCount] = useState(0);
setCount(count + 1);
setCount(count + 1);
console.log(count); // 여전히 0

// ✅ 올바른 사용
const [count, setCount] = useState(0);
setCount((prevCount) => prevCount + 1);
setCount((prevCount) => prevCount + 1);
console.log(count); // 여전히 0 (하지만 다음 렌더링에서 2가 됨)
```

- state 업데이트는 비동기적으로 이루어짐
  - React는 성능 최적화를 위해 여러 state 업데이트를 배치(batch)로 처리
  - 이는 여러 번의 state 업데이트를 하나의 리렌더링으로 묶어서 처리한다는 의미
- 여러 번의 업데이트를 연속해서 할 때는 함수형 업데이트 사용
  - 함수형 업데이트는 이전 state 값을 기반으로 새로운 state를 계산
  - 이전 state 값에 의존하는 업데이트를 안전하게 처리할 수 있음
- 업데이트된 state 값은 다음 렌더링에서 확인 가능
  - state 업데이트 후 즉시 console.log로 확인하면 이전 값이 출력됨
  - useEffect를 사용하여 state 변경을 감지할 수 있음

```jsx
// state 변경 감지 예시
const [count, setCount] = useState(0);

// state가 변경될 때마다 실행
useEffect(() => {
  console.log('count가 변경됨:', count);
}, [count]);

// 여러 번의 업데이트 예시
const handleClick = () => {
  setCount(count + 1); // count는 여전히 0
  setCount(count + 1); // count는 여전히 0
  console.log(count); // 0 출력

  // 다음 렌더링에서 count는 1이 됨
  // (두 번의 setCount가 하나의 업데이트로 처리됨)
};

// 함수형 업데이트를 사용한 올바른 예시
const handleClickCorrect = () => {
  setCount((prev) => prev + 1); // 이전 값(0) + 1
  setCount((prev) => prev + 1); // 이전 값(1) + 1
  console.log(count); // 0 출력

  // 다음 렌더링에서 count는 2가 됨
  // (각 setCount가 이전 값을 기반으로 계산)
};
```

### 2. 객체나 배열 업데이트

```jsx
// ❌ 잘못된 사용
const [user, setUser] = useState({ name: 'John', age: 30 });
user.age = 31; // 직접 수정
setUser(user); // 변경사항이 감지되지 않음

// ✅ 올바른 사용
const [user, setUser] = useState({ name: 'John', age: 30 });
setUser((prevUser) => ({
  ...prevUser,
  age: 31,
}));
```

- 객체나 배열을 업데이트할 때는 새로운 참조를 생성해야 함
- 스프레드 연산자(`...`)를 사용하여 이전 값 복사 후 수정

#### 객체 업데이트와 참조 동일성

React는 상태 업데이트를 감지할 때 얕은 비교(shallow comparison)를 수행합니다. 이는 객체의 참조값만을 비교한다는 의미입니다.

```jsx
// 예시 1: 객체 속성 직접 수정
const [user, setUser] = useState({ name: 'John', age: 30 });

// ❌ 잘못된 방법
user.age = 31; // 객체의 속성만 변경
setUser(user); // 참조값은 동일하므로 React는 변경을 감지하지 못함

// ✅ 올바른 방법
setUser((prevUser) => ({
  ...prevUser, // 이전 객체의 모든 속성을 복사
  age: 31, // age 속성만 새로운 값으로 업데이트
}));
```

```jsx
// 예시 2: 중첩된 객체 업데이트
const [user, setUser] = useState({
  name: 'John',
  address: {
    city: 'Seoul',
    zipCode: '12345',
  },
});

// ❌ 잘못된 방법
user.address.city = 'Busan'; // 중첩된 객체의 속성만 변경
setUser(user); // 참조값은 동일하므로 React는 변경을 감지하지 못함

// ✅ 올바른 방법
setUser((prevUser) => ({
  ...prevUser,
  address: {
    ...prevUser.address, // 중첩된 객체도 새로운 참조로 복사
    city: 'Busan',
  },
}));
```

#### 객체 업데이트 시 주의사항

1. **얕은 복사 vs 깊은 복사**

   - 얕은 복사(`...`)는 중첩된 객체의 참조는 그대로 유지
   - 깊은 복사가 필요한 경우 `JSON.parse(JSON.stringify())` 또는 `structuredClone()` 사용

2. **불변성 유지**

   - React는 상태의 불변성을 가정하고 설계됨
   - 객체를 직접 수정하지 않고 항상 새로운 객체를 생성

3. **성능 최적화**
   - 불필요한 객체 생성을 피하기 위해 필요한 속성만 업데이트
   - 큰 객체의 경우 `useMemo`나 `useCallback`을 고려

```jsx
// 예시 3: 여러 속성 동시 업데이트
const [user, setUser] = useState({
  name: 'John',
  age: 30,
  address: 'Seoul',
  phone: '123-4567',
});

// ✅ 효율적인 업데이트
setUser((prevUser) => ({
  ...prevUser,
  name: 'Jane',
  age: 31,
}));

// ✅ 함수형 업데이트로 여러 번의 업데이트 처리
setUser((prevUser) => ({
  ...prevUser,
  name: 'Jane',
}));
setUser((prevUser) => ({
  ...prevUser,
  age: 31,
}));
```

### 3. 불필요한 리렌더링 방지

```jsx
// ❌ 불필요한 state
const [fullName, setFullName] = useState(firstName + ' ' + lastName);

// ✅ 계산된 값 사용
const fullName = firstName + ' ' + lastName;
```

- 계산 가능한 값은 state로 관리하지 않기
- props나 다른 state로부터 계산 가능한 값은 state로 만들지 않기

## 📚 참고 자료

- [React 공식 문서 - useState](https://react.dev/reference/react/useState)
- [React 공식 문서 - 상태 관리](https://react.dev/learn/managing-state)
