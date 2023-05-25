**useReducer**  
여러 개의 state 업데이트가 여러 이벤트 핸들러에 분산되어 있는 컴포넌트는 과부하가 걸릴 수 있다. 이럴 때 useReducer를 통해 관리할 수 있다.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

- state  
  현재 상태

- dispatch  
  action 발생시키는 함수

예제

```js
import { useReducer } from "react";

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
}
// ...
```

action은 업데이트를 위한 정보를 갖고 있다. 주로 type 값을 지닌 객체 형태로 사용되지만 action 객체의 형태는 자유다.

- reducer  
  순수 함수여야 한다, state와 액션을 인자로 받으며 다음 state를 반환한다.

- initialArg  
  초기 state가 계산되는 값

- init  
  선택적으로 사용이 가능하며 지정해주지 않을 경우 초기 state는 initialArg로 설정된다.

- return  
  useReducer는 state와 dispatch function을 가진 배열을 반환한다.

**주의 사항**

-[State로직을 Reducer로 추출하기](https://react-ko.dev/learn/extracting-state-logic-into-a-reducer)  
-[useReducer](https://react-ko.dev/reference/react/useReducer)
