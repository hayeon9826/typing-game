## 프로젝트 설명

- 타자 게임(typing game) 프로젝트
- 실서버 주소: https://typing-game-khy.vercel.app/

## 사용 스택

- Vanilla javascript
- Webpack, webpack-dev-server
- jest

## 로컬 실행

- 클론 후, 아래 명령어 입력. `localhost:9000` 접속

```
  npm i
  npm run build
  npm run start
```

- 빌드 실행. 빌드 시 export 된 html, css, js 파일이 public 폴더에 생성됨

```
npm run build
```

- webpack-dev-server 실행. 로컬 서버 (localhost:9000)에서 실행된 화면 확인

```
npm run start
```

- Jest로 단위 테스트 실행. (게임 페이지, 게임 완료 페이지, util 함수)

```
npm run test
```

## 구현된 기능

1. 초기 진입 시 게임 화면 표시
2. 게임 시작 및 초기화 버튼 구현
3. 게임 시작 시 남은 시간 및 점수 표시
4. input에 단어 입력 시 체크
5. 게임 완료 시 완료 페이지로 라우팅
6. 완료 페이지에서 점수 및 걸린 평균 시간 표시, 다시 시작 버튼 추가
7. 그 외: 첫 화면 진입 시 인풋 disable, 단어 틀리면 에러 메세지 출력
8. Jest로 테스트 코드 작성

## 파일별 설명

### src/App.js

- `src/App.js`: 메인 페이지. 라우팅으로 게임 시작/ 완료 페이지 구분

### src/pages

- `pages/StartPage`: 게임 시작 및 게임 페이지
- `pages/CompletePage`: 게임 완료 페이지

### src/utils

- `utils/api`: 단어 가져오는 api, url에서 쿼리 추출 함수 구현
- `utils/router`: `history.pushState`으로 라우팅 구현

### public

- 빌드한 html, js, css 파일

## 해결 전략

### 1. Webpack 환경 구성

- webpack-dev-server 환경 구성
- `npm run build`, `npm run start`, `npm run test`로 원하는 작업 수행
- start script에 hot reload 적용
- build script로 public 폴더에 js, css 파일 export

### 2. 라우팅 설정

- vanilla js로 라우팅 구현
- javascript의 history api로 라우팅 상태 관리
- `popstate`로 뒤로가기/앞으로 가기 구현
- 버튼 클릭 시 `pushstate`로 페이지 이동

### 3. 단위 테스트 적용

- Jest 사용
- 크게 게임 화면, 게임 완료 화면, 유틸 함수 세 가지 테스트

### 4. 단어 가져오기

- async, await 함수로 주어진 api_url fetch
- 만약 fetch의 응답이 ok면, 응답을 json으로 파싱해서 전달.

### 5. 게임 시작 / 게임 화면 구현

#### 게임 시작 전

- 게임 시작 전 세팅:
- 게임 시작 함수 호출:

#### 게임 시작 후

- 타이머:
- 인풋창에 올바른 값을 넣고 Enter:
- 인풋창에 틀린 값을 넣고 Enter:
- 시간이 다 떨어졌을 때:
- 모든 단어를 다 맞췄을 때:
- 초기화 버튼:

### 6. 완료 화면 구현

- routing에 query params로 점수 및 시간을 받음
- 받은 점수와 시간을 화면에 나타냄
- 다시 시작하기 버튼 클릭 시 메인페이지로 routing됨

### 동작 gif

![typing-game gif](https://user-images.githubusercontent.com/72732446/159172495-808c141e-f581-4c35-806b-b527b4703b50.gif)

### 사진 첨부

![typing-game init](https://user-images.githubusercontent.com/72732446/159170602-b9887a33-6357-44d4-ac2e-dcd1ff829498.png)

![typing-game start](https://user-images.githubusercontent.com/72732446/159170609-54384716-d819-40ec-bce0-51162ee5bb88.png)

![typing-game word](https://user-images.githubusercontent.com/72732446/159170629-ac41bcca-c918-4db8-a465-6d1f3035175d.png)

![typing-game error](https://user-images.githubusercontent.com/72732446/159170648-f91a9385-6ef7-48cd-a28b-292106956fb3.png)

![typing-game last](https://user-images.githubusercontent.com/72732446/159170671-ae0bb78b-3780-4f37-a9b7-84a28184e211.png)

![typing-game complete](https://user-images.githubusercontent.com/72732446/159170677-ee5956ca-65fa-4119-b310-46859e7baef7.png)
