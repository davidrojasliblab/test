import { z } from 'zod';
import { BaseService } from '../base-service';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { RequestBuilder } from '../../http/transport/request-builder';
import { SerializationStyle } from '../../http/serialization/base-serializer';
import { Environment } from '../../http/environment';
import { GetTranslateQuneyaParams, GetTranslateSindarinParams } from './request-params';

export class ElvishService extends BaseService {
  /**
   * Translate from English to Elvish Sindarin Language.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateSindarin(
    params: GetTranslateSindarinParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<any>> {
    const request = new RequestBuilder()
      .setBaseUrl(
        requestConfig?.baseUrl ||
          this.config.baseUrl ||
          this.config.environment ||
          Environment.DEFAULT,
      )
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/translate/sindarin')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .addApiKeyAuth(this.config.apiKey, 'X-Funtranslations-Api-Secret')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.any(),
        contentType: ContentType.Json,
        status: 200,
      })
      .addError({
        error: Error,
        contentType: ContentType.Json,
        status: 401,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'text',
        value: params?.text,
      })
      .build();
    return this.client.call<any>(request);
  }

  /**
   * Translate from English to Elvish Quenya Language.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateQuneya(
    params: GetTranslateQuneyaParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<any>> {
    const request = new RequestBuilder()
      .setBaseUrl(
        requestConfig?.baseUrl ||
          this.config.baseUrl ||
          this.config.environment ||
          Environment.DEFAULT,
      )
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/translate/quneya')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .addApiKeyAuth(this.config.apiKey, 'X-Funtranslations-Api-Secret')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.any(),
        contentType: ContentType.Json,
        status: 200,
      })
      .addError({
        error: Error,
        contentType: ContentType.Json,
        status: 401,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'text',
        value: params?.text,
      })
      .build();
    return this.client.call<any>(request);
  }
}
