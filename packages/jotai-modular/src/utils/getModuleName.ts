export default function getModuleName(str: string) {
  const regex = /\(([^()]+)\)/g;
  let result = '';
  let r;
  while ((r = regex.exec(str))) {
    result = r[1];
  }
  return result;
}
