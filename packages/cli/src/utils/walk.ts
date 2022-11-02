import fs from 'fs';
import path from 'path';

('use strict');

export default function walk(current: string): string[] {
  if (!fs.lstatSync(current).isDirectory()) {
    return [current];
  }

  const files = fs.readdirSync(current).map(child => {
    child = path.join(current, child);
    return walk(child);
  });
  return [current].concat(...files);
}
