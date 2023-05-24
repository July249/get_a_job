# useState

```jsx
const [state, setState] = useState(initialValue);
```

- 함수형 컴포넌트 안에서 state를 사용할 수 있게 해주는 React의 기본 Hook
  <br><br>

## state와 setState

### state

- state는 데이터가 관리 및 저장되는 공간을 의미
- state는 자바스크립트의 객체이고 컴포넌트 안에서 관리
  - 컴포넌트는 자신의 state를 props를 통해 자식 컴포넌트에게 전달할 수 있음.
  - props는 컴포넌트에 단일 객체로 전달하는 데이터
    <br><br>

### setState

```jsx
<input onChange={(e) => setInputText(e.target.value)} />
```

- state의 값을 갱신하기 위한 함수
- setState 함수를 통해 새로운 state 값을 반환받아 최신 state로 갱신
- 현재의 state 변수를 변경시키는 게 아니라, 리렌더링이 되고 난 이후의 useState가 반환할 값을 변경해주고 컴포넌트를 리렌더링 시켜주는 역할
  <br><br>

## useState의 초깃값

### number, string, boolean, array …

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState("Minsu");
const [hidden, setHidden] = useState(false);
const [data, setData] = useState([]);
```

useState의 초깃값은 초깃값 변수가 항상 생성되긴 하지만 처음 렌더링 될 때 한번만 사용되며 그 이후에는 무시

그런데 이때 초깃값을 얻는데에 많은 리소스를 사용해야 한다면 (비용이 높으면) 함수 형태로 적어서 초기 렌더에만 사용하도록 만들 수 있음.
<br><br>

### Function

```jsx
const [value, setValue] = useState(() => calculate());
```

함수도 매 렌더링마다 호출되긴 하지만 실제 함수에 대한 계산은 첫 렌더링때만 수행
<br><br>

## useState 주의점

```jsx
const [count, setCount] = useState(0);

// 클릭 시 증가한다고 가정
setCount(count + 1); // 1
setCount(count + 1); // 1
console.log(count); // 1 -> 왜 2가 아닐까?
```

React에서 상태 업데이트는 비동기로 동작하기 때문에 setState()를 여러번 호출해도 한 번만 실행될 수 있다.

그렇기 때문에 위의 예제처럼 count를 증가시키기 위해 setCount() 함수를 두번 사용해도 실제 count의 값은 1이 된다.

- 현재 count = 0
  - count + 1 → 1
  - count + 1 → 1
  - console.log(count) → 1

```jsx
const [count, setCount] = useState(0);

// 클릭 시 증가한다고 가정
setCount((prev) => prev + 1); // 1
setCount((prev) => prev + 1); // 2
console.log(count); // 2
```

이런 경우, setState()에 함수를 전달해 상태의 현재 값을 바탕으로 증가하도록 작성해야 한다.

- 현재 count = 0
  - count(0) ⇒ count + 1 → 1
  - count(1) ⇒ count + 1 → 2
  - console.log(count) → 2
