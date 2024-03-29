---
emoji: 👋
title: '객체지향의 사실과 오해 - 2장'
date: '2023-11-17 07:24:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 이상한 나라의 객체

가림막 막대 실험

- 사람은 아기 때부터 뚜렷한 경계를 가지고 함께 행동하는 물체를 하나의 개념으로 인지
- 물체가 여러 부분으로 구성돼 있더라도 함께 움직일 경우 그 물체를 하나의 유기적인 단위로 인식

<br>

## 객체지향과 인지 능력

- 인간은 본능적으로 세상을 독립적이고 식별 가능한 객체의 집합으로 바라봄
- 객체지향은 세상을 자율적이고 독립적인 객체들로 분해할 수 있는 인간의 기본적인 인지 능력에 기반을 두고 있음
- 인간의 인지 능력은 물리적인 한계를 넘어 개념적으로 경계 지을 수 있는 추상적인 사물까지도 객체로 인식할 수 있게 함
- 객체란 인간이 분명하게 인지하고 구별할 수 있는 물리적인 또는 개념적인 경계를 지닌 어떤 것
- 객체지향 패러다임은 소프트웨어의 세계 역시 다양한 소프트웨어 객체들이 모여 이뤄져 있다는 믿음에서 출발. 객체지향 패러다임의 목적은 현실 세계를 기반으로 새로운 세계를 창조하는 것

<br>

## 객체, 그리고 이상한 나라

### 이상한 나라의 앨리스

- 동화 속 앨리스는 작은 문을 통과하기 위해 다양한 아이템을 활용하여 자신의 키를 늘였다 줄였다 함

### 엘리스 객체

- 앨리스는 작은 문을 통과하기에 적당한 상태로 자신의 키를 계속해서 변화시킴. 따라서 특정 시점의 앨리스의 상태란 특정 시점에서의 앨리스의 키를 의미. 엘리스의 특별한 행동에 따라 앨리스의 상태(키)가 변하게 됨
- 앨리스의 상태를 결정하는 것은 행동이지만 행동의 결과를 결정하는 것은 상태. 앨리스가 하는 행동에 따라 현재의 키에서 더 커지거나, 작아질 수 있으므로, 앨리스가 한 행동의 결과는 앨리스의 상태에 의존적
- 앨리스가 성공적으로 문을 통과할 수 있는지 여부는 전적으로 앨리스의 키가 얼마인가에 달려있음. 문을 통과한다는 행동의 결과는 앨리스의 위치라는 상태를 이용해 쉽게 설명할 수 있음. 앨리스가 문을 통과했다면 앨리스의 위치는 아름다운 정원으로, 통과하지 못했다면 여전히 천장이 낮은 긴 통로 안에 있음
- 어떤 행동의 성공 여부는 이전에 어떤 행동들이 발생했는지에 영향을 받음. 앨리스는 문을 통과하기 전에 먼저 키를 작게 줄이기 위해 음료나 케이크를 먹어야 함. 행동 간의 순서가 중요
- 이렇게 앨리스의 상태가 변경되더라도 앨리스는 앨리스. 앨리스는 상태 변경과 무관하게 유일한 존재로 식별 가능

- 앨리스의 특징
  - 앨리스는 상태를 가지며 상태는 변경 가능
  - 앨리스의 상태를 변경시키는 것은 앨리스의 행동
  - 앨리스는 어떤 상태에 있더라도 유일하게 식별 가능

<br>

## 객체, 그리고 소프트웨어 나라

- 하나의 개별적인 실체로 식별 가능한 물리적인 또는 개념적인 사물은 어떤 것이라도 객체가 될 수 있음
- 객체는 상태(state), 행동(behavior), 식별자(identity) 를 지닌 실체

### 상태

1. 상태가 필요한 이유

   - 객체가 주변 환경과의 상호작용에 어떻게 반응하는가는 그 시점까지 객체에 어떤 일이 발생했느냐에 좌우됨
   - 어떤 행동의 결과는 과거에 어떤 행동들이 일어났었느냐에 의존
   - 이상한 나라의 앨리스가 문을 통과한다는 행동의 결과를 예상할 수 있는 한 가지 방법은 앨리스가 과거에 케이크나 버섯을 먹었던 적이 있는지 살펴보는 것
   - 그러나 일반적으로 과거 행동의 이력을 통해 현재 행동의 결과를 판단하는 방식은 어려워, 여기서 행동의 과정과 결과를 단순하게 기술하기 위한 ‘상태’ 라는 개념이 등장
   - 상태를 이용하면 과거의 모든 행동 이력을 설명하지 않고도 행동의 결과를 쉽게 예측하고 설명할 수 있음. 따라서 현재를 기반으로 객체의 행동 방식을 이해할 수 있음

2. 상태와 프로퍼티

   - 세상에 존재하는 모든 것들이 객체인 것은 아님. 숫자, 문자열, 양, 속도, 시간, 날짜, 참/거짓과 같은 단순한 값들은 객체가 아님. 단순한 값들은 그 자체로 독립적인 의미를 가지기보다는 다른 객체의 특성, 즉 상태를 표현하기 위해 사용됨
   - 단순한 값이 아니라 객체를 사용해 다른 객체의 상태를 표현할 수도 있음. 앨리스가 음료를 들고 있는지 여부는 앨리스라는 객체가 음료라는 객체와 연결돼있는지 여부로 표현할 수 있음. 앨리스의 상태는 키와 위치라는 단순한 값과 음료라는 객체의 조합으로 표현할 수 있게 됨
   - 객체와 객체 사이의 의미 있는 연결을 ‘링크’ 라고 함. 객체와 객체 사이에는 링크가 존재해야만 요청(메시지)을 주고받을 수 있음. 링크는 객체가 다른 객체를 참조할 수 있다는 것을 의미하며, 이것은 일반적으로 한 객체가 다른 객체의 식별자를 알고 있는 것으로 표현됨
   - 링크와 달리 객체를 구성하는 단순한 값은 ‘속성’ 이라고 함. 객체의 프로퍼티는 단순한 값인 속성과 다른 객체를 가리키는 링크라는 두 가지 종류의 조합으로 표현됨
   - 객체는 자율적인 존재. 객체지향의 세계에서 객체는 다른 객체의 상태에 직접적으로 접근할 수도, 상태를 변경할 수도 없음. 자율적인 객체는 스스로 자신의 상태를 책임져야
     함
   - 이때 등장하는 ‘행동’은 다른 객체로 하여금 간접적으로 객체의 상태를 변경하게끔 해줌. 객체는 스스로의 행동에 의해서만 상태가 변경되는 것을 보장함으로써 객체의 자율성을 유지.

### 행동

1.  상태와 행동

    - 객체의 상태를 변경하는 것은 객체의 자발적인 행동뿐. 객체가 취하는 행동은 객체 자신의 상태를 변경시키며, 이때 부수 효과(side effect) 를 초래
    - 객체의 행동은 객체의 상태를 변경시키지만 행동의 결과는 객체의 상태에 의존적. 음료를 마신 후의 앨리스의 키는 음료를 마시기 전의 앨리스의 키보다 작아져야 함. 상태와 행동 사이에는 다음 관계가 성립

          - 객체의 행동은 상태에 영향을 받음
          - 객체의 행동은 상태를 변경시킴

    - 앨리스가 문을 통과하는 행동은 과거의 행동을 돌아볼 필요 없이 앨리스의 ‘키’와 ‘위치’라는 두 가지 상태를 이용해 간단하게 서술할 수 있음

      - 앨리스의 키가 40cm 이하라면 문을 통과할 수 있음
      - 문을 통과한 후에 앨리스의 위치는 아름다운 정원으로 바뀌어야 함

2.  협력과 행동

    - 객체는 섬이 아니며, 자신의 책임을 완수하기 위해 다른 객체와 적극적으로 상호작용함. 객체는 외부에서 수신한 메시지에 따라 적절히 행동하면서 협력에 참여하고, 그 결과 자신의 상태를 변경함
    - 객체는 자기 자신의 상태뿐 아니라 다른 객체의 상태 변경을 유발할 수 있음. 앨리스가 음료를 마시면 앨리스 자신의 키가 작아지는 동시에 앨리스가 먹은 양만큼 음료의 양이 줄어야 함. 따라서 객체의 행동에는 다음 두 가지 부수효과가 따름
      - 객체 자신의 상태 변경
      - 행동 내에서 협력하는 다른 객체에 대한 메시지 전송

3.  상태 캡슐화

    - 객체지향의 세계에서 모든 객체는 자신의 상태를 스스로 관리하는 자율적인 존재.
    - 앨리스가 음료를 마시면 앨리스 자신의 상태(키)를 변경함과 동시에 자신이 먹은 양만큼 음료의 양을 줄여달라고 메시지를 전송함.
    - 메시지를 수신한 음료는 스스로 양이 줄어들 것인지를 결정함
    - 객체는 상태를 캡슐 안에 감춰둔 채 외부로 노출하지 않음. 객체가 외부에 노출하는 것은 행동뿐이며, 외부에서 객체에 접근할 수 있는 유일한 방법 역시 행동뿐.
    - 객체의 행동을 유발하는 것은 외부로부터 전달된 메시지지만 객체의 상태를 변경할지 여부는 객체 스스로 결정. 메시지 송신자는 간섭할 수 없음
    - 캡슐화는 객체의 자율성을 높임. 자율적인 객체는 스스로 판단하고 스스로 결정하며, 객체들 사이 협력은 더욱 유연하고 간결해짐

4.  식별자
    - 객체가 식별 가능하다는 것은 객체를 서로 구별할 수 있는 특정한 프로퍼티가 객체 안에 존재한다는 것을 의미
    - 값의 상태는 불변 상태를 가지며, 값이 같은지 여부는 상태가 같은지를 이용해 판단. 상태를 이용해 두 값이 같은지 판단할 수 있는 성질을 동등성이라고 함.
    - 반면 객체는 시간에 따라 변경되는 상태를 포함하며, 행동을 통해 상태를 변경함. 객체는 가변 상태를 가짐. 타입이 같은 두 객체의 상태가 완전히 똑같더라도 두 객체는 독립적인 별개의 객체로 다뤄짐
    - 식별자를 기반으로 객체가 같은지는 판단할 수 있는 성질을 동일성(identical)이라고 함.
    - 상태가 가변적인 두 객체의 동일성을 판단하기 위해서는 상태 변경에 독립적인 별도의 식별자를 이용할 수밖에 없음. 객체지향의 세계는 상태가 변하지 않는 값과 상태가 변하는 객체들이 서로 균형을 맞추며 조화를 이루는 사회

<br>

## 기계로서의 객체

- 일반적으로 객체의 상태를 조회하는 작업을 쿼리(query) 라고 하고 객체의 상태를 변경하는 작업을 명령(command) 이라고 함
- 객체가 외부에 제공하는 행동의 대부분은 쿼리와 명령으로 구성됨
- 사용자는 명령을 통해서만 상태를 변경할 수 있고 조회(쿼리)를 통해서만 상태를 조회할 수 있음
- 즉 객체에 접근할 수 있는 유일한 방법은 객체가 제공하는 행동뿐(이 점은 객체의 캡슐화를 강조 함. 객체의 상태와 행동은 하나의 단위로 캡슐화됨)
- 기계 은유에서 두 기계는 외부에 동일한 행동을 제공하고 상태 역시 동일하지만, 우리는 두 기계를 구분된 별개의 객체로 인식함. 이것은 객체가 상태와 무관하게 구분 가능한 식별자를 가진다는 것을 의미함
- 앨리스 객체와 음료 객체를 기계 은유의 관점에서 표현한다면, 앨리스 기계의 ‘음료를 마시다’ 버튼을 눌렀을 때 앨리스 기계는 링크를 통해 연결된 음료 기계에게 ‘마셔지다’라는 버튼이 눌려지도록 요청을 전송함. 즉, 링크를 통해 연결된 두 객체가 메시지 전송을 통해 협력하고 있는 것

<br>

## 행동이 상태를 결정

- 객체의 상태를 먼저 결정하고 행동을 나중에 결정하는 방법은 설계에 나쁜 영향을 끼침

  - 상태를 먼저 결정할 경우 캡슐화가 저해됨. 상태가 캡슐화되지 못하고 공용 인터페이스에 노출되버릴 확률이 높아짐
  - 객체를 협력자가 아닌 고립된 섬으로 만듦. 상태를 먼저 고려한 객체는 협력에 적합하지 못함
  - 객체의 재사용성이 저하됨. 재사용성은 다양한 협력에 참여할 수 있는 능력에서 나오기 때문

- 즉, 상태가 아니라 행동에 초점을 맞춰 객체를 생성해야 함.
- 객체는 다른 객체와 협력하기 위해 존재함.
- 협력의 문맥에 맞는 적절한 행동을 수행하는 객체를 발견하거나 창조해야 함
- 객체지향 설계는 애플리케이션에 필요한 협력을 생각하고 협력에 참여하는 데 필요한 행동을 생각한 후, 행동을 수행할 객체를 선택하는 방식으로 수행됨.
- 협력 안에서 객체의 행동은 결국 객체의 책임이며, 응집도 높고 재사용 가능한 객체를 만들 수 있어야 함
- 행동이 상태를 결정함

<br>

## 은유와 객체

1. 두 번째 도시전설

   - 객체지향을 현실 세계의 모방이라고 보는 관점은 객체지향 분석/설계가 현실 세계에 존재하는 다양한 객체를 모방한 후 필요한 부분만 취해 소프트웨어 객체로 구현하는 과정이라고 설명함. 이 관점은 객체지향을 현실 세계의 추상화라고도 하는데, 여기서 추상화란 실제 사물에서 자신이 원하는 특성만 취하여 핵심만 표현하는 행위를 말함
   - 그러나 객체지향 세계는 현실 세계의 단순한 모방이 아님

2. 의인화

   - 현실 세계의 객체와 소프트웨어 객체 사이의 가장 큰 차이점은, 소프트웨어의 객체는 행동을 스스로 수행할 수 있다는 것
   - 현실의 객체보다 더 많은 일을 할 수 있는 소프트웨어 객체의 특징을 의인화라고 부름. 객체지향 세계의 거리는 현실 속의 객체보다 더 많은 특징과 능력을 보유한 객체들로 넘쳐남.

3. 은유

   - 현실 세계와 객체지향 세계 사이의 관계는 은유(metaphor) 에 기반
   - 현실 속의 객체의 의미 일부가 소프트웨어 객체로 전달되기 때문에 프로그램 내의 객체는 현실 속의 객체에 대한 은유임. 은유 관계에 있는 실제 객체의 이름을 소프트웨어 객체의 이름으로 사용하면 표현적 차이를 줄여 소프트웨어의 구조를 쉽게 예측할 수 있음

4. 이상한 나라 창조

   - 객체지향 설계자로서 우리의 목적은 현실을 모방하는 것이 아니며, 단지 이상한 나라를 창조하기만 하면 됨

<br>

## 참고

- [객체지향의 사실과 오해](https://www.yes24.com/Product/Goods/18249021)

```toc

```
