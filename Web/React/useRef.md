# useRef

```jsx
const ref = useRef(initialValue);
```

- useRef는 저장공간, DOM 요소에 접근하기 위해 사용되는 React의 Hook
- React는 DOM을 직접 건드리는 것을 권장하지 않지만, 예외적으로 DOM에 직접 접근해야할 때 사용
  <br><br>

## useRef의 활용

### 변수 관리

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
- useRef 사용
  - 버튼 클릭 시, 상태값이 변경되어도 리렌더링 일어나지 않음.
  - 값을 저장하고 있다가 useState를 통해 리렌더링이 될 때 useRef를 통해 생성한 변수의 값이 변경

![useref](https://github.com/July249/get_a_job/assets/77143425/9e5e28ad-dea7-463e-b34f-abc33920a5d9)

refCount는 렌더링이 되지 않기때문에 useState를 통한 리렌더링이 일어나기 전까지는 화면에서 아무런 변화가 없다. 하지만 콘솔에 찍힌 refCount의 값을 보면 값이 제대로 증가되고 있다.

useState를 사용할 경우 상태가 바뀔 때마다 리렌더링이 발생하지만, useRef의 경우 상태가 바뀌어도 리렌더링이 발생하지 않기 때문에 렌더링 없이 상태값을 관리하고자 할때에는 useRef를 사용하면 된다.
<br><br>

### DOM 요소 접근

![refdom](https://github.com/July249/get_a_job/assets/77143425/a5fa6075-d428-48eb-8dc2-7aefad038ce2)

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
