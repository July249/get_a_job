# 렌더링

React가 컴포넌트에게 현재 Props와 State에 기반하여 UI에서 어떻게 보여지고 싶은지 알려달라고 요청하는 과정

## 렌더링이 되는 상황?

1. 내부 상태값 (state)의 변경
2. 부모가 전해준 속성(props) 변경
3. 중앙 상태값 (redux store) 변경
4. 부모 컴포넌트가 재렌더링 되는 경우 -> 자식 컴포넌트도 재렌더링

## 초기 렌더링

맨 처음 사용자 화면에 뷰를 보여주는 것.
리액트에서는 `render`라는 함수를 통해 컴포넌트가 어떻게 생겼는지 정의하고 뷰의 구성과 작동 방식에 대한 정보를 지닌 객체를 반환한다.

1. 컴포넌트 정의
2. 컴포넌트 정보를 이용해 렌더링
3. 문자열 형식의 html 코드 반환
4. DOM 요소에 주입

### 렌더링 순서

#### render 함수

1. App

```js
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
```

2. Parent

```jsx
useEffect(() => {
  console.log("👵🏻 App");
}, []);
return (
  <div className="App">
    <Child1 />
  </div>
);
```

3. Child

```jsx
function Child1() {
  useEffect(() => {
    console.log("👱🏻 Child1");
  }, []);
  return (
    <>
      <Child2 />
    </>
  );
}

function Child2() {
  useEffect(() => {
    console.log("👶🏻 Child2");
  }, []);
  return <></>;
}
```

#### react 엘리먼트

1. Child
2. Parent
3. App

![image](https://user-images.githubusercontent.com/77143425/236712887-fa68b524-1750-4e43-9ee4-1a0413794c82.png)

## 리렌더링

- 뷰를 업데이트하는 것

1. 데이터 업데이트
2. 업데이트 된 데이터를 이용해 render 함수 호출하여 새로운 뷰 생성
3. 이전에 생성한 컴포넌트와 리렌더링된 컴포넌트 차이 비교
4. 바뀐 요소만 DOM에 반영
