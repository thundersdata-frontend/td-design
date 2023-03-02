jest.mock('react-native', () => {
  return {
    Platform: {
      OS: 'ios',
      Version: 123,
      isTesting: true,
      select: objs => objs['ios'],
    },
    BackHandler: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    AccessibilityInfo: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      isBoldTextEnabled: jest.fn(),
      isGrayscaleEnabled: jest.fn(),
      isInvertColorsEnabled: jest.fn(),
      isReduceMotionEnabled: jest.fn(),
      isReduceTransparencyEnabled: jest.fn(),
      isScreenReaderEnabled: jest.fn(),
    },
    AppState: {
      currentState: 'mock-currentState',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    Keyboard: {
      emit: jest.fn(),
      addListener: jest.fn(),
    },
  };
});
