import authzUtils from './index';
const { 
  passwordLoginWithUsername,
  passwordLoginWithPhone,
  faceLogin,
  smsLogin,
  passwordRegister,
  smsRegister,
  sendSmsCode,
  resetPassword,
  updatePassword,
 } = authzUtils;
import http from '../request';

describe('测试authzUtils', () => {
  it('passwordLoginWithUsername-1：可以正常登录', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      result: {
        access_token: '8888888'
      },
      code: 20000,
      msg: '提交成功',
    });

    const response = await passwordLoginWithUsername({
      username: '张三',
      password: 'h12345678',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
    expect(response.result.access_token).toHaveLength;
  });

  it('passwordLoginWithUsername-2：密码错误提示密码不匹配', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: {
        error: "invalid_grant",
      },
      code: 40008,
      msg: '密码不匹配',
    });

    const response = await passwordLoginWithUsername({
      username: '张三',
      password: 'h123',
    });
    expect(response.success).toBeFalsy();
  });

  it('passwordLoginWithPhone-1：可以正常登录', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      result: {
        access_token: '8888888'
      },
      code: 20000,
      msg: '提交成功',
    });

    const response = await passwordLoginWithPhone({
      phone: '18895308793',
      password: 'h12345678',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
    expect(response.result.access_token).toHaveLength;
  });

  it('passwordLoginWithPhone-2：登录失败提示密码不匹配', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: {
        error: "invalid_grant",
      },
      code: 40008,
      msg: '密码不匹配',
    });

    const response = await passwordLoginWithPhone({
      phone: '18895308793',
      password: 'h123',
    });
    expect(response.success).toBeFalsy();
  });

  it('faceLogin-1：可以正常登录', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      result: {
        access_token: '8888888'
      },
      code: 20000,
      msg: '提交成功',
    });

    const response = await faceLogin({
      client: 0,
      face: '/9j/4AAQSkZJRgABAQAAAQABAAD/4',
      identification: '192.168.0.1',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
    expect(response.result.access_token).toHaveLength;
  });

  it('faceLogin-2：登录失败提示人脸识别失败', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: {
        error: "invalid_grant",
      },
      code: 40008,
      msg: '人脸识别失败',
    });

    const response = await faceLogin({
      client: 0,
      face: '/9j/4AAQSkZJRgABAQAAAQABAAD/4',
      identification: '192.168.0.1',
    });
    expect(response.success).toBeFalsy();
  });

  it('smsLogin-1：可以正常登录', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      result: {
        access_token: '8888888'
      },
      code: 20000,
      msg: '提交成功',
    });

    const response = await smsLogin({
      phone: '18895308793',
      code: '223567',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
    expect(response.result.access_token).toHaveLength;
  });

  it('smsLogin-2：登录失败提示验证码不匹配', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: {
        error: "invalid_grant",
      },
      code: 40008,
      msg: '验证码不匹配',
    });

    const response = await smsLogin({
      phone: '18895308793',
      code: '000000',
    });
    expect(response.success).toBeFalsy();
  });

  it('passwordRegister-1：可以正常注册', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      result: {
        access_token: '8888888'
      },
      code: 20000,
      msg: '提交成功',
    });

    const response = await passwordRegister({
      username: '张三',
      password: 'h12345678',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
    expect(response.result.access_token).toHaveLength;
  });

  it('passwordRegister-2：提示用户已存在', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: {
        error: "invalid_grant",
      },
      code: 40008,
      msg: '用户已存在',
    });

    const response = await passwordRegister({
      username: '李四',
      password: 'h12345678',
    });
    expect(response.success).toBeFalsy();
  });

  it('smsRegister-1：可以正常注册', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      result: {
        access_token: '8888888'
      },
      code: 20000,
      msg: '提交成功',
    });

    const response = await smsRegister({
      mobile: '18895308793',
      password: 'h12345678',
      verification_code: '111111',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
    expect(response.result.access_token).toHaveLength;
  });

  it('smsRegister-2：用户已存在', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: {
        error: "invalid_grant",
      },
      code: 40008,
      msg: '用户已存在',
    });

    const response = await smsRegister({
      mobile: '18895308793',
      password: 'h12345678',
      verification_code: '111111',
    });
    expect(response.success).toBeFalsy();
  });

  it('sendSmsCode-1：可以正常发送', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      code: 20000,
      result: null,
      msg: '发送成功',
    });

    const response = await sendSmsCode({
      mobile: '18895308793',
      type: 0,
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
  });

  it('sendSmsCode-2：发送验证码太频繁', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      result: null,
      code: 40008,
      msg: '发送验证码太频繁，请一分钟后再试',
    });

    const response = await sendSmsCode({
      mobile: '18895308793',
      type: 0,
    });
    expect(response.success).toBeFalsy();
  });

  it('resetPassword-1：密码重置成功', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      code: 20000,
      result: null,
      msg: '操作成功',
    });

    const response = await resetPassword({
      phone: '18895308793',
      newPassword: 'h12345678',
      verificationCode: '222222',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
  });

  it('resetPassword-2：密码重置失败', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      code: 40008,
      result: null,
      msg: '密码重置失败',
    });

    const response = await resetPassword({
      phone: '18895308793',
      newPassword: 'h12345678',
      verificationCode: '222222',
    });
    expect(response.success).toBeFalsy();
  });

  it('updatePassword-1：密码修改成功', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: true,
      code: 20000,
      result: null,
      msg: '修改成功',
    });

    const response = await updatePassword({
      access_token: '56tg890ybb688h900gh5g',
      newPassword: 'h12345678',
      oldPassword: '123123',
    });
    expect(response.success).toBeTruthy();
    expect(response.code).toBe(20000);
  });

  it('updatePassword-2：修改失败', async () => {
    jest.spyOn(http, 'authForm').mockResolvedValue({
      success: false,
      code: 50000,
      result: null,
      msg: '修改失败',
    });

    const response = await updatePassword({
      access_token: '56tg890ybb688h900gh5g',
      newPassword: 'h12345678',
      oldPassword: '1231231',
    });
    expect(response.success).toBeFalsy();
  });
});