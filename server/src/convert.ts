export {};

export function convertTemperature(
  value: number,               // must be a number
  from: "C" | "F" | "K",       // only these strings
  to: "C" | "F" | "K"          // only these strings
): number {                     // return type is number
  let celsius: number;

  // Normalize input to Celsius
  switch (from) {
    case "F":
      celsius = (value - 32) * (5 / 9);
      break;
    case "K":
      celsius = value - 273.15;
      break;
    case "C":
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case "F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    case "C":
    default:
      return celsius;
  }
}
