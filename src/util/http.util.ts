import fetch from 'node-fetch';
import { nanoid } from 'nanoid';
import HttpsProxyAgent from 'https-proxy-agent';
import { LogUtil } from './log.util';

export class HttpUtil {
    static proxy;

    static headers;

    static async fetch(uri: string, options: any): Promise<any> {
        const id: string = nanoid();
        const allOptions: any = { 'Content-Type': 'application/json', ...options };

        if (HttpUtil.proxy) {
            allOptions.agent = new HttpsProxyAgent(HttpUtil.proxy);
            LogUtil.logger().debug(`[${id}] Using proxy: ${HttpUtil.proxy}`);
        }

        if (HttpUtil.headers) {
            allOptions.headers = HttpUtil.headers;
        }

        try {
            LogUtil.logger().info(`[${id}] Request: [${allOptions.method}] ${uri}`);

            if (allOptions.body !== undefined) {
                LogUtil.logger().debug(`[${id}] Request body: ${allOptions.body}`);
            }

            const response = await fetch(uri, allOptions);

            return this.parseResponse(id, response);
        } catch (error) {
            LogUtil.handleError(`[${id}] Error: ${error.message}`);
            return '';
        }
    }

    static async parseResponse(id: string, response: any): Promise<any> {
        const responseLog: string = `Response: [${response.status}] ${response.statusText}`;

        if (!response.ok) {
            LogUtil.handleError(`[${id}] ${responseLog}`);
        }

        LogUtil.logger().info(`[${id}] ${responseLog}`);
        const responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (error) {
            return responseText;
        }
    }
}
