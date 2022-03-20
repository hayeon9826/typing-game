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

  // view 그리기
  const $page = document.createElement("div");
  const $flex = document.createElement("div");
  const $timerDiv = document.createElement("div");
  const $scoreDiv = document.createElement("div");
  const $div = document.createElement("div");
  const $input = document.createElement("input");
  const $notice = document.createElement("div");
  const $error = document.createElement("div");
  const $button = document.createElement("button");

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
  $flex.appendChild($timerDiv);
  $flex.appendChild($scoreDiv);

  // 함수 선언

  const fetchWords = async () => {
    words = await request();
  };

  const reset = () => {
    count = 0;
    totalTime = 0;
    score = 0;
    start = false;
    time = 0;
    this.timerId && clearTimeout(this.timerId);
    this.totalTimerId && clearTimeout(this.totalTimerId);
    $notice.style.display = "block";
    $input.disabled = true;
    $input.classList.add("disable-input");
    document.querySelector(".current-word").innerHTML = "";
    document.querySelector(".current_count").innerHTML = time;
    document.querySelector(".current-score").innerHTML = score;
    init();
  };

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

  const nextGame = async () => {
    this.timerId && clearTimeout(this.timerId);
    await timer();
    document.querySelector(".start-input").value = "";
    document.querySelector(".current-word").innerHTML = words[count].text;
    document.querySelector(".current-score").innerHTML = score;
  };

  const setStart = () => {
    start = !start;
    if (start) {
      startGame();
    } else {
      reset();
    }
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      $error.style.display = "none";
      if (document.querySelector(".start-input").value === words[count].text) {
        if (words.length === count + 1) {
          score = score + 1;
          this.totalTimerId && clearTimeout(this.totalTimerId);
          this.timerId && clearTimeout(this.timerId);
          routeChange("/complete", `?score=${score}&total=${totalTime}`);
        } else {
          count = count + 1;
          score = score + 1;
          time = words[count].second;
          nextGame();
          document.querySelector(".start-input").value === "";
        }
      } else {
        $error.style.display = "block";
      }
    }
  };

  const handleClick = (e) => {
    $button.innerHTML = !start ? "초기화" : "시작";
    if (start) {
      $button.classList.remove("disable");
    } else {
      $button.classList.add("disable");
    }
    setStart();
  };

  const timer = () => {
    document.querySelector(".current_count").innerHTML = time;
    this.timerId = setInterval(() => {
      // setInterval 함수를 변수에 담아 사용
      if (time > 0) {
        time--;
        document.querySelector(".current_count").innerHTML = time;
      } else {
        this.totalTimerId && clearTimeout(this.totalTimerId);
        this.timerId && clearTimeout(this.timerId);
        routeChange("/complete", `?score=${score}&total=${totalTime}`);
      }
    }, 1000);
  };

  const totalTimer = () => {
    this.totalTimerId = setInterval(() => {
      // setInterval 함수를 변수에 담아 사용
      totalTime++;
    }, 1000);
  };

  const init = () => {
    document.querySelector(".start-input").value = "";
    count = 0;
    this.timerId && clearTimeout(this.timerId);
    this.score = 0;
    this.time = 0;
    this.start = false;
  };

  const render = () => {
    $page.appendChild($flex);
    $page.appendChild($div);
    $page.appendChild($input);
    $page.appendChild($notice);
    $page.appendChild($error);
    $page.appendChild($button);
    $target.appendChild($page);
    document.addEventListener("keydown", handleInput);
    $button.addEventListener("click", handleClick);
  };

  this.render = async () => {
    await fetchWords();
    render();
  };
}
