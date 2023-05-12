import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multerMiddleware = (fields: string[]) => {
  return (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (err?: any) => void
  ) => {
    upload.any()(req as any, res as any, (err: any) => {
      if (err) {
        return next(err);
      }
      next();
    });
  };
};
