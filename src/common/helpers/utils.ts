import * as fs from 'fs';
import * as path from 'path';

const loadDataFromJSON = <T>(entity: string): T[] => {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(fileData);
  return jsonData[entity];
}

const generateID = (): string => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
}

export {
  generateID,
  loadDataFromJSON
}