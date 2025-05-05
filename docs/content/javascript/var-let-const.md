---
title: 자바스크립트의 변수 선언 (var, let, const)
description: 자바스크립트에서의 변수 선언 방식인 var, let, const
date: 2024-05-01
author: 임하연, 안정음, 이시현
tags: [JavaScript, 변수, var, let, const, 호이스팅, TDZ]
---

# 자바스크립트의 변수 선언 (var, let, const)

## 📝 개요

ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었다. 하지만 var 키워드는 여러 문제가 많았고, 이를 보완하기 위해 ES6부터 const, let이 도입되었다.

## 💡 변수 선언 키워드의 특징

### 1. var

- 재선언 가능
- 재할당 가능
- 함수 레벨 스코프
- 호이스팅 발생

```js
// 재선언 가능
var x = 15;
var x = 20; // 재선언이 가능하다.

// 함수 레벨 스코프
var num = 10;
for (var i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
console.log(i); // 5 (전역 변수로 동작)

// 호이스팅
console.log(hi); // undefined
hi = 1000;
console.log(hi); // 1000
```

### 2. let

- 재선언 불가능
- 재할당 가능
- 블록 레벨 스코프
- TDZ의 영향을 받음

```js
// 재선언 불가능
let hi = 10;
let hi = 20; // SyntaxError가 발생한다.

// 블록 레벨 스코프
let globalVar = 15; // 전역변수
{
  let blockVar = 15; // 지역변수
  let globalVar = 20; // 지역변수
}
console.log(globalVar); // 15
console.log(blockVar); // ReferenceError가 발생한다.
```

### 3. const

- 재선언 불가능
- 재할당 불가능
- 블록 레벨 스코프
- TDZ의 영향을 받음
- 선언과 동시에 초기화 필요

```js
// 재할당 불가능
const num = 0;
num = 100; // TypeError가 발생한다.

// 선언과 동시에 초기화 필요
const hi; // SyntaxError가 발생한다
const hi = 10;

// 객체의 경우 내부 값 변경 가능
const choonsik = {
  species: "cat",
};
choonsik.species = "bear"; // 변경이 가능하다.
console.log(choonsik); // {species: "bear"}
```

## 🔍 호이스팅과 TDZ(일시적 사각지대)

### 호이스팅

- 스코프 안에 존재하는 모든 선언들이 해당 스코프의 최상단으로 끌어올려지는 것처럼 보이는 현상
- var의 경우 선언과 초기화가 동시에 이루어짐

```js
// var의 호이스팅
console.log(color); // undefined
var color = 'pink';

// let의 호이스팅
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

### TDZ(일시적 사각지대)

- 변수가 선언되고 초기화되기까지의 범위
- let과 const는 TDZ의 영향을 받아 호이스팅이 일어나지 않는 것처럼 보임

```js
// TDZ 예시
console.log(x); // ReferenceError가 발생한다.
let x = 5;
console.log(x); // 5
```

## 📊 변수 생성 과정

### var

1. 선언 + 초기화 (undefined)
2. 할당

### let

1. 선언
2. 초기화
3. 할당

### const

1. 선언 + 초기화 + 할당 (동시에)

## 🤔 주요 포인트

1. 변수의 스코프는 좁을수록 좋음

   - 전역 변수는 유효범위가 넓어 어디서 어떻게 사용될지 파악이 어려움
   - 블록 레벨 스코프를 사용하면 변수의 생명주기를 명확하게 제한할 수 있음

2. TDZ를 방지하기 위한 습관

   - 변수를 사용하기 전에 선언하고 초기화하기
   - 코드의 최상단에서 변수 선언하기

3. const 사용 권장

   - 기본적으로 const 사용
   - 재할당이 필요한 경우에만 let 사용
   - var는 사용 지양

4. 호이스팅 이해하기
   - var는 호이스팅 시 undefined로 초기화
   - let과 const는 TDZ로 인해 호이스팅이 일어나지 않는 것처럼 보임

## 📚 참고 자료

- https://poiemaweb.com/es6-block-scope
- https://www.freecodecamp.org/korean/news/var-let-constyi-caijeomeun/
