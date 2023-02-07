export function calc(val: number, percent: string) {
  'worklet';
  try {
    const percentage = Number(percent.replace('%', '')) / 100;
    return val * percentage;
  } catch (error) {
    return val;
  }
}
