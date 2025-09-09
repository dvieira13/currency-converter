import { convertCurrency } from "../src/convert";

// Mock fetch globally
(global as any).fetch = jasmine.createSpy("fetch");

const API_KEY = "test_api_key";

describe("convertCurrency", () => {
  beforeEach(() => {
    (global as any).fetch.calls.reset();
  });

  it("throws error if params are missing", async () => {
    await expectAsync(
      convertCurrency("", "USD", "EUR", API_KEY)
    ).toBeRejectedWithError("Missing value, source, or target");
  });

  it("returns correct conversion result with mocked rate", async () => {
    (global as any).fetch.and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              EUR: { value: 2 },
            },
          }),
      })
    );

    const result = await convertCurrency("10", "USD", "EUR", API_KEY);

    expect(result.source).toBe("USD");
    expect(result.target).toBe("EUR");
    expect(result.value).toBe(10);
    expect(result.rate).toBe(2);
    expect(result.converted).toBe("20.00");
  });

  it("throws error if target currency is not found", async () => {
    (global as any).fetch.and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: {} }),
      })
    );

    await expectAsync(
      convertCurrency("5", "USD", "ZZZ", API_KEY)
    ).toBeRejectedWithError("Target currency not found");
  });
});
