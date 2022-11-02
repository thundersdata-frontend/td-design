#!/usr/bin/env node
import { generateComponent } from '../libs/generateComponent';
import { getConfig } from '../libs/getConfig';
import parseLocalSvg from '../libs/parseLocalSvg';

export interface XmlData {
  svg: {
    symbol: Array<{
      $: {
        viewBox: string;
        id: string;
      };
      path: Array<{
        $: {
          d: string;
          fill?: string;
        };
      }>;
    }>;
  };
}

const config = getConfig();
const localSvg = parseLocalSvg(config);
generateComponent(localSvg, config);
