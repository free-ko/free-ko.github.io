---
emoji: π₯
title: 'μ½λμ¨ React 7κΈ° - 2μ£Όμ°¨ νκ³ '
date: '2022-04-01 14:45:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: React
---

# β Facts(μ¬μ€, κ°κ΄)

### 1. React

- React κ°λ νμ΅
- React DOM κ°λ νμ΅

### 2. Components & Props

- Components & Props κ°λ νμ΅

### 3. React Hook

- React Hook κ°λ νμ΅
- useState κ°λ νμ΅

### 4. μ μΈν νλ‘κ·Έλλ°

- μ μΈν νλ‘κ·Έλλ° κ°λ

### 5. κ΄μ¬μ¬μ λΆλ¦¬

- κ΄μ¬μ¬μ λΆλ¦¬ κ°λ νμ΅

<br>

# πββοΈ Feelings(λλ, μ£Όκ΄)

μ΄λ² μ£Όλ μΌκ·Ό λλ¬Έμ λͺΈλ λ§μλ μ§μ³μλ μνμλ€. κ·Έλλ κ³Όμ λ₯Ό μ‘°κΈμ΄λΌλ ν΄μ PR νΌλλ°±μ λ°κ³ μ λΈλ ₯μ νλ€.

κ·Έλ¬λ λ§μ΄ μ§μ³μλ νμ΄μμκΉ, λΉ¨λ¦¬ κ³Όμ λ₯Ό λ§λ¬΄λ¦¬ νκ³  μΆμ λ§μμ PR `Suggestion` λν΄ κΉκ² μκ°νμ§ μκ³ , κ³Όμ μ μ λ΅μ μ§μ€μ νλ€.

λ€νν μ½λ λ¦¬λ·° ν΄μ£Όμλ λΆκ»μ μ νν νΌλλ°±μ ν΄μ£Όμμ, μ λ΅μ΄ μλ `μ`μ μ΄μ μ λ¬μΌ νλ€λ μ¬μ€μ κΉ¨λ«κ³  μ°¨λΆν `Suggestion`μ κΉκ² μκ°νλ μκ°μ κ°μ§κ² λμλ€.

λμ΄μΌλ³΄λ μ¬μ€ μΌμ ν  λμλ, `μ`λ³΄λ€λ `μ λ΅`μ μ§μ€μ νλ©° μΌνκ³  μμλ€.

μμΌλ‘ μλ¬΄λ¦¬ λͺΈκ³Ό λ§μμ΄ μ§μΉλλΌλ, μμμ μΌλ‘ `μ`μ μ§μ€νλ©° νμ΅κ³Ό μλ¬΄λ₯Ό ν΄μΌκ² λ€.

<br>

# π Findings(λ°°μ΄μ )

- React 17λ²μ  μ΄μλΆν°λ `React imports`λ₯Ό μλ΅ν΄λ λλ€λ μ¬μ€μ μκ² λμ΄ μ μ©ν΄ λ³΄μλ€. μ¬μ©νλ λΌμ΄λΈλ¬λ¦¬μ μ΅μ  μλ°μ΄νΈ μν©μ΄ μ΄λ»κ² λλμ§ νμΈνκ³ , νΈλ λλ₯Ό μΈμ§νλ κ² μ€μνλ€λ κ²μ λ°°μ°κ² λμλ€.

- Reactλ λΆλ³μ±μ κ°μΌ λμλ§ λ¦¬λ λλ§μ νλ€λ μ¬μ€ λλ¬Έμ `useState`μμ μ μν λ°°μ΄, κ°μ²΄ κ°λ€μ μλ°μ΄νΈν  λμλ, μλ‘μ΄ κ°μ λ§λ€μ΄μ `setState` μΈμλ‘ λ£μ΄μ€μΌ λ¦¬λ λλ§ λλ€λ μ¬μ€λ μκ² λμλ€. λ¬΄μλ³΄λ€ κ·Έλ₯ λ§μ°ν μ¬μ©νλ κ²μ΄ μλ λ΄λΆ μλμλ¦¬λ₯Ό νμνλ©° μ¬μ©νλ νλκ° μ€μν¨μ μκ² λμλ€.

- `setState`ν  λ, κΈ°μ‘΄μ μν κ°μ κ°μ Έμ λ°λ‘ μλ°μ΄νΈνλ λ°©λ²μ μκ² λμλ€.

- μ΄λ²€νΈ κ°μ²΄λ₯Ό μΈμλ‘ μ λ¬νκΈ°λ³΄λ€λ κ°μ μ λ¬νλ ννλ‘ μ λ¬νλ©΄, νμ μ»΄ν¬λνΈμ μμ‘΄μ±μ λμ μ μλ€λ μ¬μ€μ μκ² λμλ€.

- μ»΄ν¬λνΈλ₯Ό μ μΈκ³Ό λμμ `export default`νκ²λλ©΄, νλμ μ΄ μ»΄ν¬λνΈλ λ°μμλ μ¬μ©ν  μ μλ€κ³  μΈμ§ μν¬ μ μμμ μκ² λμλ€.

- νμ μ»΄ν¬λνΈμ μ λ¬λ ν¨μ λ€μ΄λ°κ³Ό `HTML DOM` μ΄λ²€νΈ ν¨μ λ€μ΄λ°μ΄ κ°μ κ²½μ°, μ λ¬λ ν¨μλ₯Ό λ°λ‘ νΈλ€λ¬ ν¨μλ‘ λΆλ¦¬ν΄ κ΄λ¦¬νλ©΄ μ’λ€λ μ¬μ€μ μκ² λμλ€.

- `Guard Clauses` ν¨ν΄μ ν΅ν΄, κ°λμ± μ’μ μ½λ μμ± λ°©λ²μ μκ² λμλ€.

- νΈλ€λ¬ ν¨μλ₯Ό λͺμν  λ, `handle`κ³Ό `λ¬΄μ`μ ν¨μ λ€μ΄λ°μ λ£κ² λλ©΄ μ‘°κΈ λ κ°λμ±μ΄ μ’μ ν¨μ λ€μ΄λ°μ΄ λλ€λ μ¬μ€λ μκ² λμλ€.

<br>

# π¨βπ» Affirmation(μκΈ° μ μΈ)

- μ»¨λμ μ‘°μ μ μ νμ.
- λ΅μ λ΄κΈ°λ³΄λ€λ `μ`μ μ§μ€νμ.
- JS, React κΈ°λ³ΈκΈ°λ₯Ό μ΄λ² κΈ°νμ μ λλ‘ νμ΅νμ.

<br>
<br>

### π μ°Έκ³ 

- [hooksμμ useStateκ° constλ‘ μ μΈλλ μ΄μ ](https://dudghsx.tistory.com/18?utm_source=pocket_mylist)
- [[React] λ°°μ΄ κ° μΆκ°, μ κ±°, μμ νλ©° λΆλ³μ± μ μ§νκΈ°](https://velog.io/@mnz/React-%EB%B0%B0%EC%97%B4-%EA%B0%92-%EC%B6%94%EA%B0%80-%EC%A0%9C%EA%B1%B0-%EC%88%98%EC%A0%95%ED%95%98%EB%A9%B0-%EB%B6%88%EB%B3%80%EC%84%B1-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0?utm_source=pocket_mylist)
- [Guard Clauses](https://www.refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
- [useState](https://ko.reactjs.org/docs/hooks-reference.html#functional-updates)

```toc

```
