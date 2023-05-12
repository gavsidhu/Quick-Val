import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    page,
    device,
    ip_address,
    time_spent,
    visit_time,
    country,
    http_referer,
    landing_page_id,
    user_id,
  } = req.body;
  try {
    const { error } = await supabaseAdmin.from("analytics").insert({
      page,
      device,
      ip_address,
      time_spent,
      visit_time,
      country,
      http_referer,
      landing_page_id,
      user_id,
    });
    if (error) {
      return res
        .status(200)
        .json({ message: "There was a problem inserting the data" });
    }
    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Server Error" });
  }
}
