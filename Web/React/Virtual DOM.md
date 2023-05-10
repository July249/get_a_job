# Virtual DOM

## DOM

HTML이나 XML 문서들을 자바스크립트같은 프로그래밍 언어로 조작 할 수 있도록 되어 있는 모델

![image](https://user-images.githubusercontent.com/77143425/236994233-58c3ebf8-2ce8-4c36-824c-3aeeaf909679.png)

위의 그림과 같이 DOM 트리를 이용하여 자바스크립트가 "document.getElementById" 와 같은 코드를 사용해 html 태그들을 동작할 수 있다.

```js
// js
function addItem () {
  const value = document.getElementById('input').value; // --3 input에 입력한 'c'가 value에 저장
  const list = document.getElementById('list'); // --4 list 라는 id를 가진 element를 list로 저장
  const newItem = document.createElement('li'); // --5 li를 새로 생성
  const text = document.createTextNode(value); // --6 입력했던 값 value를 text로 생성

  newItem.appendChild(text); // --7 텍스트는 li의 자식이 되고
  list.appendChild(newItem); // --8 li는 list의 자식이 된다.
}

// html
...
<ul id="list">
  <li>a</li>
  <li>b</li>
</ul>
<input id="input"></input> // --1 c 라고 입력
<button onclick="addItem">+</button> // --2 버튼 클릭
...
```

### 브라우저의 렌더링 과정

![image](https://user-images.githubusercontent.com/77143425/236995194-113d7683-1149-409e-825f-185ac1826a9b.png)

**1. DOM 트리 생성**

HTML을 파싱하여 DOM 객체로 이루어진 DOM 트리를 생성

**2. CSSOM (CSS Object Modal) 트리 생성**

CSS 코드를 파싱하여 CSSOM 트리를 생성

**3. 렌더 트리 생성**

DOM과 CSSOM을 바탕으로 실제로 브라우저에 노출되어야 하는 노드들에 대한 정보인 렌더 트리를 생성

**4. 리플로우**

렌더트리를 기반으로 html 요소의 레이아웃을 계산

**5. 페인트**

화면에 html 요소를 그림

### DOM의 문제점

DOM은 화면에 변화가 생기면 위의 렌더링 과정을 반복한다. 만약, 100번의 변화가 생긴다면 위의 과정을 100번 실행해야 한다. 특히, 리플로우와 리페인트 과정에서 브라우저의 성능 저하가 많이 발생하게 된다.

이렇게 되면 많은 페이지를 렌더링 해야하기에 비효율적이다.

## Virtual DOM

DOM과 유사한 객체를 메모리에 올려두고, 변경 사항이 생겼을 때 **변경된 부분만 업데이트**를 해서 반응이 빠른 웹을 구현할 수 있게 해주는 DOM

### Virtual DOM의 작동 방식

React는 Real DOM과 Virtual DOM, diff 알고리즘을 이용해 변화가 일어난 DOM 요소만 새로 렌더링을 한다.

![image](https://github.com/Jeongeum/test/assets/77143425/04920dbf-9ceb-4985-a428-3b82b3a3cbab)

렌더링 이전 화면의 내용을 담은 가상 DOM과 업데이트 이후 발생할 새로운 가상 DOM을 비교하여 어떤 엘리먼트가 변했는지 비교한다. (비교하는 과정을 diff라 표현) 그 후, 차이가 발생한 부분만을 실제 DOM에 적용하여 렌더링을 최소화 할 수 있도록 한다.

이 과정을 Reconciliation 이라 하는데 이 과정은 변경된 모든 엘리먼트들을 집단화 시켜 한번에 실제 DOM에 적용시키기 때문에 100개의 항목이 바뀌었을 때 실제 DOM을 100번 수정하는 것이 아니라 한번에 집단화시켜 적용하기 때문에 매우 효율적이다.
