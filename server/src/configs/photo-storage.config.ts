import * as path from 'path';

import { diskStorage } from 'multer';
import { v4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads/photos',
    filename: (req, file, cb) => {
      const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + v4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${fileName}${extension}`);
    },
  }),
};
