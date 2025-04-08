import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

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
const API_BASE: string = process.env.BASE_URL || "http://api.thecatapi.com/v1" || "";
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

const server = new McpServer({
    name: "liblab",
    version: "1.0.0",
});

// Images Service
server.tool("images_list_search_or_random", "Searches or returns Random selection from all approved images. Default is to return RANDOM images, but with an API-Key you can use 'orderDESC' or 'orderASC' along with the 'page' and 'limit' parameters to paginate through them in the order they were approved. Pagination-Count, Pagination-Page, and Pagination-Limit headers are present in the response so you know the total number of images that can be paginated through for the passed search filters.", {
    size: z.string().optional().describe("optional thumb , small, med or full - small is perfect for Discord"),
    mime_types: z.string().optional().describe("optional a comma separated string of types to return e.g. jpg,png for static, or gif for gifs"),
    format: z.string().optional().describe("optional json  src"),
    has_breeds: z.boolean().optional().describe("optional - only return images with breed data"),
    order: z.string().optional().describe("optional defaultRANDOM - RANDOM  ASC  DESC"),
    page: z.number().optional().describe("optional paginate through results"),
    limit: z.number().optional().describe("optional number of results to return, up to 25 with a valid API-Key")
}, async (params: {
    size?: string,
    mime_types?: string,
    format?: string,
    has_breeds?: boolean,
    order?: string,
    page?: number,
    limit?: number
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                size: params.size,
                mime_types: params.mime_types,
                format: params.format,
                has_breeds: params.has_breeds,
                order: params.order,
                page: params.page,
                limit: params.limit
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/search",
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

server.tool("get_images_bk_i_eh_n3p_g", "Get the raw analysis results for any uploaded image", {
    
}, async (): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/BkIEhN3pG",
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

server.tool("get_images", "Only returns images from your account, uploaded via 'apiv1imagesupload'", {
    limit: z.number().optional().describe("Optional number of images to return valid  1 to 10 - default 1"),
    page: z.number().optional().describe("Optional only works if accountid is present to page through your own uploads"),
    order: z.string().optional().describe("Optional only works if accountid is present, either ASC or DESC - ascending or descending.")
}, async (params: {
    limit?: number,
    page?: number,
    order?: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                limit: params.limit,
                page: params.page,
                order: params.order
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/",
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

server.tool("create_images_upload", "Make sure you're using the right field to send the image, and Content-Type header", {
    body: z.any().optional()
}, async (params: { body?: any }): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = params.body;

            const response = await makeApiRequest(
                "/images/upload",
                "POST",
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

server.tool("delete_images_by_image_id", "imagesimageid", {
    image_id: z.string().describe("imageid")
}, async (params: {
    image_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                image_id: params.image_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/{image_id}",
                "DELETE",
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

server.tool("get_images_by_image_id_breeds", "imagesimageidbreeds", {
    image_id: z.string().describe("imageid")
}, async (params: {
    image_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                image_id: params.image_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/{image_id}/breeds",
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

server.tool("create_images_by_image_id_breeds", "imagesimageidbreeds", {
    image_id: z.string().describe("imageid")
}, async (params: {
    image_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                image_id: params.image_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/{image_id}/breeds",
                "POST",
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

server.tool("delete_images_by_image_id_breeds_by_breed_id", "imagesimageidbreedsbreedid", {
    image_id: z.string().describe("imageid"),
    breed_id: z.string().describe("breedid")
}, async (params: {
    image_id: string,
    breed_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                image_id: params.image_id,
                breed_id: params.breed_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/images/{image_id}/breeds/{breed_id}",
                "DELETE",
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

// Breeds Service
server.tool("get_breeds", "breeds", {
    limit: z.number().optional().describe("limit"),
    page: z.number().optional().describe("page")
}, async (params: {
    limit?: number,
    page?: number
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                limit: params.limit,
                page: params.page
            };

            const headerParameters: Record<string, any> = {
                "x-api-key": `${process.env.X_API_KEY}`,
                "Content-Type": `${process.env.CONTENT_TYPE}`
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

server.tool("get_breeds_by_breed_id", "breedsbreedid", {
    breed_id: z.string().describe("breedid")
}, async (params: {
    breed_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                breed_id: params.breed_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/breeds/{breed_id}",
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

server.tool("get_breeds_search", "Search Breeds", {
    q: z.string().optional().describe("search term for breed name"),
    attach_image: z.number().optional().describe("optional whether to attach the referenceimageid image or not")
}, async (params: {
    q?: string,
    attach_image?: number
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                q: params.q,
                attach_image: params.attach_image
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/breeds/search",
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
server.tool("get_breeds_by_breed_id_facts", "Get one or more facts about the Species. For more at a time just update the 'limit' field, and to paginate through them just increment the 'page' field. The response headers have the pagination details, such as how many there are in total, what page you're on, and the current amount per page. To redorder change the order to ASC for ascending order, DESC for descending, and RAND for random order.", {
    breed_id: z.string().describe("breedid"),
    limit: z.number().optional().describe("limit"),
    page: z.number().optional().describe("page"),
    order: z.string().optional().describe("order")
}, async (params: {
    breed_id: string,
    limit?: number,
    page?: number,
    order?: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                breed_id: params.breed_id
            };

            const queryParams: Record<string, any> = {
                limit: params.limit,
                page: params.page,
                order: params.order
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/breeds/{breed_id}/facts",
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

server.tool("get_facts", "Get one or more Random facts and the Species. For more at a time just update the 'limit' field", {
    
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

// Favourites Service
server.tool("get_favourites", "favourites", {
    
}, async (): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/favourites",
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

server.tool("create_favourites", "favourites", {
    body: z.any().optional()
}, async (params: { body?: any }): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = params.body;

            const response = await makeApiRequest(
                "/favourites",
                "POST",
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

server.tool("get_favourites_by_favourite_id", "favouritesfavouriteid", {
    favourite_id: z.string().describe("favouriteid")
}, async (params: {
    favourite_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                favourite_id: params.favourite_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/favourites/{favourite_id}",
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

server.tool("delete_favourites_by_favourite_id", "favouritesfavouriteid", {
    favourite_id: z.string().describe("favouriteid")
}, async (params: {
    favourite_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                favourite_id: params.favourite_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/favourites/{favourite_id}",
                "DELETE",
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

// Votes Service
server.tool("get_votes", "votes", {
    
}, async (): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/votes",
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

server.tool("create_votes", "votes", {
    body: z.any().optional()
}, async (params: { body?: any }): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = params.body;

            const response = await makeApiRequest(
                "/votes",
                "POST",
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

server.tool("get_votes_by_vote_id", "votesvoteid", {
    vote_id: z.string().describe("voteid")
}, async (params: {
    vote_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                vote_id: params.vote_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/votes/{vote_id}",
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

server.tool("delete_vote_by_vote_id", "votesvoteid", {
    vote_id: z.string().describe("voteid")
}, async (params: {
    vote_id: string
}
): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                vote_id: params.vote_id
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                "Content-Type": `${process.env.CONTENT_TYPE}`,
                "x-api-key": `${process.env.X_API_KEY}`
            };

            const body: any = undefined;

            const response = await makeApiRequest(
                "/vote/{vote_id}",
                "DELETE",
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

// Webhooks Service
server.tool("create_webhooks", "Create Webhook", {
    body: z.any().optional()
}, async (params: { body?: any }): Promise<any> => {
        try {
            const pathParams: Record<string, any> = {
                
            };

            const queryParams: Record<string, any> = {
                
            };

            const headerParameters: Record<string, any> = {
                
            };

            const body: any = params.body;

            const response = await makeApiRequest(
                "/webhooks",
                "POST",
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