import { useState } from "react";
import right_arrow from "./assets/right_arrow.svg";
import "./App.css";

// Define all conversion pairs
const conversions = [
  { from: "Fahrenheit", to: "Celsius" },
  { from: "Fahrenheit", to: "Kelvin" },
  { from: "Celsius", to: "Kelvin" },
  { from: "Celsius", to: "Fahrenheit" },
  { from: "Kelvin", to: "Celsius" },
];

// Map full names to backend codes
const unitCodes: { [key: string]: string } = {
  Fahrenheit: "F",
  Celsius: "C",
  Kelvin: "K",
};

function App() {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    from: string,
    to: string
  ) => {
    const newValue = e.target.value;
    const key = `${from}-${to}`;

    setValues((prev) => ({ ...prev, [key]: newValue }));

    if (newValue === "") {
      setResults((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    try {
      const res = await fetch(
        `/api/convert?value=${newValue}&from=${unitCodes[from]}&to=${unitCodes[to]}`
      );
      const data = await res.json();

      if (data.output !== undefined) {
        setResults((prev) => ({
          ...prev,
          [key]: data.output.toFixed(2),
        }));
      } else {
        setResults((prev) => ({ ...prev, [key]: "Invalid" }));
      }
    } catch (err) {
      console.error(`Error converting ${from}→${to}`, err);
      setResults((prev) => ({ ...prev, [key]: "Error" }));
    }
  };

  return (
    <>
      <h1>Temperature Converter</h1>

      <div className="converter-container">
        {conversions.map(({ from, to }) => {
          const key = `${from}-${to}`;
          return (
            <div className="converter-row" key={key}>
              <div className="input-container">
                <input
                  name={`${key}-input`}
                  step="any"
                  type="number"
                  value={values[key] ?? ""}
                  onChange={(e) => handleChange(e, from, to)}
                  className="temp-input"
                />
                <p className="body-copy">{from}</p>
              </div>
              <img
                className="conversion-icon"
                src={right_arrow}
                alt="right arrow"
              />
              <div className="result-container">
                <h3 className="result">{results[key] ?? ""}</h3>
                <p className="body-copy">{to}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
