import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: "liblab",
    version: "1.0.0",
});

type ApiResponse = {
    content: Array<{
        type: string;
        text: string;
    }>;
    isError?: boolean;
};

interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
}

// Base URL for the API
const API_BASE: string = process.env.BASE_URL || "http://funtranslations.com" || "";
// User agent to be used for requests
const USER_AGENT: string = "liblab/1.0.0";

// Helper function for making API requests
async function makeApiRequest(
    path: string, 
    method: string = "GET", 
    queryParams: Record<string, any> = {}, 
    pathParams: Record<string, any> = {}, 
    body: any = undefined, 
    headers: Record<string, any> = {},
    auth: 'bearer' | 'basic' | 'apiKey' | 'oauth' | undefined = undefined
): Promise<any> {
    let endpoint = path;
    for (const [key, value] of Object.entries(pathParams)) {
        endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
    
    const queryString = Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join("&");
    
    let url = `${API_BASE}${endpoint}${queryString ? `?${queryString}` : ""}`;
    
    const requestHeaders: Record<string, string> = {
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
        ...headers
    };

    switch (auth) {
        case 'bearer':
            requestHeaders["Authorization"] = `${process.env.AUTH_PREFIX || 'Bearer'} ${process.env.AUTH_TOKEN}`;
            break;
            
        case 'basic':
            const base64Credentials = btoa(`${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`);
            requestHeaders["Authorization"] = `Basic ${base64Credentials}`;
            break;
            
        case 'apiKey':
            if (process.env.AUTH_HEADER_NAME && process.env.AUTH_API_KEY) {
                requestHeaders[process.env.AUTH_HEADER_NAME] = process.env.AUTH_API_KEY;
            }
            break;
            
        case 'oauth':
            requestHeaders["Authorization"] = `Bearer ${process.env.AUTH_ACCESS_TOKEN}`;
            break;
    }
    
    if (body && !requestHeaders["Content-Type"]) {
        requestHeaders["Content-Type"] = "application/json";
    }
    
    try {
        const options: RequestOptions = { 
            method, 
            headers: requestHeaders
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Try to parse as JSON, fall back to text if not possible
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error(`Error making API request to ${url}:`, error);
        throw error;
    }
}

// Format error response
function formatErrorResponse(error: Error): ApiResponse {
    return {
        content: [
            {
                type: "text",
                text: `Error: ${error.message || "Unknown error"}`
            }
        ],
        isError: true
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
                type: "text",
                text
            }
        ]
    };
}

// Morse Service
server.tool("get_translate_morse", "Translate from English to morse code.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/morse",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_morse2english", "Translate from Morse code to English.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/morse2english",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_morse_audio", "Translate from English to morse code and get the result as an audio file.", {
    text: z.string().describe("Text to translate"),
    speed: z.number().describe("Audio Speed WordsMinute"),
    tone: z.number().describe("Audio Tone FrequencyHz")
}, async (params: {
    text: string,
    speed: number,
    tone: number
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text,
                speed: params.speed,
                tone: params.tone
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/morse/audio",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Braille Service
server.tool("get_translate_braille", "Translate from English to Braille. This is what you use if you have a braille display. This API translates the English text into characters that a braille display understands and you can feed the translated text directly to the display.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/braille",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_braille_dots", "Use this to see which dots are enabled for each Braille letters. This is highly educational to see which dots are enabled and can potentially drive a non braille display which works on individual dots.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/braille/dots",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_braille_unicode", "Translate from English to Braille Unicode characters.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/braille/unicode",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_braille_image", "Translate from English to Braille image characters. This is probably what you want to use if you are displaying braille in a browser.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/braille/image",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_braille_html", "Translate from English to Braille Image characters. This is probably what you want to use if you are displaying braille in a browser.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/braille/html",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Starwars Service
server.tool("get_translate_yoda", "Translate from English to Yoda Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/yoda",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_sith", "Translate from English to Sith Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/sith",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_cheunh", "Translate from English to Starwars cheunh.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/cheunh",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_gungan", "Translate from English to Starwars Gungan Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/gungan",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_mandalorian", "Translate from English to Starwars Mandalorian Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/mandalorian",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_huttese", "Translate from English to Starwars Huttese Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/huttese",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Startrek Service
server.tool("get_translate_vulcan", "Translate from English to Startrek Vulcan Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/vulcan",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_klingon", "Translate from English to Startrek Klingon Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/klingon",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Elvish Service
server.tool("get_translate_sindarin", "Translate from English to Elvish Sindarin Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/sindarin",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_quneya", "Translate from English to Elvish Quenya Language.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/quneya",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Characters Service
server.tool("get_translate_pirate", "Translate from English to Pirate Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/pirate",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_minion", "Translate from English to Minion Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/minion",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_ferblatin", "Translate from English to Ferb Latin.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/ferblatin",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_chef", "Translate from English to Swedish Chef speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/chef",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_dolan", "Translate from English to Dolan Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/dolan",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_fudd", "Translate from English to Fudd Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/fudd",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Dialect Service
server.tool("get_translate_valspeak", "Translate from English to Valley Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/valspeak",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_jive", "Translate from normal English to Jive Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/jive",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_cockney", "Translate from English to Cockney Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/cockney",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_brooklyn", "Translate from English to Brooklyn Speak.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/brooklyn",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// PigLatin Service
server.tool("get_translate_piglatin", "Translate from English to Pig Latin.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/piglatin",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Game Of Thrones Service
server.tool("get_translate_dothraki", "Translate from English to Dothraki.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/dothraki",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_valyrian", "Translate from English to Valyrian.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/valyrian",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// English Service
server.tool("get_translate_oldenglish", "Translate from English to Old English.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/oldenglish",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_shakespeare", "Translate from English to Shakespeare English.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/shakespeare",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_us2uk", "Translate from US English to UK English.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/us2uk",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_translate_uk2us", "Translate from UK English to US English.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/uk2us",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Internet FAD Service
server.tool("get_translate_ermahgerd", "Translate from English to ERMAHGERD.", {
    text: z.string().describe("Text to translate")
}, async (params: {
    text: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                text: params.text
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/translate/ermahgerd",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                "apiKey"
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });



// Start the server
async function main(): Promise<void> {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("liblab MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});