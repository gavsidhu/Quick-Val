import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const { landingPageId } = req.query;

  try {
    switch (method) {
      case "DELETE":
        await supabaseAdmin
          .from("landing_pages")
          .delete()
          .eq("id", parseInt(landingPageId as string));
        return res
          .status(200)
          .json({ message: "Landing page deleted successfully" });
      default:
        res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
