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

### test/

- `test/pages/StartPage.test`: 게임 시작 페이지 테스트 (Jest)
- `test/pages/CompletePage.test`: 게임 완료 페이지 테스트 (Jest)
- `test/utils/api.test`: 쿼리 함수 호출 테스트 (Jest)

## 해결 전략

### 1. Webpack 환경 구성

- webpack-dev-server 환경 구성
- `npm run build`, `npm run start`, `npm run test`로 원하는 작업 수행
- start script에 hot reload 적용
- build script로 public 폴더에 js, css 파일 export

### 2. 라우팅 설정

- vanilla js로 라우팅 구현
- javascript의 history api로 라우팅 상태 관리
- 페이지 이동 버튼 클릭 시 `pushstate`로 URL 업데이트. URL은 이동하려는 다음 Url과 query를 함께 받음
- `location.pathname`을 이용해 URL 별로 페이지 분기
- 뒤로가기, 앞으로 가기 눌렀을 때) `popstate` 이벤트 발생하도록 적용

### 3. 단위 테스트 적용

- Jest 사용
- 크게 게임 화면, 게임 완료 화면, 유틸 함수 세 가지 테스트
- 테스트는 중요한 함수 (기능) 위주로 작성.
- DOM 조작의 경우 같은 html 코드 및 함수를 작성하여 테스트

### 4. 단어 가져오기

- async, await 함수로 주어진 API URL을 fetch 하도록 설정.
- 만약 fetch의 응답이 ok면, '단어 리스트'응답을 json으로 파싱해서 전달.
- 해당 단어 리스트는 초기 페이지(StartPage)를 렌더링 하기 전 미리 호출함

### 5. 게임 시작 / 게임 화면 구현

#### 게임 시작 전

- ##### 게임 시작 전 세팅:

  - 0. `fetch API`를 이용해 단어 목록 비동기 호출 (async, await)
  - 1. 변수 선언 및 html DOM 생성
  - 2. 점수는 단어 총 갯수로, 시간은 0분으로 초기화시킴. input 창은 disable 시키고 '게임 시작' 문구를 추가. '시작' 버튼은 active된 상태로 세팅
  - 3. 렌더링 함수 호출 시, Html element를 페이지에 append 시키고, 인풋 상자에 keydown 이벤트 추가. '시작' 버튼에는 click 이벤트 추가

- ##### 게임 시작:
  - 1. '시작' 버튼 클릭 시 start(게임 시작 여부) 상태를 true로 변경하고 해당 횟수 (count)에 맞는 단어/시간/총 점수를 화면에 보여줌. 그리고 해당 시간 기준으로 timer를 시작함
    - 만약 게임 도중에 '초기화' 버튼을 누르면 reset 함수 호출. 변수, css, html element 초기화 및 timer 초기화
  - 2. timer함수는 호출 스케쥴링을 사용 (setInterval, setTimeout).
  - 3. 시간이 만료되면 다음 게임으로 이동하고(nextGame) 점수(score)를 감점 시킴. 기존 타이머는 삭제하고 새로운 타이머 시작. 해당 스테이지의 시간은 total time에 추가하지 않는다.
  - 4. 시간 만료되기 전 올바른 단어를 입력하면,
    - 렌더링시에 등록한 input의 keyup 이벤트에 의해 'Enter'를 친 경우 input 창의 단어와, 현재 단어를 비교. 만약 답이 맞다면 score를 유지한 채 단어 맞춘 시간을 total time에 추가. 그리고 다음 게임 호출(nextGame)
  - 5. 시간 만료되기 전 올바른 틀린 단어를 입력하면 input창 클리어 후, 에러 박스 보이기
  - 6. 만약 모든 단어를 입력했다면, handleInput 함수에서 현재 스테이지와 총 단어 갯수를 비교한 후 '게임 완료' 페이지로 라우팅. 기존 타이머는 삭제. 라우팅을 할 때, 총 점수(score)와 문제 푸는데 걸린 총 시간(totalTime)을 같이 전달함

### 6. 완료 화면 구현

- routing에 query params로 점수 및 시간을 받음
  - utils/api에서 `getQuery`함수를 사용해 원하는 params의 값 추출 (점수, 총 시간)
- 받은 점수와 평균 시간(총 시간 / 점수)을 화면에 나타냄
- 다시 시작하기 버튼 클릭 시 메인페이지로 routing 됨

### 동작 gif

![typing-game gif](https://user-images.githubusercontent.com/72732446/159172495-808c141e-f581-4c35-806b-b527b4703b50.gif)

### 화면 사진 첨부

![typing-game init](https://user-images.githubusercontent.com/72732446/159170602-b9887a33-6357-44d4-ac2e-dcd1ff829498.png)

![typing-game start](https://user-images.githubusercontent.com/72732446/159170609-54384716-d819-40ec-bce0-51162ee5bb88.png)

![typing-game word](https://user-images.githubusercontent.com/72732446/159170629-ac41bcca-c918-4db8-a465-6d1f3035175d.png)

![typing-game error](https://user-images.githubusercontent.com/72732446/159170648-f91a9385-6ef7-48cd-a28b-292106956fb3.png)

![typing-game last](https://user-images.githubusercontent.com/72732446/159170671-ae0bb78b-3780-4f37-a9b7-84a28184e211.png)

![typing-game complete](https://user-images.githubusercontent.com/72732446/159170677-ee5956ca-65fa-4119-b310-46859e7baef7.png)

### test 사진 첨부

![jest test](https://user-images.githubusercontent.com/72732446/159337197-c2a1ce4a-0a35-4c48-8226-4298d0ee81c9.png)
