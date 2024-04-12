import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import streamifier from "streamifier";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function runMiddleware(req: Request, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req: Request, res: NextApiResponse) {
  await runMiddleware(req, res, uploadMiddleware);
  const formData = await req.formData();
  const file = formData.get("file");
  const buffer = file ? await (file as Blob).arrayBuffer() : null;

  if (!buffer) {
    return NextResponse.json({ message: "No file provided" }, { status: 400 });
  }

  const urlImage = await new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "/livraria-paraiba/uploads" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) resolve(result.secure_url);
        }
      }
    );
    streamifier.createReadStream(Buffer.from(buffer)).pipe(stream);
  });

  if (!urlImage) {
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
  return NextResponse.json({ secure_url: urlImage }, { status: 200 });
}
