// convert.ts
export interface ConversionResult {
  source: string;
  target: string;
  value: number;
  rate: number;
  converted: string;
}

export async function convertCurrency(
  valueStr: string,
  source: string,
  target: string,
  apiKey: string
): Promise<ConversionResult> {
  if (!valueStr || !source || !target) {
    throw new Error("Missing value, source, or target");
  }

  const response = await fetch(
    `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${target}&base_currency=${source}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currency data");
  }

  const data = await response.json();

  // Extract the exchange rate safely
  const rate = data.data?.[target]?.value;
  if (!rate) {
    throw new Error("Target currency not found");
  }

  const converted = parseFloat(valueStr) * rate;

  return {
    source,
    target,
    value: parseFloat(valueStr),
    rate,
    converted: converted.toFixed(2),
  };
}
