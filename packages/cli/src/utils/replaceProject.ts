import fs from 'fs';
import path from 'path';

const binaryExtensions = ['.png', '.jar', '.webp', '.ttf', '.svg', '.bat', '.properties', '.keystore'];

/**
 * Copy a file to given destination, replacing parts of its contents.
 * @param srcPath Path to a file to be copied.
 * @param destPath Destination path.
 * @param replacements: e.g. {'TextToBeReplaced': 'Replacement'}
 */
export default function replaceProject(srcPath: string, destPath: string, replacements: Record<string, string>) {
  if (fs.lstatSync(srcPath).isDirectory()) {
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
    // Not recursive
    return;
  }

  const extension = path.extname(srcPath);
  if (binaryExtensions.indexOf(extension) === -1) {
    // Text file
    const srcPermissions = fs.statSync(srcPath).mode;
    let content = fs.readFileSync(srcPath, 'utf8');
    Object.keys(replacements).forEach(
      regex => (content = content.replace(new RegExp(regex, 'g'), replacements[regex]))
    );
    fs.writeFileSync(destPath, content, {
      encoding: 'utf8',
      mode: srcPermissions,
    });
  }
}
