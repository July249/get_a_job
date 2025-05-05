ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었다.  
하지만 var 키워드는 여러 문제가 많았고, 이를 보완하기 위해 ES6부터 const, let이 도입 되었다.

## var

var 키워드로 선언한 변수는 재선언이 가능하다. 값의 재할당도 자유롭게 할 수 있다.

```js
var x = 15;
var x = 20; // 재선언이 가능하다.

var y; // 초기화문이 없는 변수 선언문은 무시 된다.

var y = 17;

console.log(x); // 20
console.log(y); // 17
```

이렇게 var 키워드로 선언한 변수를 중복 선언할 때, 초기화문이 있는 변수 선언문은 var 키워드가 없는 것처럼 동작하고 초기화문이 없는 변수 선언문은 무시된다. 에러는 발생하지 않는다.

var 키워드로 선언한 변수는 함수 스코프를 갖고 있어 함수 내에서 선언된 변수는 함수 내부에서만 유효하다. 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

```js
var num = 10;

for (var i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

console.log(i); // 5 변수 값이 변경 되었다.
```

var 키워드로 변수를 선언하면 호이스팅이 발생한다.

> 호이스팅이란, 자바스크립트에서 변수 및 함수 선언이 스코프의 맨 위로 끌어올려지는 동작을 말한다.

변수 선언이 해당 스코프의 맨 위로 끌어올려지기 때문에 변수 선언 이전에도 변수를 사용할 수 있다.

```js
// 변수 호이스팅에 의해 이미 hi 변수가 선언된다. 변수 hi는 undefined로 초기화된다.
console.log(hi); // undefined

// 변수에 값을 할당해준다.
hi = 1000;

console.log(hi); // 1000
```

## let

let 키워드로 이름이 같은 변수를 중복 선언하면 문법 에러가 발생한다.

```js
let hi = 10;
let hi = 20; // SyntaxError가 발생한다.
```

let 키워드는 블록 스코프를 갖고 있다. 중괄호로 둘러싸인 범위 내에서만 접근이 유효하다.

```js
let globalVar = 15; // 전역변수
{
  let blockVar = 15; // 지역변수
  let globalVar = 20; // 지역변수
}

console.log(globalVar); // 15
console.log(blockVar); // ReferenceError가 발생한다.
```

let 키워드로 선언한 변수는 호이스팅이 발생하지 않는 것처럼 동작한다. 이를 일시적 사각 지대(Temporal Dead Zone)이라 한다. 이는 호이스팅에 의해 변수 선언은 스코프의 맨 위에 올라가지만, 초기화는 변수가 실행되는 지점에서 이루어지기 때문에 발생한다.

```js
console.log(x); // ReferenceError가 발생한다.
let x = 5;
console.log(x); // 5
```

TDZ를 방지하기 위해서 변수를 사용하기 전에 선언하고 초기화하는 것을 습관으로 들이는 것이 좋다.

## const

const 키워드는 let과 대부분 동일하지만 몇 가지 다른 점이 있다.

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.

```js
const hi; // SyntaxError가 발생한다
const hi = 10;
```

const 키워드로 선언한 변수는 let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며 TDZ가 발생한다.  
const 키워드로 선언한 변수는 재할당이 금지된다.

```js
const num = 0;
num = 100; // TypeError가 발생한다.
```

const 키워드로 선언한 변수는 재할당이 금지되지만 객체에 할당할 경우 객체 내의 값을 변경할 수 있다.

```js
const choonsik = {
  species: "cat",
};

choonsik.species = "bear"; // 변경이 가능하다.

console.log(choonsik); // {species: "bear"}
```

const 키워드는 상수를 선언할 때 사용하자
