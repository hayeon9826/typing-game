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

    if (pathname === "/") {
      new _pages_StartPage_js__WEBPACK_IMPORTED_MODULE_0__["default"]({ $target }).render();
    } else if (pathname === "/complete") {
      new _pages_CompletePage_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ $target }).render();
    }
  };

  (0,_utils_router_js__WEBPACK_IMPORTED_MODULE_2__.init)(this.route);
  this.route();
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

  // view 그리기
  const $page = document.createElement("div");
  const $flex = document.createElement("div");
  const $timerDiv = document.createElement("div");
  const $scoreDiv = document.createElement("div");
  const $div = document.createElement("div");
  const $input = document.createElement("input");
  const $error = document.createElement("div");
  const $button = document.createElement("button");

  $page.className = "start-page";
  $flex.className = "flex-div";
  $timerDiv.innerHTML = `<b>남은 시간: <span class="current_count">${time}</span>초</b>`;
  $scoreDiv.innerHTML = `<b>점수: <span class="current-score">${score}</span>점</b>`;
  $div.className = "word-div";
  $div.innerHTML = `<h1 class="current-word"></h1>`;
  $input.className = "start-input";
  $input.placeholder = "입력";
  $error.className = "error-box";
  $error.innerHTML = "틀렸습니다. 다시 입력해주세요.";
  $error.style.display = "none";
  $button.className = "start-button";
  $button.innerHTML = start ? "초기화" : "시작";
  $flex.appendChild($timerDiv);
  $flex.appendChild($scoreDiv);

  // 함수 선언

  const fetchWords = async () => {
    words = await (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_0__.request)();
  };

  const reset = () => {
    count = 0;
    totalTime = 0;
    score = 0;
    start = false;
    time = 0;
    this.timerId && clearTimeout(this.timerId);
    this.totalTimerId && clearTimeout(this.totalTimerId);
    document.querySelector(".current-word").innerHTML = "";
    document.querySelector(".current_count").innerHTML = time;
    init();
  };

  const startGame = () => {
    timer();
    totalTimer();
    time = words[count].second;
    words = words;
    document.querySelector(".current-word").innerHTML = words[count].text;
  };

  const nextGame = () => {
    this.timerId && clearTimeout(this.timerId);
    timer();
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
          (0,_utils_router__WEBPACK_IMPORTED_MODULE_1__.routeChange)(
            "/complete",
            `?score=${score}&average=${totalTime / score}`
          );
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
    this.timerId = setInterval(() => {
      // setInterval 함수를 변수에 담아 사용
      if (time > 0) {
        document.querySelector(".current_count").innerHTML = time;
        time--;
      } else {
        (0,_utils_router__WEBPACK_IMPORTED_MODULE_1__.routeChange)("/complete", `?score=${score}&average=${3}`);
        clearInterval(timer);
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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQuery": () => (/* binding */ getQuery),
/* harmony export */   "request": () => (/* binding */ request)
/* harmony export */ });
const API_URL =
  "https://my-json-server.typicode.com/kakaopay-fe/resources/words";

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

const getQuery = (name) => {
  const queryString = new URLSearchParams(location.search);
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
  const score = (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.getQuery)("score");
  const average = (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.getQuery)("average");

  const $page = document.createElement("div");
  const $button = document.createElement("button");
  const $message = document.createElement("div");
  $page.className = "complete-page";
  $button.className = "restart-button";
  $message.className = "final-message";

  $button.innerHTML = "다시 시작";
  $message.innerHTML = `<h2>Mission Complete!</h2>
  <h1>당신의 점수는 ${score}점 입니다.</h1>
  <b>단어당 평균 답변 시간은 ${parseFloat(average).toFixed(2)}초 입니다.</b>`;
  $page.appendChild($message);
  $page.appendChild($button);

  this.render = () => {
    $target.appendChild($page);
  };

  $button.addEventListener("click", (e) => {
    (0,_utils_router__WEBPACK_IMPORTED_MODULE_0__.routeChange)("/");
  });
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 7 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 8 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 9 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 12 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 13 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".App {\n  max-width: 500px;\n  margin: 0 auto;\n  text-align: center;\n  padding-top: 100px;\n}\n\n.start-button {\n  width: 25%;\n  margin-top: 32px;\n  background-color: #0aa2ff;\n  color: #fff;\n  font-size: 1.2rem;\n  border: 1px solid #40a9ff;\n  padding: 10px;\n}\n\n.flex-div {\n  display: flex;\n  justify-content: space-between;\n  width: 50%;\n  margin: 0 auto;\n  padding-bottom: 10px;\n}\n\n.start-input {\n  display: block;\n  margin: 0 auto;\n  border-radius: 10px;\n  background-color: #0aa2ff;\n  border: none;\n  height: 40px;\n  color: white;\n  width: 50%;\n  text-align: center;\n  font-size: 1.2rem;\n}\n\n.start-input::placeholder {\n  color: white;\n}\n\n.restart-button {\n  width: 50%;\n  margin-top: 32px;\n  background-color: #0aa2ff;\n  color: #fff;\n  font-size: 1.2rem;\n  padding: 10px;\n  border: none;\n}\n\n.error-box {\n  color: red;\n  font-size: 12px;\n  margin-top: 10px;\n}\n\n.final-message {\n  line-height: 40px;\n}\n\n.start-page {\n  margin-top: 36px;\n}\n\n.disable {\n  background-color: gray;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 14 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 15 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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