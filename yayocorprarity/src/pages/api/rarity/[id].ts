import type { NextApiRequest, NextApiResponse } from "next";

import scoreRankings from "../../../data/scoreRankings.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  req.statusCode = 200;

  // Get the id from the query
  const { id } = req.query as { id: string };

  interface RarityData {
    [key: string]: {
      Background?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Eyes?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      "Hair Color"?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Head?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Item?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Mouth?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Outfit?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Skin?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      Vehicle?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      "Vehicle Color"?: {
        rarityScore: number;
        averageTraitOccurence?: number;
        occurence?: number;
        value: string;
      };
      totalscore?: {
        rarityScore: number;
        averageTraitOccurence: number;
      };
    };
  }

  const rarityResultsImport = await import("../../../data/rarityResults.json");

  const rarityResults = rarityResultsImport.default as {
    [key: string]: RarityData;
  };

  const rarity: RarityData = rarityResults[id];
  const rank: number = scoreRankings.findIndex((r) => r.id === parseInt(id));

  if (rarity) {
    res.status(200).json({ rarity, rank });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
