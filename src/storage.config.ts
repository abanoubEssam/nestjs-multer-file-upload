import { diskStorage } from "multer";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';

export const storage = diskStorage({
    destination: join(process.cwd(), 'uploads'),
    filename: (req, file, callback) => {
        callback(null, generateFilename(file));
    },
});

function generateFilename(file) {
    console.log("🚀 ~ file: storage.config.ts ~ line 12 ~ generateFilename ~ file", file)
    return `${uuidv4()}-${file.originalname}`;
}
