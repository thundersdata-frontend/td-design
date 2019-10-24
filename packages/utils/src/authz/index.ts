import http from '../request';

const AUTH_URL = 'http://api.test.thundersdata.com';

/** 每个项目中都需要配置应用id和应用密钥 */
const OAUTH_PARAMS = {
  client_id: 'logistics', // 应用id
  client_secret: 'L9ZUYKIM', // 应用密钥
  company: 0, // 0-雷数科技，1-一度，2-能信科技
};

const authzUtils = {

  /**
   * 用户名+密码登录
   * @param username 用户名
   * @param password 密码
   */
  async passwordLoginWithUsername(params: { username: string; password: string; }) {
    try {
      const response = await http.authForm<{ access_token: string }>(
        `${AUTH_URL}/authz/oauth/token`,
        {
          ...params,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          client_secret: OAUTH_PARAMS.client_secret,
          scope: 'read',
          grant_type: 'password',
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: ''
        }
      }
    }
  },

  /**
   * 手机号+密码登录
   * @param phone 手机号
   * @param password 密码
   */
  async passwordLoginWithPhone(params: { phone: string; password: string; }) {
    try {
      const response = await http.authForm<{ access_token: string }>(
        `${AUTH_URL}/authz/oauth/token`,
        {
          username: params.phone,
          password: params.password,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          client_secret: OAUTH_PARAMS.client_secret,
          scope: 'read',
          grant_type: 'password',
          usingPhonePassword: true,
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: ''
        }
      }
    }
  },

  /**
   * 人脸登录
   * @param face 人脸数据，图片base64编码
   * @param client 客户端类型，0-app;1-webPC
   * @param identification 设备识别号，app一般是设备号 webPC一般ip
   */
  async faceLogin(params: {
    face: string;
    client: number;
    identification: string;
  }) {
    try {
      const response = await http.authForm<{ access_token: string }>(
        `${AUTH_URL}/authz/oauth/token`,
        {
          ...params,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          client_secret: OAUTH_PARAMS.client_secret,
          scope: 'read',
          grant_type: 'face',
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: ''
        }
      }
    }
  },

  /**
   * 手机号+验证码登录(登录即注册)
   * @param phone 手机号
   * @param code 验证码
   */
  async smsLogin(params: { phone: string; code: string; }) {
    try {
      const response = await http.authForm<{ access_token: string }>(
        `${AUTH_URL}/authz/users/smsLogin`,
        {
          ...params,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          client_secret: OAUTH_PARAMS.client_secret,
          scope: 'read',
          grant_type: 'sms',
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '登录失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: ''
        }
      }
    }
  },

  /**
   * 用户名+密码注册
   * @param username 用户名
   * @param password 密码
   */
  async passwordRegister(params: { username: string; password: string; }) {
    try {
      const response = await http.authForm<{ access_token: string }>(
        `${AUTH_URL}/authz/users/register`,
        {
          ...params,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          client_secret: OAUTH_PARAMS.client_secret,
          scope: 'read',
          register_type: 'password',
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '注册失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: ''
        }
      }
    }
  },

  /**
   * 手机号+验证码+密码注册
   * @param mobile 手机号
   * @param password 密码
   * @param verification_code 验证码
   */
  async smsRegister(params: {
    mobile: string;
    password: string;
    verification_code: string;
  }) {
    try {
      const response = await http.authForm<{ access_token: string }>(
        `${AUTH_URL}/authz/users/register`,
        {
          ...params,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          client_secret: OAUTH_PARAMS.client_secret,
          scope: 'read',
          register_type: 'phone',
          smsType: 0,
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '注册失败，请重试',
        code: error.code || 50000,
        result: {
          access_token: ''
        }
      }
    }
  },

  /**
   * 发送验证码
   * @param mobile 手机号
   * @param type 短信类型 0-注册 1-修改密码 2-绑定用户或者验证码登录
   */
  async sendSmsCode(params: { mobile: string; type: number; }) {
    try {
      const response = await http.authForm(
        `${AUTH_URL}/authz/sms/send`,
        {
          ...params,
          appVersion: '1.0.0',
          client_id: OAUTH_PARAMS.client_id,
          company: OAUTH_PARAMS.company,
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '发送失败，请重试',
        code: error.code || 50000,
      }
    }
  },

  /**
   * 重置密码-短信方式
   * @param phone 手机号
   * @param newPassword 新密码
   * @param verificationCode 验证码
   */
  async resetPassword(params: {
    phone: string;
    newPassword: string;
    verificationCode: string;
  }) {
    try {
      const response = await http.authForm(
        `${AUTH_URL}/authz/users/resetPassword`,
        {
          ...params,
          client_id: OAUTH_PARAMS.client_id,
          appVersion: '1.0.0',
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '操作失败，请重试',
        code: error.code || 50000,
      }
    }
  },

  /**
   * 修改密码
   * @param access_token token
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  async updatePassword(params: {
    access_token: string;
    newPassword: string;
    oldPassword: string;
  }) {
    try {
      const response = await http.authForm(
        `${AUTH_URL}/resource/user/updatePassword`,
        {
          ...params,
          appVersion: '1.0.0',
        },
      );
      return response;
    } catch (error) {
      return {
        success: false,
        msg: error.msg || '操作失败，请重试',
        code: error.code || 50000,
      }
    }
  },
};

export default authzUtils;