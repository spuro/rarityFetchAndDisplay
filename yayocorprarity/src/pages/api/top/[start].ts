import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  req.statusCode = 200;

  interface IScoreEntry {
    id: number;
    value: number;
  }

  const scoreRankingsDefault = await import("../../../data/scoreRankings.json");
  const scoreRankings = scoreRankingsDefault.default as IScoreEntry[];

  const { start } = req.query as { start: string };
  const returnData = scoreRankings.slice(parseInt(start), parseInt(start) + 10);

  res.send(returnData);
}
