import { NextResponse } from 'next/server';
import formidable, { Fields } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};
// Promisify formidable's parse method
const parseForm = (req: Request) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      // You may need to adjust other options here
    });

    // Pass the request body stream to formidable
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export async function POST(request: Request) {
  try {
    const { fields, files } = await parseForm(request);

    const avatar = (files?.avatar as File[] | undefined)?.[0];

    if (!avatar) {
      return NextResponse.json(
        { message: 'No file uploaded.' },
        { status: 400 }
      );
    }
    console.log(avatar);
    const oldPath = avatar.filepath;
    const newPath = path.join(formi.options.uploadDir, avatar.newFilename);
    fs.renameSync(oldPath, newPath);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'File upload failed.' },
      { status: 500 }
    );
  }
}
