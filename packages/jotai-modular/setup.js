jest.mock('react-native-background-timer', () => ({
  start() {},
  stop() {},
  setInterval(fn) {
    setInterval(() => {
      fn();
    }, 100);
  },
  setTimeout(fn) {
    setTimeout(() => {
      fn();
    }, 100);
  },
  clearInterval(timer) {
    clearInterval(timer);
  },
  clearTimeout(timer) {
    clearTimeout(timer);
  },
}));

jest.doMock('react-native', () => {
  return {
    Platform: {
      OS: 'ios',
      Version: 123,
      isTesting: true,
      select: objs => objs['ios'],
    },
  };
});
