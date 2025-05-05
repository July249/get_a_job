---
title: React useRef Hook
description: 리액트의 useRef에 대한 설명
date: 2023-05-24
author: 안정음
tags: [React, Hook, useRef, DOM]
---

# React useRef Hook

```jsx
const ref = useRef(initialValue);
```

- useRef는 저장공간, DOM 요소에 접근하기 위해 사용되는 React의 Hook
- React는 DOM을 직접 건드리는 것을 권장하지 않지만, 예외적으로 DOM에 직접 접근해야할 때 사용
- useRef는 `.current` 프로퍼티에 변경 가능한 값을 담고 있는 "상자"와 같음
- 컴포넌트의 전체 생명주기 동안 유지됨
- DOM 요소 참조 시, 실제 DOM이 업데이트된 후에 참조를 얻음
  - React의 렌더링 사이클이 완료된 후에 `.current`가 실제 DOM 요소를 가리키게 됨
  - 이는 가상 DOM이 아닌 실제 DOM에 접근한다는 의미
    <br><br>

## useRef의 활용

### 1. 변수 관리

```jsx
const [stateCount, setStateCount] = useState(0);
const refCount = useRef(0);

<button onClick={() => {
  setStateCount((prev) => prev + 1);
  console.log("stateCount :", stateCount);
  }}
>state</button>

<button onClick={() => {
  refCount.current += 1;
  console.log("refCount", refCount.current);
  }}
>ref</button>

<div>useState Count: {stateCount}</div>
<div>useRef Count: {refCount.current}</div>
```

- useState를 사용
  - 버튼 클릭 시, 상태값이 변경됨에 따라 리렌더링
  - 상태 변경은 비동기적으로 이루어짐
- useRef 사용
  - 버튼 클릭 시, 값이 즉시 변경됨
  - 리렌더링을 발생시키지 않음
  - `.current` 값이 변경되어도 리렌더링이 발생하지 않음

![useref](https://github.com/July249/get_a_job/assets/77143425/9e5e28ad-dea7-463e-b34f-abc33920a5d9)

refCount는 렌더링이 되지 않기때문에 useState를 통한 리렌더링이 일어나기 전까지는 화면에서 아무런 변화가 없다. 하지만 콘솔에 찍힌 refCount의 값을 보면 값이 제대로 증가되고 있다.

### 2. DOM 요소 접근

```jsx
const textInput = useRef(null);  // --- ⓵ useRef 생성

const onClickBtn = () => {
    textInput.current.focus();  // --- ⓷ useRef가 가리키는 input 태그에 포커스 이벤트 적용
  };

<input type="text" />
<input type="button" value="ref X" />

<input type="text" ref={textInput} />  // --- ⓶ ref props로 전달
<input type="button" value="ref O" onClick={onClickBtn} />
```

![refdom](https://github.com/July249/get_a_job/assets/77143425/a5fa6075-d428-48eb-8dc2-7aefad038ce2)

#### DOM 참조 시점

```jsx
function MyComponent() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 여기서 inputRef.current는 실제 DOM 요소를 가리킴
    // React의 렌더링 사이클이 완료된 후에 실행됨
    console.log(inputRef.current); // <input type="text" />
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

- useRef를 통한 DOM 참조는 React의 렌더링 사이클이 완료된 후에 이루어짐
- 이는 실제 DOM이 업데이트된 후에 참조를 얻는다는 것을 의미
- 따라서 가상 DOM이 아닌 실제 DOM에 안전하게 접근 가능

### 3. 이전 값 저장

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });

  return (
    <div>
      <p>이전 카운트: {prevCountRef.current}</p>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

### 4. 타이머 관리

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return <div>카운트: {count}</div>;
}
```

## useRef 사용 시 주의사항

1. **렌더링 중에는 ref.current를 읽거나 쓰지 않기**

   ```jsx
   // ❌ 잘못된 사용
   function MyComponent() {
     const [count, setCount] = useState(0);
     const ref = useRef(0);

     // 렌더링 중에 ref.current를 수정
     ref.current = count;

     return <div>{ref.current}</div>;
   }

   // ✅ 올바른 사용
   function MyComponent() {
     const [count, setCount] = useState(0);
     const ref = useRef(0);

     useEffect(() => {
       // 렌더링 후에 ref.current를 수정
       ref.current = count;
     });

     return <div>{count}</div>;
   }
   ```

2. **초기값 설정**

   - useRef의 초기값은 첫 렌더링에서만 사용됨
   - 이후 렌더링에서는 무시됨
   - DOM 참조의 경우 초기값은 null로 설정

3. **ref 콜백 사용**

   ```jsx
   function MeasureExample() {
     const [height, setHeight] = useState(0);
     const measuredRef = useCallback((node) => {
       if (node !== null) {
         // node는 실제 DOM 요소
         // React의 렌더링 사이클이 완료된 후에 실행됨
         setHeight(node.getBoundingClientRect().height);
       }
     }, []);

     return (
       <div ref={measuredRef}>
         <h1>안녕하세요!</h1>
       </div>
     );
   }
   ```

## 📚 참고 자료

- [React 공식 문서 - useRef](https://react.dev/reference/react/useRef)
- [React 공식 문서 - ref 콜백](https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback)
- [React 공식 문서 - DOM 조작](https://react.dev/learn/manipulating-the-dom-with-refs)
