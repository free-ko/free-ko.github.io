---
emoji: 👋
title: 'Effective TypeScript 4장'
date: '2023-04-23 17:40:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✏️ 아이템 28: 유효한 상태만 표현하는 타입을 지향하기
1. 애플리케이션의 상태 표현하기
```ts
   interface RequestPending {
     state: "pending";
   }
   
   interface RequestError {
     state: "error";
     error: string;
   }
   
   interface RequestSuccess {
     state: "ok";
     pageText: string;
   }
   
   type RequestState = RequestPending | RequestError | RequestSuccess;
   
   interface State {
     currentPage: string;
     requests: { [page: string]: RequestState };
   }
```
   - 모든 상황 고려하기
   - 어떤 값들을 포함하고 어떤 값들을 제외할지 신중하기 생각하기

<br>

## ✏️ 아이템 29: 사용할 때는 너그럽게, 생성할 때는 엄격하게
1. TCP 구현체의 견고성 원칙 또는 포스텔의 법칙(함수의 시그니처에도 적용가능)
    - 함수의 매개변수는 타입의 범위가 넓어도 되지만, 결과를 반환할 때는 일반적으로 타입의 범위가 더 구체적이어야 함
2. 예시 
   - 👎 Bad Case
   ```ts
        declare function setCamera(camera: CameraOptions): void;
        declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
      
        interface CameraOptions {
          center?: LngLat;
          zoom?: number;
          bearing?: number;
          pitch?: number;
        }
      
        type LngLat =
          | { lng: number; lat: number }
          | { lon: number; lat: number }
          | [number, number];
   ```
   - 👍 Good Case
   ```ts
        interface LngLat {
          lng: number;
          lat: number;
        }
      
        type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];
      
        interface Camera {
          center: LngLat;
          zoom: number;
          bearing: number;
          pitch: number;
        }
      
        interface CameraOptions extends Omit<Partial<Camera>, "center"> {
          center?: LngLatLike;
        }
      
        type LngLatBounds =
          | { northeast: LngLatLike; southwest: LngLatLike }
          | [LngLatLike, LngLatLike]
          | [number, number, number, number];
      
        declare function setCamera(camera: CameraOptions): void;
        declare function viewportForBounds(bounds: LngLatBounds): Camera;
   ```
   → 매개변수와 반환 타입의 재사용을 위해서 기본 형태(반환 타입)와 느슨한 형태(매개변수 타입)를 지향

<br>

## ✏️ 아이템 30: 문서에 타입 정보를 쓰지 않기
1. 타입 구문은 TS 타입 체커가 타입 정보를 동기화하도록 강제
2. 함수의 입력과 출력의 타입을 코드로 표현하는 것이 주석보다 더 나음
3. 값을 변경하지 않는다고 설명하는 주석 대신, readonly 사용
4. 변수명에 타입 정보 넣지 않기 (단위가 있는 숫자들은 제외)

<br>

## ✏️ 아이템 31: 타입 주변에 null 값 배치하기
1. 문제가 있는 예제
```ts
  // 최솟값이나 최댓값이 0인 경우
  // nums 배열이 비어있는 경우
   function extent(nums: number[]) {
     let min, max;
     
     for (const num of nums) {
       if (!min) {
         min = num;
         max = num;
       } else {
         min = Math.min(min, num);
         max = Math.max(max, num);
       }
     }
     
     return [min, max];
   }
```
   - min과 max를 한 객체 안에 넣고 null이거나 null이 아니게 하기
   ```ts
      function extent(nums: number[]) {
          let result: [number, number] | null = null;
        
          for (const num of nums) {
            if (!result) {
              result = [num, num];
            } else {
              result = [Math.min(num, result[0]), Math.max(num, result[1])];
            }
          }
        
          return [min, max];
      }
   ```
   - null과 null이 아닌 값을 섞어서 클래스 만들기
   ```ts
      class userPosts {
          user: UserInfo;
          posts: Post[];
      
          constructor(user: UserInfo, posts: Post[]) {
            this.user = user;
            this.posts = posts;
          }
      
          static async init(userId: string): Promise<UserPosts> {
            const [user, posts] = await Promise.all([
              fetchUser(userId),
              fetchPostsForUser(userId),
            ]);
            
            return new UserPosts(user, posts);
          }
      
          getUserName() {
            return this.user.name;
          }
      } 
   ```
2. 정리
   - 값들 중 null 여부에 따라, 다른 값이 암시적으로 null이 될 수있는 가능성을 두고 설계하면 안 됨
   - API 작성 시에는 반환 타입을 큰 객체로 만들고, 반환 타입 전체가 null 이거나 null이 아니게 만들어야 함
   - 클래스를 만들 때는 필요한 모든 값이 준비되었을 때, 생성하여 null이 존재하지 않도록 하는 것이 좋음

<br>

## ✏️ 아이템 32: 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기
1. 문제가 있는 예제
```ts
   interface Layer {
     layout: FillLayout | LineLayout | PointLayout;
     paint: FillPaint | LinePaint | PointPaint;
   }
```
→ 각각 타입의 계층을 분리된 인터페이스로 나누기
```ts
   interface FillLayer {
     type: "fill";
     layout: FillLayout;
     paint: FillPaint;
   }
   
   interface LineLayer {
     type: "line";
     layout: LineLayout;
     paint: LinePaint;
   }
   
   interface PointLayer {
     type: "point";
     layout: PointLayout;
     paint: PointPaint;
   }
   
   type Layer = FillLayer | LineLayer | PointLayer;
```
2. 태그드 유니온 사용(TS는 태그를 참고하여 범위를 좁힐 수 있음)
```ts
   function drawLayer(layer: Layer) {
     if (layer.type === 'fill') {
       const { paint } = layer; // 타입이 FillPaint
       const { layout } = layer; // 타입이 FillLayout
     } else // ...
```
3. 여러 개의 선택적 필드가 동시에 값이 있거나 동시에 undefined인 경우, 두 개의 속성을 하나의 객체로 모음
```ts
   interface Person {
     name: string;
     // birthPlace와 birthDate를 하나로 모음
     birth?: {
       place: string;
       date: Date;
     };
   }
```

<br>

## ✏️ 아이템 33: string 타입보다 더 구체적인 타입 사용하기
1. 좋지 못한 예시
```ts
   interface Album {
     artist: string;
     title: string;
     releaseDate: string;
     recordingType: string;
   }
```
2. 타입을 제한하거나, 유니온 타입을 사용하
```ts
   type RecordingType = "studio" | "live";
   
   interface Album {
     artist: string;
     title: string;
     releaseDate: Date;
     recordingType: RecordingType;
   }
```
3. 함수의 매개변수에 string을 잘못 사용하지 않도록 주의
```ts
   // 🚨 '{}' 형식에 인덱스 시그니처가 없으므로 요소에 암시적으로 'any' 형식이 있음
   function pluck(records: any[], key: string): any[] {
     return records.map((r) => r[key]);
   }
```
   - 제네릭과 `keyof`을 사용
   ```ts
      type K = keyof Album;
      
      // 이때 TS는 반환 타입을 추론함
      function pluck<T>(records: T[], key: keyof T) {
          return records.map((r) => r[key]);
      }
   ```
   - keyof T로 범위 더 좁힐 수 있음
   ```ts
      function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
         return records.map((r) => r[key]);
      }
   ```
   - 결과
   ```ts
      pluck(albums, "releaseDate"); // 타입이 Date[]
      pluck(albums, "artist"); // 타입이 string[]
      pluck(albums, "recordingType"); // 타입이 RecordingType[]
   ```





<br>

## 참고
- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc