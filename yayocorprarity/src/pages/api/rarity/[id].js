import { NextApiRequest, NextApiResponse } from "next";
import rarityResults from "../../../data/rarityResults.json";

export default function handler(req, res) {
  req.statusCode = 200;
  console.log(req.query);
  res.send({
    id: rarityResults[req.query.id],
  });
}
