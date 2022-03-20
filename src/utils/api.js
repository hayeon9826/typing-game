const API_URL =
  "https://my-json-server.typicode.com/kakaopay-fe/resources/words";

export const request = async () => {
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

export const getQuery = (name) => {
  const queryString = new URLSearchParams(location.search);
  return queryString.get(name);
};
