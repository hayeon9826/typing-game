import { routeChange } from "../utils/router";
import { getQuery } from "../utils/api";

export default function CompletePage({ $target }) {
  const score = getQuery("score");
  const total = getQuery("total");

  const $page = document.createElement("div");
  const $button = document.createElement("button");
  const $message = document.createElement("div");
  $page.className = "complete-page";
  $button.className = "restart-button";
  $message.className = "final-message";

  $button.innerHTML = "다시 시작";
  $message.innerHTML = `<h2>Mission Complete!</h2>
  <h1>당신의 점수는 ${score}점 입니다.</h1>
  <b>단어당 평균 답변 시간은 ${(parseFloat(total) / parseFloat(score)).toFixed(
    2
  )}초 입니다.</b>`;
  $page.appendChild($message);
  $page.appendChild($button);

  this.render = () => {
    $target.appendChild($page);
  };

  $button.addEventListener("click", (e) => {
    routeChange("/", "");
  });
}
