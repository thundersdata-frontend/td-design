import React, { useRef } from 'react';
import Container from '../components/Container';

import { Passcode, WhiteSpace, WingBlank } from '@td-design/react-native';
import { Button } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

export default function PasscodeDemo() {
  const otpRef = useRef<any>(null);
  const [s, setS] = useSafeState(true);
  const [fourDigit, setFourDigit] = useSafeState(false);

  const focusOTP = () => {
    otpRef.current?.focus();
  };

  const resetOTP = () => {
    otpRef.current?.reset();
  };

  const toggle = () => {
    setFourDigit(fourDigit => !fourDigit);
  };

  const handleChange = (code: string) => {
    console.log('currentCodeReturned', code, s);
    setS(s => !s);
  };

  return (
    <Container>
      <WingBlank>
        <Button onPress={resetOTP} title="Reset" />
        <WhiteSpace />
        <Button onPress={focusOTP} title="Focus" />
        <WhiteSpace />
        {/* <Button onPress={toggle} title="Toggle" />
        <WhiteSpace size="x4" /> */}

        {fourDigit ? (
          <Passcode
            clearTextOnFocus
            onChange={handleChange}
            keyboardType="phone-pad"
            count={6}
            ref={otpRef}
            selectTextOnFocus={false}
          />
        ) : (
          <Passcode
            secureTextEntry={true}
            ref={otpRef}
            style={{ margin: 20 }}
            inputContainerStyle={{ borderWidth: 1, borderColor: 'green' }}
            focusStyle={{ borderWidth: 1, borderColor: 'red' }}
            onFinish={() => console.log('222')}
          />
        )}
      </WingBlank>
    </Container>
  );
}
