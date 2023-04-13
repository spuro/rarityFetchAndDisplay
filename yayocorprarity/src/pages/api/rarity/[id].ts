import { NextApiRequest, NextApiResponse } from "next";
const rarityResults: {
  [key: string]: number;
} = require("../../../data/rarityResults.json");

const scoreRankings: {
  id: number;
  value: number;
}[] = require("../../../data/scoreRankings.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.statusCode = 200;

  // Get the id from the query
  const { id } = req.query as { id: string };

  const rarity = rarityResults[id];
  const rank = scoreRankings.findIndex((r) => r.id === parseInt(id));

  if (rarity) {
    res.status(200).json({ rarity, rank });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
