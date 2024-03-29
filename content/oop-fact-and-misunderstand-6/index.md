---
emoji: 👋
title: '객체지향의 사실과 오해 - 6장'
date: '2023-12-12 07:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 들어가기 앞서

- 유일하게 변하지 않는 것은 모든 것이 변한다는 사실 뿐
- 여행 중 길을 찾는 방법은 크게 두 가지로 나눌 수 있음

1. 기능적이고 해결책 지향적인 접근법

   - 다른 사람에게 길을 물어봄
   - 올바른 길을 알려줬다면 원하는 곳으로 이동할 수 있겠지만, 이 방법은 일반적이지도, 재사용 가능하지도 않음
   - 또 중요한 랜드마크가 없다면 설명만으로 경로를 찾기 쉽지 않음

2. 구조적이고 문제 지향적인 접근법
   - 지도를 이용
   - 길을 찾는 데 필요한 풍부한 컨텍스트 정보가 함축돼 있으며, 길을 묻는 방법보다 쉽고 간단
   - 주변 지형을 추상적으로 표현하기 때문에 실세계의 환경과 우리의 지식을 밀접하게 연관 지을 수 있게 해줌
   - 지도는 다양한 목적을 위해 재사용될 수 있으며, 범용적. ‘기능’에 대한 요구사항이 계속 변해도 지도에 표시된 ‘구조’는 안정적이기 때문
   - 지도 은유의 핵심은, 기능이 아니라 구조를 기반으로 모델을 구축하는 편이 좀 더 범용적이고 이해하기 쉬우며 변경에 안정적이라는 것.
   - 객체지향 개발 방법은 안정적인 구조에 변경이 빈번하게 발생하는 기능을 종속시키는 지도의 방법과 유사함

- 자주 변경되는 기능이 아니라, 안정적인 구조를 따라 역할 책임, 협력을 구성

<br>

## 기능 설계 대 구조 설계

1. 기능 측면의 설계

   - 제품이 사용자를 위해 무엇을 할 수 있는지에 초점

2. 구조 측면의 설계
   - 제품의 형태가 어떠해야 하는지에 초점

- 훌륭한 구조는 훌륭한 소프트웨어를 만들기 위한 필요조건.
- 훌륭한 설계는 불가능한 요구사항 변경에도 유연하게 대처할 수 있는 안정적인 구조를 제공해야 함
- 미래를 대비하는 가장 좋은 방법은 변경을 예측하는 것이 아니라, 변경을 수용할 수 있는 선택의 여지를 설계에 마련해 놓는 것.
- 설계를 하는 목적은 나중에 설계하는 것을 허용하는 것이며, 설계의 일차적인 목표는 변경에 소요되는 비용을 낮추는 것.
- 객체지향 접근방법은 자주 변경되지 않는 안정적인 객체 구조를 바탕으로 시스템 기능을 객체 간의 책임으로 분배.
- 객체지향은 객체의 구조에 집중하고 기능이 객체의 구조를 따르게 만듦. 기능이 변경되더라도 객체 간의 구조는 그대로 유지됨.

<br>

## 두 가지 재료: 기능과 구조

1. 기능
   - 사용자가 자신의 목표를 달성하기 위해 사용할 수 있는 시스템의 서비스
2. 구조
   - 시스템의 기능을 구현하기 위한 기반으로, 기능 변경을 수용할 수 있도록 안정적이여야 함.

<br>

## 안정적인 재료: 구조

1. 도메인 모델

   - 사용자가 프로그램을 사용하는 대상 분야를 도메인이라고 함.
   - 도메인 모델에서 모델이란 대상을 단순화해서 표현한 것으로, 지식을 선택적으로 단순화하고 의식적으로 구조화한 형태
   - 즉 도메인 모델은 소프트웨어가 목적하는 영역 내의 개념과 개념 간의 관계, 다양한 규칙이나 제약 등을 주의 깊게 추상화한 것
   - 도메인 모델은 이해관계자들이 바라보는 멘탈 모델(Mental Model)
   - 소프트웨어 사용자들은 도메인에 존재하는 현상을 이해하고 현상에 반응하기 위해 도메인과 관련된 멘탈 모델을 형성함

2. 도메인의 모습을 담을 수 있는 객체지향

   - 최종 코드는 사용자가 도메인을 바라보는 관점을 반영해야 함.
   - 즉 애플리케이션은 도메인 모델을 기반으로 설계돼야 함.
   - 객체지향은 도메인 모델의 세 가지 측면(사용자, 디자인, 시스템 이미지)을 모두 모델링할 수 있는 거의 유일한 모델링 패러다임.
   - 객체지향은 사람들이 만지고 느끼고 볼 수 있는 실체를 시스템 안의 객체로 재창조할 수 있게 해줌

3. 표현적 차이

   - 소프트웨어 객체는 현실 객체에 대한 추상화가 아니라, 은유를 기반으로 재창조한 것
   - 소프트웨어 객체와 현실 객체 사이의 의미적 거리를 가리켜 표현적 차이 또는 의미적 차이라고 함
   - 소프트웨어 객체는 그 대상이 현실적인지, 현실적이지 않은지에 상관없이 도메인 모델을 통해 표현되는 도메인 객체들을 은유해야 함.
   - 도메인 모델을 기반으로 설계하고 구현하는 것은 사용자가 도메인을 바라보는 관점을 그대로 코드에 반영할 수 있게 하며, 결과적으로 표현적 차이가 줄어들 것.
   - 도메인 모델은 코드 안에 존재하는 미로를 헤쳐나갈 수 있는 지도를 제공함

4. 불안정한 기능을 담는 안정적인 도메인 모델
   - 도메인 모델이 제공하는 구조는 상대적으로 안정적.
   - 도메인 모델의 핵심은 사용자가 도메인을 바라보는 관점을 반영해 소프트웨어를 설계하고 구현하는 것.
   - 본질적인 측면을 가장 잘 반영한 사용자 모델을 기반으로 설계와 코드를 만들면 변경에 쉽게 대처할 수 있을 가능성이 커짐
   - 결론적으로 안정적인 구조를 제공하는 도메인 모델을 기반으로 소프트웨어의 구조를 설계하면 변경에 유연하게 대응할 수 있는 탄력적인 소프트웨어를 만들 수 있음

<br>

## 불안정한 재료: 기능

1. 유스케이스

   - 훌륭한 기능적 요구사항을 얻기 위해서는 목표를 가진 사용자와 사용자의 목표를 만족시키기 위해 일련의 절차를 수행하는 시스템 간의 ‘상호작용’ 관점에서 시스템을 바라봐야 함
   - 사용자의 목표를 달성하기 위해 사용자와 시스템 간에 이뤄지는 상호작용의 흐름을 텍스트로 정리한 것을 유스케이스라고 함
   - 유스케이스는 시스템의 이해관계자들 간의 계약을 행위 중심으로 파악함.
   - 산발적으로 흩어져 있는 기능에 사용자 목표라는 문맥을 제공함으로써 각 기능이 유기적인 관계를 지닌 체계를 이룰 수 있게 함
   - 사용자 목표가 유스케이스의 핵심. 유스케이스는 공통의 사용자 목표를 통해 강하게 연관된 시나리오의 집합

2. 유스케이스의 특성

   - 유스케이스는 사용자와 시스템 간의 상호작용을 보여주는 ‘텍스트’. 유스케이스는 다이어그램이 아님
   - 유스케이스는 하나의 시나리오가 아니라 여러 시나리오들의 집합. 시나리오는 유스케이스를 통해 시스템을 사용하는 하나의 특정한 이야기 또는 경로. 시나리오를 유스케이스 인스턴스라고도 함
   - 유스케이스는 단순한 피처(feature) 목록과 다름. 피처는 시스템이 수행해야 하는 기능의 목록을 단순하게 나열한 것. 유스케이스는 단순히 기능을 나열한 것이 아니라 이야기를 통해 연관된 기능을 함께 묶을 수 있음
   - 유스케이스는 사용자 인터페이스와 관련된 세부 정보를 포함하지 말아야 함. 유스케이스는 자주 변경되는 사용자 인터페이스 요소는 배제하고 사용자 관점에서 시스템의 행위에 초점을 맞춤
   - 유스케이스는 내부 설계와 관련된 정보를 포함하지 않음

3. 유스케이스는 설계 기법도, 객체지향 기법도 아님
   - 유스케이스는 단지 사용자가 바라보는 시스템의 외부 관점만을 표현. 유스케이스로부터 시스템의 내부 구조를 유추할 수는 없음
   - 유스케이스와 객체의 구조 사이에는 커다란 간격이 존재하며, 이 간격을 자동으로 없앨 수 없음. 유스케이스는 객체의 구조나 책임에 대한 어떤 정보도 제공하지 않음

<br>

## 재료 합치기: 기능과 구조의 통합

1. 도메인 모델, 유스케이스, 그리고 책임-주도 설계

   - 변경에 유연한 소프트웨어를 만들기 위해서는 유스케이스에 정리된 시스템의 기능을 도메인 모델을 기반으로 한 객체들의 책임으로 분배해야함
   - 시스템은 사용자로부터 전송된 메시지를 수행하기 위해 책임을 수행하는 거대한 자율적인 객체.
   - 시스템 안에는 더 작은 규모의 객체들이 협력을 통해 구현됨.
   - 시스템에 할당된 커다란 책임은 시스템 안의 작은 규모의 객체들이 수행해야 하는 더 작은 규모의 책임으로 세분화됨
   - 도메인 모델에 포함된 개념을 은유하는 소프트웨어 객체를 선택하고, 협력을 완성하는 데 필요한 메시지를 식별하면서 객체들에게 책임을 할당해 나감.
   - 마지막으로 협력에 참여하는 객체를 구현하기 위해 클래스를 추가하고 속성과 함께 메서드를 구현하면 시스템의 기능이 완성됨
   - 유스케이스는 사용자에게 제공할 기능을 시스템의 책임으로 보게 함으로써 객체 간의 안정적인 구조에 책임을 분배할 수 있는 출발점을 제공함.
   - 도메인 모델을 기능을 수용하기 위해 은유할 수 있는 안정적인 구조를 제공함
   - 책임-주도 설계 방법은 시스템의 기능을 역할과 책임을 수행하는 객체들의 협력 관계로 바라보게 함으로써 유스케이스와 도메인 모델을 통합함.
   - 견고한 객체지향 애플리케이션을 개발하기 위해서는 사용자의 관점에서 시스템으 기능을 명시하고, 사용자와 설계자가 공유하는 안정적인 구조를 기반으로 기능을 책임으로 변환하는 체계적인 절차를 따라야 함
   - 유스케이스에서 출발해 객체들의 협력으로 이어지는 일련의 흐름은 객체 안에 다른 객체를 포함하는 재귀적 합성이라는 객체지향의 기본 개념을 잘 보여줌
   - 객체지향은 모든 것을 객체로 바라봄다. 크기와 상관없이 모든 객체는 메시지를 전송하거나 수신할 수 있고 메시지에 응답하기 위해 자율적으로 메서드를 선택할 수 있음

2. 기능 변경을 흡수하는 안정적인 구조
   - 도메인 모델이 안정적인 이유는 2가지
     - 첫째, 도메인 모델을 구성하는 개념은 비즈니스가 없어지거나 완전히 개편되지 않는 한 안정적으로 유지됨
     - 둘째, 도메인 모델을 구서하는 개념 간의 관계는 비즈니스 규칙을 기반으로 하기 때문에 비즈니스 정책이 크게 변경되지 않는 한 안정적으로 유지됨
   - 객체지향의 가장 큰 장점은 도메인을 모델링하기 위한 기법과 도메인을 프로그래밍하기 위해 사용하는 기법이 동일하다는 점. 따라서 도메인 모델링에서 사용한 객체와 개념을 프로그래밍 설계에서의 객체와 클래스로 매끄럽게 변환할 수 있음. 객체지향의 이 같은 특성을 연결완전성이라고 함
   - 연결완전성의 역방향 역시 성립함. 즉 코드의 변경으로부터 도메인 모델의 변경 사항을 유추할 수 있음. 이것을 가역성이라고 함
   - 안정적인 도메인 모델을 기반으로 시스템의 기능을 구현하고, 도메인 모델과 코드를 밀접하게 연관시키기 위해 노력

<br>

## 참고

- [객체지향의 사실과 오해](https://www.yes24.com/Product/Goods/18249021)

```toc

```
