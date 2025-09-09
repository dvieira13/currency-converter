import { useState } from "react";
import dollar from "./assets/dollar.svg";
import euro from "./assets/euro.svg";
import franc from "./assets/franc.svg";
import lira from "./assets/lira.svg";
import pound from "./assets/pound.svg";
import ruble from "./assets/ruble.svg";
import rupee from "./assets/rupee.svg";
import yen from "./assets/yen.svg";
import yuan from "./assets/yuan.svg";
import "./App.css";

const currencies = [
  { abbreviation: "USD", name: "US Dollar", img_src: dollar },
  { abbreviation: "EUR", name: "Euro", img_src: euro },
  { abbreviation: "JPY", name: "Japanese Yen", img_src: yen },
  { abbreviation: "GBP", name: "British Pound", img_src: pound },
  { abbreviation: "CHF", name: "Swiss Franc", img_src: franc },
  { abbreviation: "INR", name: "Indian Rupee", img_src: rupee },
  { abbreviation: "RUB", name: "Russian Ruble", img_src: ruble },
  { abbreviation: "CNY", name: "Chinese Yuan", img_src: yuan },
  { abbreviation: "TRY", name: "Turkish Lira", img_src: lira },
];

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  // Track source and target currencies, both will have an 'abbreviation' value from the currencies array assigned to them
  // can be string or null. (null) makes null default
  const [sourceCurrency, setSourceCurrency] = useState<string | null>(null);
  const [targetCurrency, setTargetCurrency] = useState<string | null>(null);

  const resetConverter = () => {
    setInputValue("");
    setResult("");
    setSourceCurrency(null);
    setTargetCurrency(null);
  };

  const inputChangeEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleConversion = async () => {
    // Ensure both currencies and input are selected
    if (!sourceCurrency || !targetCurrency || !inputValue) {
      alert("Please select source, target, and enter a value.");
      return;
    }

    try {
      const res = await fetch(
        `/api/convert?value=${inputValue}&source=${sourceCurrency}&target=${targetCurrency}`
      );

      if (!res.ok) {
        // Handle 4xx/5xx responses
        const errData = await res.json();
        console.error("Backend error:", errData);
        alert(errData.error || "Failed to convert currency.");
        return;
      }

      const data = await res.json();

      // Update result in state
      setResult(data.converted);
      console.log("Conversion result:", data);
    } catch (err) {
      console.error("Network or fetch error:", err);
      alert("Unable to fetch conversion data.");
    }
  };

  const handleCurrencyClick = (abbr: string) => {
    if (!sourceCurrency) {
      // If no source selected yet → set source
      setSourceCurrency(abbr);
    } else if (sourceCurrency === abbr) {
      // Toggle off source if clicked again
      setSourceCurrency(null);
    } else if (!targetCurrency) {
      // If source is set (abbr != source, but source not null) but no target → set target
      setTargetCurrency(abbr);
    } else if (targetCurrency === abbr) {
      // Toggle off target if clicked again
      setTargetCurrency(null);
    } else {
      // Replace target if both already set
      setTargetCurrency(abbr);
    }
  };

  return (
    <>
      <h1>Currency Converter</h1>

      <div className="converter-container">
        <div className="currency-container">
          {currencies.map(({ abbreviation, name, img_src }) => {
            //check if current currency item being mapped is already set to the source_ state, 
            //if so, the className will get added to .currency item below
            const isSource = sourceCurrency === abbreviation;
            const isTarget = targetCurrency === abbreviation;

            return (
              <div
                key={abbreviation}
                className={`currency-item 
                  ${isSource ? "source-item" : ""} 
                  ${isTarget ? "target-item" : ""}`}
                onClick={() => handleCurrencyClick(abbreviation)}
              >
                <img
                  className="currency-icon"
                  src={img_src}
                  alt={`${abbreviation}-icon`}
                />
                <p className="caption-copy currency-label">{name}</p>
              </div>
            );
          })}
        </div>

        <div className="input-container">
          <div className="selection-label">
            <div className="currency-indicator"></div>
            <p className="body-copy">Source Currency</p>
          </div>
          <input
            name="converter-input"
            step="any"
            type="number"
            value={inputValue}
            onChange={inputChangeEvent}
            className="converter-input"
          />
        </div>

        <div className="result-container">
          <div className="selection-label">
            <div className="currency-indicator"></div>
            <p className="body-copy">Target Currency</p>
          </div>
          <h3 className="result">{result}</h3>
        </div>

        <button onClick={handleConversion} className="reset-button">
          Convert
        </button>

        <button onClick={resetConverter} className="reset-button">
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
