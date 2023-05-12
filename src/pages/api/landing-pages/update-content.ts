import type { NextApiRequest, NextApiResponse } from "next";
import { multerMiddleware } from "@/utils/multerMiddleware";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PhysicalProductTemplateData } from "@/types/global";
import { physicalProductTemplateFields } from "@/constants/physicalProductTemplateData";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function updateContent(
  id: number,
  newUrls: { [key: string]: string },
  contentData: PhysicalProductTemplateData
) {
  const updatedContent = {
    ...contentData,
    heroImage: newUrls.heroImage || contentData.heroImage,
    featureTitle1: contentData.featureTitle1,
    featureDescription1: contentData.featureDescription1,
    featureImgUrl1: newUrls.featureImgUrl1 || contentData.featureImgUrl1,
    featureTitle2: contentData.featureTitle2,
    featureDescription2: contentData.featureDescription2,
    featureImgUrl2: newUrls.featureImgUrl2 || contentData.featureImgUrl2,
    featureTitle3: contentData.featureTitle3,
    featureDescription3: contentData.featureDescription3,
    featureImgUrl3: newUrls.featureImgUrl3 || contentData.featureImgUrl3,
  };

  const { data, error } = await supabaseAdmin
    .from("landing_pages")
    .update({ content: updatedContent })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating landing page:", error);
    return { success: false, error };
  } else {
    return { success: true, error: null, data };
  }
}

export default async function handler(
  req: NextApiRequest & { files: Express.Multer.File[] },
  res: NextApiResponse
) {
  const uploadMiddleware = multerMiddleware(
    // Pass an array of field names
    physicalProductTemplateFields.fields
      .filter((field) => field.type === "file")
      .map((field) => field.id)
  );

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error("Error in /api/landing-pages/update-content handler:", err);
      return res.status(500).send("Error processing request");
    }

    try {
      const contentData = JSON.parse(req.body.contentData);
      const id = parseInt(req.body.id);

      const imageFiles = Object.values(req.files)
        .flat()
        .reduce((acc: any, file: Express.Multer.File) => {
          const key = file.originalname.split(".")[0];
          acc[key] = {
            key,
            buffer: file.buffer,
            originalname: file.originalname,
            mimetype: file.mimetype,
          };
          return acc;
        }, {});

      const newUrls: { [key: string]: string } = {};

      await Promise.all(
        Object.values(imageFiles).map(async (image: any) => {
          const fileName = `${id}/${image.key}-${Date.now()}-${
            image.originalname
          }`;
          const { error: uploadError } = await supabaseAdmin.storage
            .from("images")
            .upload(fileName, image.buffer, {
              contentType: image.mimetype,
            });

          if (uploadError) {
            console.error("Error uploading image:", uploadError);
          } else {
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
            newUrls[image.key] = imageUrl;
          }
        })
      );

      const result = await updateContent(id, newUrls, contentData);
      return res.status(200).send(result);
    } catch (error) {
      console.error(
        "Error in /api/landing-pages/update-content handler:",
        error
      );
      return res.status(500).send("Error processing request");
    }
  });
}
