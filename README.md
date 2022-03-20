## 프로젝트 설명

- 타자 게임(typing game) 프로젝트
- 실서버 주소: https://typing-game-khy.vercel.app/

## 사용 스택

- Vanilla javascript
- Webpack, webpack-dev-server

## 로컬 실행

클론 후, 아래 명령어 입력. `localhost:9000` 접속

```
  npm i
  npm run build
  npm run start
```

## 구현된 기능

1. 초기 진입 시 게임 화면 표시
2. 게임 시작 및 초기화 버튼 구현
3. 게임 시작 시 남은 시간 및 점수 표시
4. input에 단어 입력 시 체크
5. 게임 완료 시 완료 페이지로 라우팅
6. 완료 페이지에서 점수 및 걸린 평균 시간 표시, 다시 시작 버튼 추가

## 파일별 설명

### src/App.js

- `src/App.js`: 메인 페이지. 라우팅으로 게임 시작/ 완료 페이지 구분

### src/pages

- `pages/StartPage`: 게임 시작 및 게임 페이지
- `pages/CompletePage`: 게임 완료 페이지

### public

- 빌드한 html, js, css 파일

## 해결 전략

### 사진 첨부

![typing-game init](https://user-images.githubusercontent.com/72732446/159170602-b9887a33-6357-44d4-ac2e-dcd1ff829498.png)

![typing-game start](https://user-images.githubusercontent.com/72732446/159170609-54384716-d819-40ec-bce0-51162ee5bb88.png)

![typing-game word](https://user-images.githubusercontent.com/72732446/159170629-ac41bcca-c918-4db8-a465-6d1f3035175d.png)

![typing-game error](https://user-images.githubusercontent.com/72732446/159170648-f91a9385-6ef7-48cd-a28b-292106956fb3.png)

![typing-game last](https://user-images.githubusercontent.com/72732446/159170671-ae0bb78b-3780-4f37-a9b7-84a28184e211.png)

![typing-game complete](https://user-images.githubusercontent.com/72732446/159170677-ee5956ca-65fa-4119-b310-46859e7baef7.png)
