import fs from 'fs';
import path from 'path';
import dirname from './dirname.cjs';

const { __dirname } = dirname;

const fetchFileAsync = async (relativePath) => {
  const filePath = path.resolve(__dirname, `../../../public/${relativePath}`);
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(`파일 읽기 실패: ${relativePath}`, error);
    throw new Error(`파일을 읽을 수 없습니다: ${relativePath}`);
  }
};

export default fetchFileAsync;
