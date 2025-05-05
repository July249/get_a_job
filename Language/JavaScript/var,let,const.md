# JavaScript의 변수 선언 방식

## var

ES5까지는 변수를 선언하는 방법으로 var 키워드가 유일했다. var 키워드로 선언된 변수는 다음과 같은 특징이 있다.

### 재선언 가능

```js
var count = 1;
console.log(count); // 1

var count = 200;
console.log(count); // 200
```

코드량이 많아졌을 때, 같은 이름의 변수명이 여러 번 선언되어있다면 어디에서 문제가 발생했는지 파악하기 힘들고 값이 바뀔 우려가 있다.

### 함수 레벨 스코프

```js
var count = 100;
function func1() {
  var name = "javascript";
}

console.log(count); // 100
console.log(name); // name is not defined
```

함수 내에서 선언될 때에는 해당 함수 내에서만 사용하고 접근할 수 있다.

그렇기 때문에 전역 함수 외부에서 생성한 변수는 모두 전역 변수가 된다.

### 변수 호이스팅

```js
console.log(color);

var color = "pink";
```

var 키워드로 선언된 변수는 변수의 선언과 초기화가 한번에 이루어진다. 즉, 변수가 스코프에 등록되고 메모리에 변수를 위한 공간을 확보한 뒤 바로 undefined로 초기화 한다.

그렇기 때문에 위와 같이 변수 선언 전에 참조를 해도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않고 undefined가 반환된다.

변수 호이스팅에서 대부분의 문제는 전역 변수로 인해 발생한다. 전역 변수는 유효범위가 넓어 어디에서 어떻게 사용될지 파악이 힘들기 때문에 변수의 스코프는 좁을수록 좋다.

## let

### 재선언 불가, 재할당 가능

```js
let count = 1;
let count = 100; // Uncaught SyntaxError: Identifier 'count' has already been declared
```

`var` 키워드는 동일한 변수명으로 재선언이 가능했지만 `let` 키워드로는 **동일 범위 내에서** 재선언이 불가능하다. 만약, let 키워드로 재선언을 할 경우 문법 에러가 발생한다.

```js
let count = 1;
count = 100;
```

하지만, var 키워드와 마찬가지로 해당 범위 내에서 업데이트는 가능하다.

### 블록 레벨 스코프

```js
let name = "javascript";

if (true) {
  let name = "react";
  let count = 1;

  console.log(name); // react
}

console.log(name); // javascript
console.log(count); // count is not defined
```

let 키워드는 블록 레벨 스코프이다.

블록이란 `{}` 를 뜻하고 하나의 블록은 중괄호 속에 존재한다. 중괄호 안의 내용은 모두 블록 범위이다.

let 키워드로 선언된 변수는 **해당 블록 내에서만 사용이 가능**하기 때문에 위 count 변수 예시처럼 블록 내에서 정의된 변수를 블록 외부에서 사용했을 때에는 에러가 발생한다.

하지만, name 변수 예시처럼 동일한 변수가 다른 범위 내에서 정의될 경우에는 범위가 다르기 때문에 다른 변수라고 판단하여 에러가 발생하지 않는다.

### 호이스팅

```js
console.log(color); // undefined

var color;

console.log(foo); // Error : Uncaught ReferenceError: foo is not defined

let foo;
```

`let` 키워드로 선언된 변수는 `var` 키워드와 달리 변수를 선언문 이전에 참조하면 참조 에러가 발생한다.

let 키워드로 선언된 변수는 **일시적 사각지대(TDZ)** 라는 속성을 가지고 있기 때문이다.

```js
// (참고: poiemaweb)

// 스코프의 선두에서 선언 단계가 실행
// 아직 변수가 초기화(메모리 공간 확보와 undefined로 초기화)되지 않음
// 따라서 변수 선언문 이전에 변수를 참조할 수 없음
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행
console.log(foo); // 1
```

var 키워드 설명에서 변수 호이스팅에 대해 간단히 설명했었는데 var 키워드로 선언된 변수는 선언과 초기화 단계가 한번에 이루어진다고 했었다.

하지만, let 키워드로 선언된 변수는 선언과 초기화가 분리되어 진행된다. 스코프에 변수를 등록은 하지만 변수를 위한 메모리 공간이 확보되지 않았기 때문에 초기화는 변수를 선언할 때 이루어진다.

**일시적 사각지대(TDZ)** : 스코프의 시작지점부터 초기화 시작 지점까지 변수를 참조할 수 없고 이 구간을 일시적 사각지대라 한다.

## const

### 재선언, 재할당 불가능

```js
const name = 'javascript';
name = 'react'; // TypeError : Assignment to constant variable.

const color; // SyntaxError: Missing initializer in const declaration
```

const는 재선언과 재할당이 모두 불가능하기 때문에 고정적인 값을 선언할 때 사용한다. 그리고 반드시 선언과 동시에 할당이 이루어져야 한다.

### 블록 레벨 스코프

```js
if (true) {
  let count = 1;

  console.log(count); // 1
}

console.log(count); // ReferenceError: count is not defined
```

const도 let 키워드와 마찬가지로 블록 레벨 스코프를 갖는다.

---

### 참고

- https://poiemaweb.com/es6-block-scope
- https://www.freecodecamp.org/korean/news/var-let-constyi-caijeomeun/
