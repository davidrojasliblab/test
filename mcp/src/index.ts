import { Liblab, RequestConfig } from 'liblab';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'liblab',
  version: '1.0.0',
});

const liblab = new Liblab({
  token: process.env.TOKEN || '',
  baseUrl: process.env.BASE_URL || 'http://api.funtranslations.com',
});

type ApiResponse = {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
};

interface GetTranslateMorseParams {
  text: string;
}

interface GetTranslateMorse2englishParams {
  text: string;
}

interface GetTranslateMorseAudioParams {
  text: string;
  speed: number;
  tone: number;
}

interface GetTranslateBrailleParams {
  text: string;
}

interface GetTranslateBrailleDotsParams {
  text: string;
}

interface GetTranslateBrailleUnicodeParams {
  text: string;
}

interface GetTranslateBrailleImageParams {
  text: string;
}

interface GetTranslateBrailleHtmlParams {
  text: string;
}

interface GetTranslateYodaParams {
  text: string;
}

interface GetTranslateSithParams {
  text: string;
}

interface GetTranslateCheunhParams {
  text: string;
}

interface GetTranslateGunganParams {
  text: string;
}

interface GetTranslateMandalorianParams {
  text: string;
}

interface GetTranslateHutteseParams {
  text: string;
}

interface GetTranslateVulcanParams {
  text: string;
}

interface GetTranslateKlingonParams {
  text: string;
}

interface GetTranslateSindarinParams {
  text: string;
}

interface GetTranslateQuneyaParams {
  text: string;
}

interface GetTranslatePirateParams {
  text: string;
}

interface GetTranslateMinionParams {
  text: string;
}

interface GetTranslateFerblatinParams {
  text: string;
}

interface GetTranslateChefParams {
  text: string;
}

interface GetTranslateDolanParams {
  text: string;
}

interface GetTranslateFuddParams {
  text: string;
}

interface GetTranslateValspeakParams {
  text: string;
}

interface GetTranslateJiveParams {
  text: string;
}

interface GetTranslateCockneyParams {
  text: string;
}

interface GetTranslateBrooklynParams {
  text: string;
}

interface GetTranslatePiglatinParams {
  text: string;
}

interface GetTranslateDothrakiParams {
  text: string;
}

interface GetTranslateValyrianParams {
  text: string;
}

interface GetTranslateOldenglishParams {
  text: string;
}

interface GetTranslateShakespeareParams {
  text: string;
}

interface GetTranslateUs2ukParams {
  text: string;
}

interface GetTranslateUk2usParams {
  text: string;
}

interface GetTranslateErmahgerdParams {
  text: string;
}

// Format error response
function formatErrorResponse(error: Error): ApiResponse {
  return {
    content: [
      {
        type: 'text',
        text: `Error: ${error.message || 'Unknown error'}`,
      },
    ],
    isError: true,
  };
}

// Format success response
function formatSuccessResponse(data: any): ApiResponse {
  let text: string;

  if (typeof data === 'object') {
    text = JSON.stringify(data, null, 2);
  } else {
    text = String(data);
  }

  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
}

function withDefaultParams(handler: any) {
  return async (args: any) => {
    // Initialize args and params safely
    const newArgs = args ? { ...args } : {};
    newArgs.params = newArgs.params || {};

    // Process all parameters in newArgs.params
    for (const paramName in newArgs.params) {
      // Skip if parameter is already set with a non-empty value
      if (newArgs.params[paramName] !== undefined && newArgs.params[paramName] !== '') {
        continue;
      }

      // Try various environment variable naming patterns for this parameter
      const possibleEnvVarNames = [
        paramName, // Exact match
        paramName.toUpperCase(), // UPPERCASE
        paramName.toLowerCase(), // lowercase
        paramName.replace(/([A-Z])/g, '_$1').toUpperCase(), // camelCase to SNAKE_CASE
        paramName.replace(/([A-Z])/g, '-$1').toLowerCase(), // camelCase to kebab-case
        paramName.replace(/-/g, '_').toUpperCase(), // kebab-case to SNAKE_CASE
        paramName.replace(/_/g, '').toLowerCase(), // snake_case to lowercase
      ];

      // Find first matching environment variable
      for (const envVarName of possibleEnvVarNames) {
        const envValue = process.env[envVarName];
        if (envValue !== undefined && envValue !== '') {
          // Set the parameter value (let the API handle type conversion)
          newArgs.params[paramName] = envValue;
          break;
        }
      }
    }

    // Remove all empty attributes from params
    for (const paramName in newArgs.params) {
      if (newArgs.params[paramName] === undefined || newArgs.params[paramName] === '') {
        delete newArgs.params[paramName];
      }
    }

    // Call the original handler with the enhanced args
    return handler(newArgs);
  };
}

const RequestConfigSchema = z
  .object({
    retry: z
      .object({
        attempts: z.number().describe('Number of times a request should be retried upon failure'),
        delayMs: z.number().optional().describe('Delay in milliseconds between retry attempts'),
      })
      .optional()
      .describe('Configuration for request retry behavior'),

    validation: z
      .object({
        responseValidation: z
          .boolean()
          .optional()
          .describe('Whether the response should be validated against a schema'),
      })
      .optional()
      .describe('Settings related to request and response validation'),

    baseUrl: z.string().optional().describe('Base URL for the API requests'),
  })
  .optional()
  .describe('Configuration object for customizing request behavior');

// Morse Service
server.tool(
  'get_translate_morse',
  'Translate from English to morse code.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateMorseParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.morse.getTranslateMorse(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_morse2english',
  'Translate from Morse code to English.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateMorse2englishParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.morse.getTranslateMorse2english(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_morse_audio',
  'Translate from English to morse code and get the result as an audio file.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
        speed: z.number().optional().describe('Audio Speed WordsMinute'),
        tone: z.number().optional().describe('Audio Tone FrequencyHz'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateMorseAudioParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.morse.getTranslateMorseAudio(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Braille Service
server.tool(
  'get_translate_braille',
  'Translate from English to Braille. This is what you use if you have a braille display. This API translates the English text into characters that a braille display understands and you can feed the translated text directly to the display.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateBrailleParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.braille.getTranslateBraille(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_braille_dots',
  'Use this to see which dots are enabled for each Braille letters. This is highly educational to see which dots are enabled and can potentially drive a non braille display which works on individual dots.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateBrailleDotsParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.braille.getTranslateBrailleDots(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_braille_unicode',
  'Translate from English to Braille Unicode characters.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateBrailleUnicodeParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.braille.getTranslateBrailleUnicode(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_braille_image',
  'Translate from English to Braille image characters. This is probably what you want to use if you are displaying braille in a browser.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateBrailleImageParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.braille.getTranslateBrailleImage(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_braille_html',
  'Translate from English to Braille Image characters. This is probably what you want to use if you are displaying braille in a browser.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateBrailleHtmlParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.braille.getTranslateBrailleHtml(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Starwars Service
server.tool(
  'get_translate_yoda',
  'Translate from English to Yoda Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateYodaParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.starwars.getTranslateYoda(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_sith',
  'Translate from English to Sith Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateSithParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.starwars.getTranslateSith(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_cheunh',
  'Translate from English to Starwars cheunh.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateCheunhParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.starwars.getTranslateCheunh(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_gungan',
  'Translate from English to Starwars Gungan Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateGunganParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.starwars.getTranslateGungan(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_mandalorian',
  'Translate from English to Starwars Mandalorian Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateMandalorianParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.starwars.getTranslateMandalorian(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_huttese',
  'Translate from English to Starwars Huttese Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateHutteseParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.starwars.getTranslateHuttese(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Startrek Service
server.tool(
  'get_translate_vulcan',
  'Translate from English to Startrek Vulcan Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateVulcanParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.startrek.getTranslateVulcan(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_klingon',
  'Translate from English to Startrek Klingon Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateKlingonParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.startrek.getTranslateKlingon(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Elvish Service
server.tool(
  'get_translate_sindarin',
  'Translate from English to Elvish Sindarin Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateSindarinParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.elvish.getTranslateSindarin(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_quneya',
  'Translate from English to Elvish Quenya Language.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateQuneyaParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.elvish.getTranslateQuneya(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Characters Service
server.tool(
  'get_translate_pirate',
  'Translate from English to Pirate Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslatePirateParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.characters.getTranslatePirate(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_minion',
  'Translate from English to Minion Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateMinionParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.characters.getTranslateMinion(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_ferblatin',
  'Translate from English to Ferb Latin.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateFerblatinParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.characters.getTranslateFerblatin(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_chef',
  'Translate from English to Swedish Chef speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateChefParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.characters.getTranslateChef(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_dolan',
  'Translate from English to Dolan Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateDolanParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.characters.getTranslateDolan(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_fudd',
  'Translate from English to Fudd Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateFuddParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.characters.getTranslateFudd(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Dialect Service
server.tool(
  'get_translate_valspeak',
  'Translate from English to Valley Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateValspeakParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.dialect.getTranslateValspeak(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_jive',
  'Translate from normal English to Jive Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateJiveParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.dialect.getTranslateJive(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_cockney',
  'Translate from English to Cockney Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateCockneyParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.dialect.getTranslateCockney(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_brooklyn',
  'Translate from English to Brooklyn Speak.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateBrooklynParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.dialect.getTranslateBrooklyn(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// PigLatin Service
server.tool(
  'get_translate_piglatin',
  'Translate from English to Pig Latin.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslatePiglatinParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.pigLatin.getTranslatePiglatin(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Game Of Thrones Service
server.tool(
  'get_translate_dothraki',
  'Translate from English to Dothraki.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateDothrakiParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.gameOfThrones.getTranslateDothraki(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_valyrian',
  'Translate from English to Valyrian.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateValyrianParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.gameOfThrones.getTranslateValyrian(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// English Service
server.tool(
  'get_translate_oldenglish',
  'Translate from English to Old English.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateOldenglishParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.english.getTranslateOldenglish(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_shakespeare',
  'Translate from English to Shakespeare English.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateShakespeareParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.english.getTranslateShakespeare(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_us2uk',
  'Translate from US English to UK English.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateUs2ukParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.english.getTranslateUs2uk(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

server.tool(
  'get_translate_uk2us',
  'Translate from UK English to US English.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateUk2usParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.english.getTranslateUk2us(args.params, args.requestConfig);

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Internet FAD Service
server.tool(
  'get_translate_ermahgerd',
  'Translate from English to ERMAHGERD.',
  {
    params: z
      .object({
        text: z.string().optional().describe('Text to translate'),
      })
      .optional(),
    requestConfig: RequestConfigSchema,
  },
  withDefaultParams(
    async (args: {
      params: GetTranslateErmahgerdParams;
      requestConfig?: RequestConfig;
    }): Promise<any> => {
      try {
        const { data } = await liblab.internetFad.getTranslateErmahgerd(
          args.params,
          args.requestConfig,
        );

        return formatSuccessResponse(data);
      } catch (error) {
        return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
      }
    },
  ),
);

// Start the server
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
