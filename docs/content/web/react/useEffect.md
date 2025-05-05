---
title: React useEffect Hook
description: 리액트의 useEffect에 대한 설명
date: 2024-05-10
author: 임하연
tags: [React, Hook, useEffect, Side Effect]
---

# React useEffect Hook

## useEffect

```jsx
useEffect(콜백함수, [의존성 배열])
```

- 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- 클래스형 컴포넌트에서 `componentDidMount` + `componentDidUpdate` + `componentWillUnmount` 와 같은 역할
- 기본적으로 렌더링 된 직후에 실행됨
- 두 번째 파라미터 배열(의존성 배열)에 무엇을 넣는지에 따라 실행되는 조건이 달라짐
- 부수효과(Side Effect)를 처리하는 데에 효과적

<br>

### useEffect와 Side Effect

- 부수 효과(Side Effect)란?

  - 함수를 입력값에 대해 일정한 출력을 하는 것으로 가정할 때, 출력값에 영향을 미치지 않는 모든 작업들
  - React 컴포넌트가 화면에 렌더링된 이후에 애플리케이션에서 일어나는 다른 모든 것
  - 예시:
    - 데이터 가져오기(fetching)
    - 구독(subscription) 설정
    - DOM 수동 변경
    - 로깅
    - 타이머 설정

- `useEffect` 가 Side Effect를 처리하는 데에 효과적인 이유
  - React에게 **렌더링 이후에** 컴포넌트가 어떤 일을 수행해야하는 지 알려 줌 (Side Effect를 **렌더링 이후에** 발생시킴)
  - `useEffect` 가 수행되는 시점에 이미 DOM이 업데이트 되었음을 보장함
    - Side Effect가 렌더링에 영향을 주지 않도록 설계되었음을 의미함
  - 여러 개의 useEffect를 사용하여 관련 있는 로직을 분리할 수 있음

<br>

## useEffect의 실행 조건

1. 의존성 배열을 할당하지 않은 경우

   ```jsx
   useEffect(() => {
     console.log('렌더링');
   });
   ```

   - 콜백함수가 리렌더링 될 때마다 실행됨
   - 성능 최적화가 필요한 경우 사용을 지양해야 함

2. 의존성 배열에 빈 배열을 할당한 경우

   ```jsx
   useEffect(() => {
     console.log('렌더링');
   }, []);
   ```

   - 빈 배열 → 어떠한 것에도 의존하지 않겠다는 뜻
   - 콜백함수가 처음 렌더링 될 때만(마운트 시점에서만) 실행됨
   - ESLint는 이 경우 의존성 배열이 비어있다는 경고를 표시할 수 있음

3. 의존성 배열에 특정 값을 할당한 경우

   ```jsx
   useEffect(() => {
     console.log('렌더링');
   }, [text]);
   ```

   - 최초 렌더링 후 의존성 배열 안의 값(ex. `text`)이 업데이트 될 때마다 실행됨
   - 의존성 배열에 포함된 모든 값이 변경될 때마다 effect가 재실행됨
   - 객체나 함수를 의존성 배열에 포함시킬 때는 주의 필요

<br>

### Cleanup 함수

- 컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 어떤 작업을 수행하고 싶다면?
  - clean up 함수를 반환(return)해 주어야 한다
  - 메모리 누수 방지에 중요

```jsx
function Timer() {
  useEffect(() => {
    const timer = setInterval(() => {
      // 타이머 로직
    }, 1000);

    console.log('마운트 될 때 실행');

    return () => {
      console.log('언마운트 될 때 실행');
      clearInterval(timer);
    };
  }, []); // 의존성 배열이 비어있으므로 마운트/언마운트 시에만 실행

  return <p>타이머</p>;
}
```

### useEffect 사용 시 주의사항

1. **의존성 배열 관리**

   - 필요한 모든 의존성을 포함시켜야 함
   - 불필요한 의존성은 제거
   - ESLint 규칙을 준수

2. **무한 루프 방지**

   - effect 내부에서 상태를 업데이트할 때 주의
   - 의존성 배열이 올바르게 설정되었는지 확인

3. **비동기 처리**

   - effect 내부에서 async/await 사용 시 주의
   - cleanup 함수에서 비동기 작업 정리 필요

4. **성능 최적화**
   - 불필요한 effect 실행 방지
   - 복잡한 로직은 useMemo나 useCallback과 함께 사용

## 📚 참고 자료

- [React 공식 문서 - useEffect](https://ko.legacy.reactjs.org/docs/hooks-effect.html)
- [React 공식 문서 - useEffect 완벽 가이드](https://overreacted.io/a-complete-guide-to-useeffect/)

---

작성자: 임하연
