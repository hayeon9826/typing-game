/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _pages_StartPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _pages_CompletePage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function App({ $target }) {
  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = "";

    // pathname을 통해서 화면 routing
    if (pathname === "/") {
      new _pages_StartPage_js__WEBPACK_IMPORTED_MODULE_0__["default"]({ $target }).render();
    } else if (pathname === "/complete") {
      new _pages_CompletePage_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ $target }).render();
    }
  };

  (0,_utils_router_js__WEBPACK_IMPORTED_MODULE_2__.init)(this.route);
  this.route();
  window.addEventListener("popstate", this.route);
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StartPage)
/* harmony export */ });
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _utils_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


function StartPage({ $target }) {
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
    words = await (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_0__.request)();
  };

  // 게임 리셋 시켰을 때
  const reset = () => {
    // 변수 초기화
    count = 0;
    totalTime = 0;
    score = words.length;
    start = false;
    time = 0;
    // timer 초기화
    this.timerId && clearTimeout(this.timerId);
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
    score = words.length;
    time = words[count].second;
    timer();
    $input.disabled = false;
    $input.classList.remove("disable-input");
    $notice.style.display = "none";
    document.querySelector(".current-word").innerHTML = words[count].text;
    document.querySelector(".current-score").innerHTML = score;
  };

  // 단어 성공 시, 다음 단어 준비
  const nextGame = async () => {
    time = words[count].second;
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
        // 단어를 맞추면 사용한 시간 total time에 추가
        totalTime = totalTime + (words[count].second - time);
        // 마지막 단어일 때, 타이버 초기화 및 complete 페이지로 라우팅
        if (words.length === count + 1) {
          this.timerId && clearTimeout(this.timerId);
          (0,_utils_router__WEBPACK_IMPORTED_MODULE_1__.routeChange)("/complete", `?score=${score}&total=${totalTime}`);
        } else {
          // 단어 순서, 점수, 남은 시간, input창 업데이트 시키고, nextGame 호출
          count = count + 1;
          time = words[count].second;
          document.querySelector(".start-input").value = "";
          nextGame();
        }
      } else {
        // 단어가 맞지 않다면 에러 박스 보이기
        document.querySelector(".start-input").value = "";
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
      if (time > 1) {
        time--;
        document.querySelector(".current_count").innerHTML = time;
      } else {
        // 만약 남은 시간이 없다면 timer 리셋시키고, 점수 차감. 다음 단어 진행
        this.timerId && clearTimeout(this.timerId);
        score = score - 1;
        count = count + 1;
        nextGame();
      }
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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_URL": () => (/* binding */ API_URL),
/* harmony export */   "getQuery": () => (/* binding */ getQuery),
/* harmony export */   "getQueryTest": () => (/* binding */ getQueryTest),
/* harmony export */   "request": () => (/* binding */ request)
/* harmony export */ });
const API_URL =
  "https://my-json-server.typicode.com/kakaopay-fe/resources/words";

// 단어 목록 호출 api
const request = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("API 호출 실패");
  } catch (e) {
    console.log(e.message);
  }
};

// 쿼리 가져오는 함수
const getQuery = (name) => {
  const queryString = new URLSearchParams(location.search);
  return queryString.get(name);
};

// 쿼리 가져오는 함수 test
const getQueryTest = (name, urlString = "") => {
  const url = new URL(urlString);
  const queryString = new URLSearchParams(url.search);
  return queryString.get(name);
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "routeChange": () => (/* binding */ routeChange)
/* harmony export */ });
const CHANGE_ROUTE = "ROUTE_CHANGE";

const init = (onRouteChange) => {
  window.addEventListener(CHANGE_ROUTE, () => {
    onRouteChange();
  });
};

const routeChange = (url, query = "") => {
  window.history.pushState({}, url, window.location.origin + url + query);
  window.dispatchEvent(new CustomEvent(CHANGE_ROUTE));
};


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CompletePage)
/* harmony export */ });
/* harmony import */ var _utils_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



function CompletePage({ $target }) {
  // query로 점수 & 걸린 시간 가져오기
  const score = (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.getQuery)("score");
  const totalTime = (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.getQuery)("total");

  // html element 추가
  const $page = document.createElement("div");
  const $button = document.createElement("button");
  const $message = document.createElement("div");
  // html element 속성 추가
  $page.className = "complete-page";
  $button.className = "restart-button";
  $message.className = "final-message";
  $button.innerHTML = "다시 시작";
  $message.innerHTML = `<h2 class="title">Mission Complete!</h2>
  <h1 class="final-score">당신의 점수는 ${score}점 입니다.</h1>
  <b class="final-time">단어당 평균 답변 시간은 ${(
    parseFloat(totalTime) / parseFloat(score)
  ).toFixed(2)}초 입니다.</b>`;

  // 페이지에 element append
  $page.appendChild($message);
  $page.appendChild($button);

  // '다시 시작' 버튼에 click 리스너 추가 (메인으로 라우팅)
  $button.addEventListener("click", (e) => {
    (0,_utils_router__WEBPACK_IMPORTED_MODULE_0__.routeChange)("/", "");
  });

  // 렌더링 실행
  this.render = () => {
    $target.appendChild($page);
  };
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



new _src_App_js__WEBPACK_IMPORTED_MODULE_0__["default"]({ $target: document.querySelector(".App") });

})();

/******/ })()
;