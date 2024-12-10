import fs from 'fs';
import path from 'path';
import dirname from './dirname.cjs';

const { __dirname } = dirname;
const PUBLIC_DIR = path.resolve(__dirname, '../../../public');

const fetchFile = (relativePath) => {
  // dirname기준
  const filePath = path.join(PUBLIC_DIR, relativePath);
  const data = fs.readFileSync(filePath, 'utf8');
  return data;
};

export default fetchFile;
