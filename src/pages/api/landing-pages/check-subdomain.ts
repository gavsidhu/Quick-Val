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
  const { subdomain } = req.body;

  try {
    const { data, error } = await supabaseAdmin
      .from("landing_pages")
      .select("subdomain")
      .eq("subdomain", subdomain);
    res.status(200).json({ data, error });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
}
