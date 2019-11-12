/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-23 10:45:55
 * @LastEditors: 廖军
 * @LastEditTime: 2019-11-08 11:17:16
 */
/**
 * 使用RequestAnimationFrame实现setTimeout和setInterval
 * 代码来源：https://zhuanlan.zhihu.com/p/34868095
 */
interface TimerIdMap {
  timeout: object;
  interval: object;
}

export default class RAF {
  private _timerIdMap: TimerIdMap;

  public constructor() {
    this._timerIdMap = {
      timeout: {},
      interval: {},
    };
  }

  private run(type = 'interval', cb: () => void, interval = 16.7) {
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

  private setIdMap(timerSymbol: symbol, type: string, loop: (time: number) => void) {
    const id = requestAnimationFrame(loop);
    this._timerIdMap[type][timerSymbol] = id;
  }

  public setTimeout(cb: () => void, interval: number) {
    return this.run('timeout', cb, interval);
  }

  public clearTimeout(timer: symbol) {
    cancelAnimationFrame(this._timerIdMap.timeout[timer]);
  }

  public setInterval(cb: () => void, interval: number) {
    return this.run('interval', cb, interval);
  }

  public clearInterval(timer: symbol) {
    cancelAnimationFrame(this._timerIdMap.interval[timer]);
  }
}
