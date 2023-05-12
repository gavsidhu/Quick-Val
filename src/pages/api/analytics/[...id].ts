import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

const updateAnalyticsData = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const { time_spent, end_time } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("analytics")
      .update({ time_spent, end_time })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error updating analytics data:", error);
    return res.status(500).json({ error: error });
  }
};

export default updateAnalyticsData;
