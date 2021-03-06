---
emoji: ๐จโ๐ป
title: HTTP - 2.URL์ ์น ๋ธ๋ผ์ฐ์  ์์ฒญ ํ๋ฆ
date: '2021-12-12 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: CS
---

<br>

<h1 align="center">
  ๐  URL์ ์น ๋ธ๋ผ์ฐ์  ์์ฒญ ํ๋ฆ
</h1>

<br>

## 1. URI ๋จ์ด์ ๋ป

- `Uniform`(๋ฆฌ์์ค ์๋ณํ๋ ํต์ผ๋ ๋ฐฉ์)
- `Resource`(์์, URI๋ก ์๋ณํ  ์ ์๋ ๋ชจ๋  ๊ฒ, ์ ํ ์์)
- `Identifier`(๋ค๋ฅธ ํญ๋ชฉ๊ณผ ๊ตฌ๋ถํ๋๋ฐ ํ์์ํ ์ ๋ณด

<br>

## 2. URL, URN ๋จ์ด ๋ป

- URL - Locator: ๋ฆฌ์์ค๊ฐ ์๋ ์์น๋ฅผ ์ง์ 
- URN - Name: ๋ฆฌ์์ค์ ์ด๋ฆ์ ๋ถ์ฌ
- ์์น๋ ๋ณํ  ์ ์์ง๋ง, ์ด๋ฆ์ ๋ณํ์ง ์์
- ex) urn:isbn:8969777331(์ด๋ค ์ฑ์ isbn URN)

<br>

## 3. URL ์ ์ฒด ๋ฌธ๋ฒ

- ํ๋กํ ์ฝ : https
- ํธ์คํธ๋ช : www.google.com
- ํฌํธ ๋ฒํธ : 443
- ํจ์ค : /search
- ์ฟผ๋ฆฌ ํ๋ผ๋ฏธํฐ : q=hello&hi=ko

<br>

## 4. URL Scheme

- ์ฃผ๋ก ํ๋กํ ์ฝ ์ฌ์ฉ
- ํ๋กํ ์ฝ : ์ด๋ค ๋ฐฉ์์ผ๋ก ์์์ ์ ๊ทผํ  ๊ฒ์ธ๊ฐ ํ๋ ์ฝ์ ๊ท์น ex) http, https, ftp ๋ฑ
- http๋ 80ํฌํธ, https๋ 443 ํฌํธ๋ฅผ ์ฃผ๋ก ์ฌ์ฉ, ํฌํธ๋ ์๋ต ๊ฐ๋ฅ
- https๋ http์ ๋ณด์ ์ถ๊ฐ(HTTP Secure)

<br>

## 5. URL userinfo

- URL์ ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ํฌํจํด์ ์ธ์ฆ
- ๊ฑฐ์ ์ฌ์ฉํ์ง ์์
- ex) `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
- ex) `https://wwww.google.com:443/search?q=hello&hl=ko`

<br>

## 6. URL Host

- ํธ์คํธ๋ช
- ๋๋ฉ์ธ๋ช ๋๋ IP ์ฃผ์๋ฅผ ์ง์  ์ฌ์ฉ๊ฐ๋ฅ
- ex) `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
- ex) `https://wwww.google.com:443/search?q=hello&hl=ko`

<br>

## 7. URL Port

- ํฌํธ(PORT)
- ์ ์ ํฌํธ
- ์ผ๋ฐ์ ์ผ๋ก ์๋ต, ์๋ต์ http๋ 80, https๋ 443
- ex) `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
- ex) `https://wwww.google.com:443/search?q=hello&hl=ko`

<br>

## 8. URL Path

- ๋ฆฌ์์ค ๊ฒฝ๋ก(path), ๊ณ์ธต์  ๊ตฌ์กฐ
- ex) `/home/file1.jpg`
- ex) `/members`
- ex) `/members/100, items/iphone12`

<br>

## 8. URL Query

- `key=value` ํํ
- `?`๋ก ์์, `&`๋ก ์ถ๊ฐ ๊ฐ๋ฅ `?keyA=valueA&keyB=valueB`
- query parameter, query string์ผ๋ก ๋ถ๋ฆผ, ์น ์๋ฒ์์ ์ ๊ณตํ๋ ํ๋ผ๋ฏธํฐ, ๋ฌธ์ ํํ

<br>

## 9. URL Fragment

- html ๋ด๋ถ ๋ถ๋งํฌ ๋ฑ์ ์ฌ์ฉ
- ์๋ฒ์ ์ ์กํ๋ ์ ๋ณด ์๋
- ex) `https://docs.spring.io/sping-boot/docs/current/reference/html/getting-started.html#getting-started-introducing-spring-boot`

```toc

```
