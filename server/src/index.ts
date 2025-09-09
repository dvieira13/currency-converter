import express, { Request, Response } from "express";
import cors from "cors";
import { convertCurrency } from "./convert";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//need to strongly type API key value
const apiKey = process.env.CURRENCIES_API_KEY || "";

app.use(cors());
app.use(express.json());

// Define a typed query interface (strings only)
interface ConvertQuery {
  value?: string;
  source?: string;
  target?: string;
}

app.get(
  "/api/convert",
  async (req: Request<{}, {}, {}, ConvertQuery>, res: Response) => {
    const { value, source, target } = req.query;

    if (!value || !source || !target) {
      return res.status(400).json({ error: "Missing value, source, or target" });
    }


    if (!value || !source || !target) {
      return res.status(400).json({ error: "Missing value, source, or target" });
    }

    try {
      const result = await convertCurrency(value, source, target, apiKey);
      res.json(result);
    } catch (err: any) {
      if (err.message === "Target currency not found") {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
