export const fillOtpCode = (count: number, value?: string) => {
  const otpCode: { [key: string]: string } = {};
  for (let i = 0; i < count; i++) {
    otpCode[`${i}`] = value?.[i] || '';
  }
  return otpCode;
};
