import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';
import express, { Request, Response } from 'express';

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
const API_BASE: string = process.env.BASE_URL || "https://dogapi.dog/api/v2" || "";
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

// Breeds Service
server.tool("get_breeds", "list breeds", {
    
}, async (): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/breeds",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                undefined
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_breeds_by_id", "get breed with non-existing id", {
    id: z.string().describe("id")
}, async (params: {
    id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                id: params.id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/breeds/{id}",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                undefined
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Facts Service
server.tool("get_facts", "list facts", {
    limit: z.number().optional().describe("limit")
}, async (params: {
    limit?: number
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                limit: params.limit
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/facts",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                undefined
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

// Groups Service
server.tool("get_groups", "list groups", {
    
}, async (): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/groups",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                undefined
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });

server.tool("get_groups_by_id", "get group with non-existing id", {
    id: z.string().describe("id")
}, async (params: {
    id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                id: params.id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/groups/{id}",
                "GET",
                queryParams,
                pathParams,
                body,
                headerParameters,
                undefined
            );
            
            return formatSuccessResponse(response);
        } catch (error) {
            return formatErrorResponse(error instanceof Error ? error : new Error(String(error)));
        }
    });



// Start the server using SSE transport
async function startSSEServerTransport(): Promise<void> {
    const port = 3000;
    console.info(`Starting the server using SSE! Listening on ${port}`);
    const app = express();

    // to support multiple simultaneous connections we have a lookup object from
    // sessionId to transport
    const transports: {[sessionId: string]: SSEServerTransport} = {};

    app.get("/sse", async (_: Request, res: Response) => {
        const transport = new SSEServerTransport('/messages', res);
        transports[transport.sessionId] = transport;
        res.on("close", () => {
            delete transports[transport.sessionId];
        });
        await server.connect(transport);
    });

    app.post("/messages", async (req: Request, res: Response) => {
        const sessionId = req.query.sessionId as string;
        const transport = transports[sessionId];
        if (transport) {
            await transport.handlePostMessage(req, res);
        } else {
            res.status(400).send('No transport found for sessionId');
        }
    });

    app.listen(port);
}

// Function to handle local stdio development
async function startWithStdioTransport(): Promise<void> {
    console.info(`Starting the server using Stdio!`);
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

const port = 3000;
    console.info(`Starting the server using SSE! Listening on ${port}`);
    const app = express();

    // to support multiple simultaneous connections we have a lookup object from
    // sessionId to transport
    const transports: {[sessionId: string]: SSEServerTransport} = {};

    app.get("/sse", async (_: Request, res: Response) => {
        const transport = new SSEServerTransport('/messages', res);
        transports[transport.sessionId] = transport;
        res.on("close", () => {
            delete transports[transport.sessionId];
        });
        await server.connect(transport);
    });

    app.post("/messages", async (req: Request, res: Response) => {
        const sessionId = req.query.sessionId as string;
        const transport = transports[sessionId];
        if (transport) {
            await transport.handlePostMessage(req, res);
        } else {
            res.status(400).send('No transport found for sessionId');
        }
    });

    app.listen(port);