import { writeFile } from 'fs/promises';
import path from 'node:path';
import { mkdir } from 'fs/promises';

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const ALLOWED_MIME_PREFIXES = [
      'image/',
      'video/',
      'audio/'
    ];
    const file = data.get('file');
    if (!file) {
      return { success: false, error: "No file provided" };
    }
    const mimeType = file.type;

    const isValidMimeType = ALLOWED_MIME_PREFIXES.some(prefix => mimeType.startsWith(prefix));

    if (!isValidMimeType) {
      return { success: false, error: "No" };
    }

    
    const fileName = makeid(4) + path.extname(`${file.name}`);

    const staticDir = path.join(process.cwd(), 'static');
    const filePath = path.join(staticDir, fileName);

    await mkdir(staticDir, { recursive: true });


    await writeFile(filePath, new Uint8Array(await file.arrayBuffer()));

    return { success: true, message: `File uploaded to nemo.fyle.uk/${fileName}!` };
  }
};
