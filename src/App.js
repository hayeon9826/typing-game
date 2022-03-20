import StartPage from "./pages/StartPage.js";
import CompletePage from "./pages/CompletePage.js";
import { init } from "./utils/router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = "";

    if (pathname === "/") {
      new StartPage({ $target }).render();
    } else if (pathname === "/complete") {
      new CompletePage({ $target }).render();
    }
  };

  init(this.route);
  this.route();
}
