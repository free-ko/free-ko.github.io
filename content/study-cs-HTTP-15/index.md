---
emoji: π¨βπ»
title: HTTP - 7.HTTP μΌλ° ν€λ(2)
date: '2021-12-26 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: CS
---

<br>

<h1 align="center">
  π  HTTP ν€λ νν
</h1>

<br>

## 1.νν

1. Content-Type : νν λ°μ΄ν°μ νμ
2. Content-Encoding : νν λ°μ΄ν°μ μμΆ λ°©μ
3. Content-Language : νν λ°μ΄ν°μ μμ° μΈμ΄
4. Content-Length : νν λ°μ΄ν°μ κΈΈμ΄
5. νν ν€λλ μ μ‘, μλ΅ λλ€ μ¬μ©

<br>

## 2. Content-Type : νν λ°μ΄ν°μ νμ μ€λͺ

- λ―Έλμ΄ νμ, λ¬Έμ μΈμ½λ©
- ex) text/html; charset=utf-8
- ex) application/json
- ex) image/png

<br>

## 3.Content-Encoding : νν λ°μ΄ν° μΈμ½λ©

- νν λ°μ΄ν°λ₯Ό μμΆνκΈ° μν΄ μ¬μ©
- λ°μ΄ν°λ₯Ό μ λ¬νλ κ³³μμ μμΆ ν μΈμ½λ© ν€λ μΆκ°
- λ°μ΄ν°λ₯Ό μ½λ μͺ½μμ μΈμ½λ© ν€λμ μ λ³΄λ‘ μμΆ ν΄μ 
- ex) gzip, deflate, identity(μμΆμν¨)

<br>

## 4. Content-Language : νν λ°μ΄ν°μ μμ° μΈμ΄

- νν λ°μ΄ν°μ μμ° μΈμ΄λ₯Ό νν
- ex) ko, en, en-US

<br>

## 5. Content-Length : νν λ°μ΄ν°μ κΈΈμ΄

- λ°μ΄νΈ λ¨μ
- Transfer-Encoding(μ μ‘ μ½λ©)μ μ¬μ©νλ©΄ Content-Lengthλ₯Ό μ¬μ©νλ©΄ μλ¨

```toc

```
