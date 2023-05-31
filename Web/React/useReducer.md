# useReducer

- `useState` 의 대체 함수
- state(상태)를 관리하고 업데이트 할 수 있는 hook
- 좀 더 복잡한 상태관리가 필요한 경우 reducer를 사용할 수 있음

  - reducer는 이전 상태와 action을 합쳐 새로운 state를 만드는 조작을 말한다

    <br>

## useReducer의 기본 형태

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

<br>

- state: 컴포넌트에서 사용할 상태
- dispatch
  - 첫번째 인자인 reducer 함수를 실행시킨다
  - 컴포넌트 내에서 state의 업데이트를 일으키키 위해 사용하는 함수

<br>

- reducer
  - 컴포넌트 외부에서 state를 업데이트하는 함수
  - 현재 state, action 객체를 인자로 받아 기존의 state를 대체하여 새로운 state를 반환하는 함수
- initialArg: 초기 state
- init? : 옵셔널 인자, 초기 함수(초기 state를 조금 지연해서 생성하기 위해 사용)

---

**참고 문서** [useReducer](https://react.dev/reference/react/useReducer)
