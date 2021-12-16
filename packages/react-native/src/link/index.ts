import { Linking, Platform } from 'react-native';

export type LinkType = 'email' | 'phone' | 'sms' | 'url' | 'settings';

export default {
  email(address: string) {
    Linking.openURL('mailto:' + address);
  },
  settings() {
    Linking.openSettings();
  },
  async url(url: string) {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    }
  },
  sms(phoneNumber: string) {
    Linking.openURL('sms:' + phoneNumber);
  },
  call(phoneNumber: string) {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:' + phoneNumber);
    } else {
      Linking.openURL('telprompt:' + phoneNumber);
    }
  },
};
