/*
 * @文件描述: 定义生成代码的模板
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @Date: 2019-10-28 16:29:26
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-18 19:05:27
 */
import { CodeGenerator, Interface } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  /** 获取总的类型定义代码 */
  getDeclaration() {
    return `
      type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
        [key in Key]: Value;
      }

      interface AjaxResponse<T> {
        code: number;
        data: T;
        message: string;
        success: boolean;
      }

      ${this.getCommonDeclaration()}

      ${this.getBaseClassesInDeclaration()}

      ${this.getModsDeclaration()}
    `;
  }

  /** 生成的api.d.ts文件中的对应每个接口的内容 */
  getInterfaceContentInDeclaration(inter: Interface) {
    const paramsCode = inter.getParamsCode();
    const bodyParamsCode = inter.getBodyParamsCode();
    const hasGetParams = !!inter.parameters.filter(param => param.in !== 'body').length;
    let requestParams = bodyParamsCode
      ? `params: Params, bodyParams: ${bodyParamsCode}`
      : `params: Params`;

    if (!hasGetParams) {
      requestParams = bodyParamsCode ? `bodyParams: ${bodyParamsCode}` : '';
    }

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function fetch(${requestParams}, needLogin?: boolean): Promise<AjaxResponse<Response>>;
    `;
  }

  /** 生成的接口请求部分 */
  getInterfaceContent(inter: Interface) {
    // type为body的参数
    const bodyParamsCode = inter.getBodyParamsCode();
    // 为避免method匹配不上，全部转化为大写
    const method = inter.method.toUpperCase();
    const fetchMethod = bodyParamsCode ? method + ':JSON' : method;

    let requestStr = '';

    switch (fetchMethod) {
      case 'GET':
        requestStr = `request.get(backEndUrl + "${inter.path}", params, needLogin)`;
        break;
      case 'PUT':
        requestStr = `request.put(backEndUrl + "${inter.path}", params, needLogin)`;
        break;
      case 'DELETE':
        requestStr = `request.delete(backEndUrl + "${inter.path}", params, needLogin)`;
        break;
      case 'POST':
        requestStr = `request.postForm(backEndUrl + "${inter.path}", params, needLogin)`;
        break;
      case 'POST:JSON':
        requestStr = `request.postJSON(backEndUrl + "${inter.path}", params, needLogin)`;
        break;
    }

    let initValue = inter.response.initialValue;
    if (inter.responseType === 'number') {
      initValue = '0';
    }

    let defsStr = '';
    if (inter.response.isDefsType) {
      defsStr = "import * as defs from '../../baseClass';";
    }

    return `
      /**
      * @description ${inter.description}
      */
      ${defsStr}
      import serverConfig from '../../../../../server.config';
      import { request } from '@td-design/utils';

      const backEndUrl = serverConfig()['${this.dataSource.name}'];

      export async function fetch(params = {}, needLogin?: boolean) {
        try {
          const result = await ${requestStr};
          if (!result.success) throw result;
          return result;
        } catch(error) {
          return {
            success: false,
            data: ${initValue},
            message: error.message || '请求失败，请重试',
          };
        }
      }
    `;
  }
}
