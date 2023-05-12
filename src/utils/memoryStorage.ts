import { StorageEngine } from "multer";
import { Readable } from "stream";

class MemoryStorage implements StorageEngine {
  _handleFile(
    req: any,
    file: Express.Multer.File,
    callback: (error?: any, info?: Partial<Express.Multer.File>) => void
  ) {
    const stream = new Readable();

    stream.push(file.buffer);
    stream.push(null);

    file.stream = stream;

    callback(null, {
      buffer: file.buffer,
      stream: file.stream,
    });
  }

  _removeFile(
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null) => void
  ) {
    const fileWithOptionalBuffer = file as any;
    delete fileWithOptionalBuffer.buffer;
    delete fileWithOptionalBuffer.stream;

    callback(null);
  }
}

export function memoryStorage(): StorageEngine {
  return new MemoryStorage();
}
