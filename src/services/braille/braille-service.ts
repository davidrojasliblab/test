import { z } from 'zod';
import { BaseService } from '../base-service';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { RequestBuilder } from '../../http/transport/request-builder';
import { SerializationStyle } from '../../http/serialization/base-serializer';
import { Environment } from '../../http/environment';
import {
  GetTranslateBrailleDotsParams,
  GetTranslateBrailleHtmlParams,
  GetTranslateBrailleImageParams,
  GetTranslateBrailleParams,
  GetTranslateBrailleUnicodeParams,
} from './request-params';

export class BrailleService extends BaseService {
  /**
   * Translate from English to Braille. This is what you use if you have a braille display. This API translates the English text into characters that a braille display understands and you can feed the translated text directly to the display.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateBraille(
    params: GetTranslateBrailleParams,
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
      .setPath('/translate/braille')
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
   * Use this to see which dots are enabled for each Braille letters. This is highly educational (to see which dots are enabled) and can potentially drive a non braille display which works on individual dots.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateBrailleDots(
    params: GetTranslateBrailleDotsParams,
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
      .setPath('/translate/braille/dots')
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
   * Translate from English to Braille Unicode characters.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateBrailleUnicode(
    params: GetTranslateBrailleUnicodeParams,
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
      .setPath('/translate/braille/unicode')
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
   * Translate from English to Braille image characters. This is probably what you want to use if you are displaying braille in a browser.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateBrailleImage(
    params: GetTranslateBrailleImageParams,
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
      .setPath('/translate/braille/image')
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
   * Translate from English to Braille Image characters. This is probably what you want to use if you are displaying braille in a browser.
   * @param {string} text - Text to translate
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} 200  response
   */
  async getTranslateBrailleHtml(
    params: GetTranslateBrailleHtmlParams,
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
      .setPath('/translate/braille/html')
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
