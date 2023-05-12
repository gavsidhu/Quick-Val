import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Get all projects
      break;
    case "POST":
      // create a project
      const {
        title,
        description,
        content,
        subdomain,
        user_id,
        template_type,
        template_id,
        goal,
      } = req.body;
      try {
        const result = await supabaseAdmin.from("landing_pages").insert({
          title,
          description,
          subdomain,
          content,
          user_id,
          template_type,
          template_id,
          goal,
        });
        return res.status(200).send(result);
      } catch (error) {
        return res.status(500).send("Error creating project: ");
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
  res.status(200).json({ name: "John Doe" });
}
