import { z } from 'zod';
import { BaseService } from '../base-service';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { RequestBuilder } from '../../http/transport/request-builder';
import { SerializationStyle } from '../../http/serialization/base-serializer';
import { Environment } from '../../http/environment';
import {
  GetTranslateOldenglishParams,
  GetTranslateShakespeareParams,
  GetTranslateUk2usParams,
  GetTranslateUs2ukParams,
} from './request-params';

export class EnglishService extends BaseService {
  /**
   * Translate from English to Old English.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateOldenglish(
    params: GetTranslateOldenglishParams,
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
      .setPath('/translate/oldenglish')
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
   * Translate from English to Shakespeare English.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateShakespeare(
    params: GetTranslateShakespeareParams,
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
      .setPath('/translate/shakespeare')
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
   * Translate from US English to UK English.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateUs2uk(
    params: GetTranslateUs2ukParams,
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
      .setPath('/translate/us2uk')
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
   * Translate from UK English to US English.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateUk2us(
    params: GetTranslateUk2usParams,
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
      .setPath('/translate/uk2us')
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
