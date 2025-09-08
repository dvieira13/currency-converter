import express, { Request, Response } from "express";
import cors from "cors";
import { convertTemperature } from "./convert";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/convert", (req: Request, res: Response) => {
  const value = req.query.value as string | undefined;
  const from = req.query.from as "C" | "F" | "K" | undefined;
  const to = req.query.to as "C" | "F" | "K" | undefined;

  if (!value || !from || !to || isNaN(parseFloat(value))) {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  const numValue = parseFloat(value);
  const result = convertTemperature(numValue, from, to);

  res.json({ from, to, input: numValue, output: result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
