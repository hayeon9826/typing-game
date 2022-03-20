const CHANGE_ROUTE = "ROUTE_CHANGE";

export const init = (onRouteChange) => {
  window.addEventListener(CHANGE_ROUTE, () => {
    onRouteChange();
  });
};

export const routeChange = (url, query = "") => {
  window.history.pushState({}, url, window.location.origin + url + query);
  window.dispatchEvent(new CustomEvent(CHANGE_ROUTE));
};
