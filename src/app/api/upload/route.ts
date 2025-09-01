import { NextResponse } from 'next/server';
import formidable, { Fields, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = formidable({
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  });

  try {
    const [, files] = await new Promise<[Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
          resolve([fields, files]);
        });
      }
    );

    // Type casting to ensure `image` is an array of `File`
    const uploadedFile = (files.image as File[])[0];
    // Check for a valid file
    if (!uploadedFile) {
      return NextResponse.json(
        { message: 'No file uploaded.' },
        { status: 400 }
      );
    }
    console.log('File name:', uploadedFile.originalFilename);

    if (!uploadedFile.originalFilename) {
      return NextResponse.json(
        { message: 'Invalid file name.' },
        { status: 400 }
      );
    }

    const newPath = path.join(
      process.cwd(),
      'public/uploads',
      uploadedFile.originalFilename
    );
    fs.renameSync(uploadedFile.filepath, newPath);

    return NextResponse.json({
      message: 'File uploaded successfully!',
      filePath: `/uploads/${uploadedFile.originalFilename}`,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'File upload failed.' },
      { status: 500 }
    );
  }
}
