import { convertTemperature } from "../src/convert.js";

describe("convertTemperature", () => {

  // Celsius → Fahrenheit
  it("should convert 0°C to 32°F", () => {
    const result = convertTemperature(0, "C", "F");
    expect(result).toBeCloseTo(32);
  });

  // Celsius → Kelvin
  it("should convert 100°C to 373.15K", () => {
    const result = convertTemperature(100, "C", "K");
    expect(result).toBeCloseTo(373.15);
  });

  // Fahrenheit → Celsius
  it("should convert 212°F to 100°C", () => {
    const result = convertTemperature(212, "F", "C");
    expect(result).toBeCloseTo(100);
  });

  // Fahrenheit → Kelvin
  it("should convert 32°F to 273.15K", () => {
    const result = convertTemperature(32, "F", "K");
    expect(result).toBeCloseTo(273.15);
  });

  // Kelvin → Celsius
  it("should convert 0K to -273.15°C", () => {
    const result = convertTemperature(0, "K", "C");
    expect(result).toBeCloseTo(-273.15);
  });

  // Kelvin → Fahrenheit
  it("should convert 273.15K to 32°F", () => {
    const result = convertTemperature(273.15, "K", "F");
    expect(result).toBeCloseTo(32);
  });

  // Negative Celsius → Fahrenheit
  it("should convert -40°C to -40°F", () => {
    const result = convertTemperature(-40, "C", "F");
    expect(result).toBeCloseTo(-40);
  });

  // Negative Fahrenheit → Celsius
  it("should convert -40°F to -40°C", () => {
    const result = convertTemperature(-40, "F", "C");
    expect(result).toBeCloseTo(-40);
  });

  // Decimal conversion
  it("should convert 36.6°C to 97.88°F", () => {
    const result = convertTemperature(36.6, "C", "F");
    expect(result).toBeCloseTo(97.88, 2);
  });

  // Same unit conversion
  it("should return the same value if from and to units are identical", () => {
    const resultC = convertTemperature(25, "C", "C");
    const resultF = convertTemperature(77, "F", "F");
    const resultK = convertTemperature(300, "K", "K");

    expect(resultC).toBe(25);
    expect(resultF).toBe(77);
    expect(resultK).toBe(300);
  });

});
