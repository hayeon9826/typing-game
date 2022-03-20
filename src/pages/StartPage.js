import { request } from "../utils/api.js";
import { routeChange } from "../utils/router";
export default function StartPage({ $target }) {
  // 변수 선언
  let start = false;
  let words = [];
  let time = 0;
  let totalTime = 0;
  let count = 0;
  let score = 0;

  // html element 추가
  const $page = document.createElement("div");
  const $flex = document.createElement("div");
  const $timerDiv = document.createElement("div");
  const $scoreDiv = document.createElement("div");
  const $div = document.createElement("div");
  const $input = document.createElement("input");
  const $notice = document.createElement("div");
  const $error = document.createElement("div");
  const $button = document.createElement("button");
  // html element 속성 추가
  $page.className = "start-page";
  $flex.className = "flex-div";
  $timerDiv.innerHTML = `<b>남은 시간: <span class="current_count">${time}</span>초</b>`;
  $scoreDiv.innerHTML = `<b>점수: <span class="current-score">${score}</span>점</b>`;
  $div.className = "word-div";
  $div.innerHTML = `<h1 class="current-word"></h1>`;
  $input.className = "start-input disable-input";
  $input.disabled = true;
  $input.placeholder = "입력";
  $notice.className = "notice-box";
  $notice.innerHTML = "[시작] 버튼을 눌러 게임을 시작해주세요.";
  $error.className = "error-box";
  $error.innerHTML = "틀렸습니다. 다시 입력해주세요.";
  $error.style.display = "none";
  $button.className = "start-button";
  $button.innerHTML = start ? "초기화" : "시작";

  // 페이지에 element append
  $flex.appendChild($timerDiv);
  $flex.appendChild($scoreDiv);
  $page.appendChild($flex);
  $page.appendChild($div);
  $page.appendChild($input);
  $page.appendChild($notice);
  $page.appendChild($error);
  $page.appendChild($button);

  // 함수 선언
  // api로 단어 목록 가져오기
  const fetchWords = async () => {
    words = await request();
  };

  // 게임 리셋 시켰을 때
  const reset = () => {
    // 변수 초기화
    count = 0;
    totalTime = 0;
    score = 0;
    start = false;
    time = 0;
    // timer 초기화
    this.timerId && clearTimeout(this.timerId);
    this.totalTimerId && clearTimeout(this.totalTimerId);
    // css 초기화
    $notice.style.display = "block";
    $input.disabled = true;
    $input.classList.add("disable-input");
    // element 초기화
    document.querySelector(".start-input").value = "";
    document.querySelector(".current-word").innerHTML = "";
    document.querySelector(".current_count").innerHTML = time;
    document.querySelector(".current-score").innerHTML = score;
  };

  // 게임 시작했을 때
  const startGame = () => {
    words = words;
    time = words[count].second;
    timer();
    totalTimer();
    $input.disabled = false;
    $input.classList.remove("disable-input");
    $notice.style.display = "none";
    document.querySelector(".current-word").innerHTML = words[count].text;
  };

  // 단어 성공 시, 다음 단어 준비
  const nextGame = async () => {
    this.timerId && clearTimeout(this.timerId);
    await timer();
    document.querySelector(".start-input").value = "";
    document.querySelector(".current-word").innerHTML = words[count].text;
    document.querySelector(".current-score").innerHTML = score;
  };

  // '시작' 버튼 눌렀을 때
  const setStart = () => {
    start = !start;
    if (start) {
      startGame();
    } else {
      reset();
    }
  };

  // input창 변동 시 작동
  const handleInput = (e) => {
    // 만약 엔터를 눌렀을 때 input 값과 현재 단어 비교 후 처리
    if (e.key === "Enter") {
      if (document.querySelector(".start-input").value === words[count].text) {
        // 에러 박스 없애기
        $error.style.display = "none";
        // 마지막 단어일 때, 타이버 초기화 및 complete 페이지로 라우팅
        if (words.length === count + 1) {
          score = score + 1;
          this.totalTimerId && clearTimeout(this.totalTimerId);
          this.timerId && clearTimeout(this.timerId);
          routeChange("/complete", `?score=${score}&total=${totalTime}`);
        } else {
          // 단어 순서, 점수, 남은 시간, input창 업데이트 시키고, nextGame 호출
          count = count + 1;
          score = score + 1;
          time = words[count].second;
          document.querySelector(".start-input").value === "";
          nextGame();
        }
      } else {
        // 단어가 맞지 않다면 에러 박스 보이기
        $error.style.display = "block";
      }
    }
  };

  // 게임 시작, 초기화 버튼 클릭시 동작
  const handleClick = (e) => {
    $button.innerHTML = !start ? "초기화" : "시작";
    if (start) {
      $button.classList.remove("disable");
    } else {
      $button.classList.add("disable");
    }
    // start 변수에 따라서 초기화인지(reset) 시작인지 (startGame) 구분
    setStart();
  };

  // 남은 시간 타이머
  const timer = () => {
    // 타이머 호출 시 우선 현재 시간 화면에 표시
    document.querySelector(".current_count").innerHTML = time;
    this.timerId = setInterval(() => {
      // setInterval 함수를 변수에 담아 사용.
      // 0초 이상일 때 1초씩 감소. 변화한 time 값을 화면에 노출
      if (time > 0) {
        time--;
        document.querySelector(".current_count").innerHTML = time;
      } else {
        // 만약 남은 시간이 없다면 totalTimer, timer 모두 리셋시키고, complete 페이지로 라우팅
        this.totalTimerId && clearTimeout(this.totalTimerId);
        this.timerId && clearTimeout(this.timerId);
        routeChange("/complete", `?score=${score}&total=${totalTime}`);
      }
    }, 1000);
  };

  // 총 걸린 시간 타이머
  const totalTimer = () => {
    this.totalTimerId = setInterval(() => {
      // setInterval 함수를 변수에 담아 사용
      totalTime++;
    }, 1000);
  };

  // 렌더링 함수
  const render = () => {
    $target.appendChild($page);
    // input에 keydown 리스너 추가 (인풋 변경시 확인)
    $input.addEventListener("keydown", handleInput);
    // 시작/초기화 버튼에 click 리스너 추가
    $button.addEventListener("click", handleClick);
  };

  this.render = async () => {
    // 우선 단어 가져오고 렌더링 시작
    await fetchWords();
    render();
  };
}
