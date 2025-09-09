import express, { Request, Response } from "express";
import cors from "cors";
import { convertCurrency } from "./convert";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const API_KEY = "cur_live_mmRid4Y48HO3fAnZKCNciJ9GXsvXrZe6PuSuElY1";

// Define a typed query interface (strings only)
interface ConvertQuery {
  value?: string;
  source?: string;
  target?: string;
}

// Route with typed query params
app.get(
  "/api/convert",
  async (req: Request<{}, {}, {}, ConvertQuery>, res: Response) => {
    const { value, source, target } = req.query;

    if (!value || !source || !target) {
      return res.status(400).json({ error: "Missing value, source, or target" });
    }

    try {
      const result = await convertCurrency(value, source, target, API_KEY);
      res.json(result);
    } catch (err: any) {
      if (err.message === "Target currency not found") {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
