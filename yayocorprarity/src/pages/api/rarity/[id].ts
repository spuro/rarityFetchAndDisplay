import { NextApiRequest, NextApiResponse } from "next";
import rarityResults from "../../../data/rarityResults.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.statusCode = 200;
  console.log(req.query);
  res.send({
    //@ts-ignore
    id: rarityResults[req.query.id],
  });
}
