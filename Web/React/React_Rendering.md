렌더링이란 컴포넌트가 현재 props와 state의 상태에 기초해 UI를 어떻게 구성할지, 컴포넌트에게 작업을 요청하는 것

리액트는 언제 렌더링 되나?

- 컴포넌트에서 예정된 상태 업데이트가 있을 경우
- 부모 컴포넌트가 렌더링 되고 리렌더링에서 제외되는 기준을 충족하지 않을 경우(**다음과 같은 네 가지 조건을 모두** 동시에 충족해야한다.)
- 컴포넌트가 이전에 렌더링 됐을 경우
- 변경된 props가 없어야 함
- 컴포넌트에서 사용하고 있는 context 값이 변경되지 않아야 함
- 컴포넌트에서 예정된 상태 업데이트가 없어야 함
  → 내부 상태(state) 변경
  → 부모에게 전달받은 값(props) 변경
  → 중앙 상태값(redux store) 변경
  → 부모 컴포넌트가 재렌더링 되는 경우, 자식 컴포넌트도 재렌더링

리액트는 언제 컴포넌트를 렌더링 하나?

→ 능동적인 렌더링

컴포넌트가 능동적으로 상태를 변경하기위한 업데이트를 예약한다

ReactDOM.render를 직접 호출한다

→ 수동적인 렌더링

부모 컴포넌트가 상태 업데이트를 예약하고 컴포넌트가 렌더링 제외 기준을 충족하지 않은 경우

“루트” DOM 노드`<div id=”root”></div>` 부터 시작하여 업데이트가 필요하다고 플래그가 지정되어 있는 컴포넌트를 찾아 진행한다. 리액트를 렌더링하기 위해서는 DOM엘리먼트를 `[ReactDOM.createRoot()](https://ko.legacy.reactjs.org/docs/react-dom-client.html#createroot)`에 전달한 다음, React 엘리먼트를 `root.render()`에 전달한다.

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <h1>Hello, world</h1>;
root.render(element);
```

React element는 불변객체다. element를 생성한 이후 해당 자식이나 속성을 변경할 수 없다.

최초 렌더링이 끝난 이후 리액트가 리렌더링 하는 경우

React DOM은 해당 element와 그 자식 element를 이전의 element를 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트한다. 컴포넌트를 렌더링 하는 작업은 하위에 있는 모든 자식 컴포넌트 또한 렌더링 한다.

[렌더링은 DOM을 업데이트 하는 것이 아닌, 컴포넌트가 어떠한 가시적인 변경이 없어도 렌더링 될 수 있다.](https://yceffort.kr/2022/04/deep-dive-in-react-rendering)

[리액트의 렌더링은 어떻게 일어나는가?](https://yceffort.kr/2022/04/deep-dive-in-react-rendering)

[엘리먼트 렌더링 – React](https://ko.legacy.reactjs.org/docs/rendering-elements.html#gatsby-focus-wrapper)

[[번역] 리액트는 언제 컴포넌트를 렌더링 하나요?](https://velog.io/@eunbinn/when-does-react-render-your-component)

[21. Functional Component - Hook Flow](https://www.notion.so/21-Functional-Component-Hook-Flow-f068af63572c4adbbba3093c45f04b2b)
