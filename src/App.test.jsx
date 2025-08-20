import "@testing-library/jest-dom";
import sum from "./sum";

test("Sum of two number ", () => {
  const result = sum(3, 4);
  expect(result).toBe(12);
});
