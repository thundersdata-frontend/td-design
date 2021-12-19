import React, { useRef } from 'react';
import Container from '../components/Container';

import { Passcode } from '@td-design/react-native';
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
      <Button onPress={resetOTP} title="Reset" />
      <Button onPress={focusOTP} title="Focus" />
      <Button onPress={toggle} title="Toggle" />

      {fourDigit ? (
        <Passcode
          clearTextOnFocus
          onChange={handleChange}
          keyboardType="phone-pad"
          count={4}
          ref={otpRef}
          selectTextOnFocus={false}
        />
      ) : (
        <Passcode
          keyboardType="phone-pad"
          count={6}
          secureTextEntry={false}
          ref={otpRef}
          style={{ margin: 20 }}
          inputContainerStyle={{ borderWidth: 1, borderColor: 'green', borderRadius: 8 }}
          focusStyle={{ borderWidth: 1, borderColor: 'red' }}
        />
      )}
    </Container>
  );
}
