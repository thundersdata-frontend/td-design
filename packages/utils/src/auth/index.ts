import http from '../request';

export interface AuthParamsInterface {
  url: string;
  client_id: string;
  client_secret: string;
}

/** 发送验证码时需要传入的type参数 */
export const SMS_TYPE = {
  register: 0, // 注册a
  changePassword: 1, // 修改密码
  login: 2, // 绑定用户或者验证码登录
};

/** 客户端类型 */
export const CLIENT_TYPE = {
  app: 0,
  webPC: 1,
};

/** 一些参数的固定配置项 */
const AUTH_PARAMS = {
  appVersion: '1.0.0',
  scope: 'read',
  grant_type_password: 'password', // 登录方式为密码登录
  grant_type_sms: 'sms', // 登录方式为验证码登录
  grant_type_face: 'face', // 登录方式为人脸登录
  register_type_phone: 'phone', // 手机号注册
  register_type_password: 'password', // 密码注册
};

const getParams = () => {
  let authConfig: AuthParamsInterface = { url: '', client_id: '', client_secret: '' };
  authConfig = require('../../../../../auth.config.js');
  return authConfig;
};

const validateAuthParams = (params: AuthParamsInterface) => {
  const { url, client_id, client_secret } = params;
  if (!url || !client_secret || !client_id) {
    throw {
      success: false,
      msg: '根目录下缺少auth.config.js文件',
    };
  }
};

const {
  appVersion,
  scope,
  grant_type_password,
  grant_type_sms,
  grant_type_face,
  register_type_phone,
  register_type_password,
} = AUTH_PARAMS;

const authUtils = {
  /**
   * 用户名+密码登录
   * @param username 用户名
   * @param password 密码
   */
  async passwordLoginWithUsername(params: { username: string; password: string }, authparams = getParams()) {
    try {
      validateAuthParams(authparams);
      const { url, client_id, client_secret } = authparams;
      const response = await http.authForm<{ access_token: string }>(`${url}/authz/oauth/token`, {
        ...params,
        appVersion,
        client_id,
        client_secret,
        scope,
        grant_type: grant_type_password,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: '',
        },
      };
    }
  },

  /**
   * 手机号+密码登录
   * @param phone 手机号
   * @param password 密码
   */
  async passwordLoginWithPhone(params: { phone: string; password: string }, authparams = getParams()) {
    try {
      validateAuthParams(authparams);
      const { url, client_id, client_secret } = authparams;
      const response = await http.authForm<{ access_token: string }>(`${url}/authz/oauth/token`, {
        username: params.phone,
        password: params.password,
        appVersion,
        client_id,
        client_secret,
        scope,
        grant_type: grant_type_password,
        usingPhonePassword: true,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: '',
        },
      };
    }
  },

  /**
   * 人脸登录
   * @param face 人脸数据，图片base64编码
   * @param client 客户端类型，0-app;1-webPC
   * @param identification 设备识别号，app一般是设备号 webPC一般ip
   */
  async faceLogin(
    params: {
      face: string;
      client: number;
      identification: string;
    },
    authparams = getParams(),
  ) {
    try {
      validateAuthParams(authparams);
      const { url, client_id, client_secret } = authparams;
      const response = await http.authForm<{ access_token: string }>(`${url}/authz/oauth/token`, {
        ...params,
        appVersion,
        client_id,
        client_secret,
        scope,
        grant_type: grant_type_face,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: '',
        },
      };
    }
  },

  /**
   * 手机号+验证码登录(登录即注册)
   * @param phone 手机号
   * @param code 验证码
   */
  async smsLogin(params: { phone: string; code: string }, authparams = getParams()) {
    try {
      validateAuthParams(authparams);
      const { url, client_id, client_secret } = authparams;
      const response = await http.authForm<{ access_token: string }>(`${url}/authz/users/smsLogin`, {
        ...params,
        appVersion,
        client_id,
        client_secret,
        scope,
        grant_type: grant_type_sms,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: '',
        },
      };
    }
  },

  /**
   * 用户名+密码注册
   * @param username 用户名
   * @param password 密码
   */
  async passwordRegister(params: { username: string; password: string }, authparams = getParams()) {
    try {
      validateAuthParams(authparams);
      const { url, client_id, client_secret } = authparams;
      const response = await http.authForm<{ access_token: string }>(`${url}/authz/users/register`, {
        ...params,
        appVersion,
        client_id,
        client_secret,
        scope,
        register_type: register_type_password,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '注册失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: '',
        },
      };
    }
  },

  /**
   * 手机号+验证码+密码注册
   * @param mobile 手机号
   * @param password 密码
   * @param verification_code 验证码
   */
  async smsRegister(
    params: {
      mobile: string;
      password: string;
      verification_code: string;
    },
    authparams = getParams(),
  ) {
    try {
      validateAuthParams(authparams);
      const { url, client_id, client_secret } = authparams;
      const response = await http.authForm<{ access_token: string }>(`${url}/authz/users/register`, {
        ...params,
        appVersion,
        client_id,
        client_secret,
        scope,
        register_type: register_type_phone,
        smsType: 0,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '注册失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: '',
        },
      };
    }
  },

  /**
   * 发送验证码
   * @param mobile 手机号
   * @param type 短信类型 0-注册 1-修改密码 2-绑定用户或者验证码登录
   */
  async sendSmsCode(params: { mobile: string; type: number }, authparams = getParams()) {
    try {
      validateAuthParams(authparams);
      const { url, client_id } = authparams;
      const response = await http.authForm(`${url}/authz/sms/send`, {
        ...params,
        appVersion,
        client_id,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '发送失败，请重试',
        code: error.code || 50000,
      };
    }
  },

  /**
   * 重置密码-短信方式
   * @param phone 手机号
   * @param newPassword 新密码
   * @param verificationCode 验证码
   */
  async resetPassword(
    params: {
      phone: string;
      newPassword: string;
      verificationCode: string;
    },
    authparams = getParams(),
  ) {
    try {
      validateAuthParams(authparams);
      const { url, client_id } = authparams;
      const response = await http.authForm(`${url}/authz/users/resetPassword`, {
        ...params,
        client_id: client_id,
        appVersion,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '操作失败，请重试',
        code: error.code || 50000,
      };
    }
  },

  /**
   * 修改密码
   * @param access_token token
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  async updatePassword(
    params: {
      access_token: string;
      newPassword: string;
      oldPassword: string;
    },
    authparams = getParams(),
  ) {
    try {
      validateAuthParams(authparams);
      const { url } = authparams;
      const response = await http.authForm(`${url}/resource/user/updatePassword`, {
        ...params,
        appVersion,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '操作失败，请重试',
        code: error.code || 50000,
      };
    }
  },
};

export default authUtils;
