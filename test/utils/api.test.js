import { getQueryTest } from "../../src/utils/api.js";

describe("getQuery 테스트", () => {
  test("getQuery 호출 테스트", async () => {
    const url = "http://localhost:9000?foo=1&bar=2";
    expect(getQueryTest("foo", url)).toBe("1");
    expect(getQueryTest("bar", url)).toBe("2");
  });
});
