/**
 * 使用RequestAnimationFrame实现setTimeout和setInterval
 * 代码来源：https://zhuanlan.zhihu.com/p/34868095
 */
type RAFType = 'interval' | 'timeout';
type RAFCallback = (...args: any[]) => void;

export default class RAF {
  private _timerIdMap: Record<RAFType, Record<symbol, number>>;

  constructor() {
    this._timerIdMap = {
      timeout: {},
      interval: {},
    };
  }
  run(type: RAFType = 'interval', cb: RAFCallback, interval = 16.7) {
    // 每16.7毫秒刷新一次（一帧）
    const now = Date.now;
    let startTime = now();
    let endTime = startTime;
    const timerSymbol = Symbol();
    const loop = () => {
      this.setIdMap(timerSymbol, type, loop);
      endTime = now();
      if (endTime - startTime >= interval) {
        if (type === 'interval') {
          startTime = now();
          endTime = startTime;
        }
        cb();
        type === 'timeout' && this.clearTimeout(timerSymbol);
      }
    };
    this.setIdMap(timerSymbol, type, loop);
    return timerSymbol;
  }
  setIdMap(timerSymbol: symbol, type: RAFType, loop: () => void) {
    const id = requestAnimationFrame(loop);
    this._timerIdMap[type][timerSymbol] = id;
  }
  setTimeout(cb: RAFCallback, interval: number) {
    return this.run('timeout', cb, interval);
  }
  clearTimeout(timer: symbol) {
    cancelAnimationFrame(this._timerIdMap.timeout[timer]);
  }
  setInterval(cb: RAFCallback, interval: number) {
    return this.run('interval', cb, interval);
  }
  clearInterval(timer: symbol) {
    cancelAnimationFrame(this._timerIdMap.interval[timer]);
  }
}
