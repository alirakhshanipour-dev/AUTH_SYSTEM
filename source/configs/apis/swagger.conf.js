import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import path from "path";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API of Users',
        version: '1.0.0',
        description: "API's of User",
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
    servers: [
        {
            url: 'http://localhost:3000', // Change this to your server's URL
            description: 'Development server',
        },
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'Endpoints related to authentication'
        },
        {
            name: 'Users',
            description: 'Endpoints related to user management'
        },
    ],
};

const options = {
    swaggerDefinition,
    // Path to Swagger definition files
    path: [],
    // Path to API route files
    apis: [
        path.join(process.cwd(), "source", "modules", "**", "*.swagger.js"),
        // path.join(process.cwd(), "source", "services", "**", "*.swagger.js")
    ],
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Middleware function to set up Swagger UI
export const swaggerConfig = (app) => {
    // Serve Swagger UI on /api-docs endpoint
    app.use('/api-docs', serve, setup(swaggerSpec, {
        customCssUrl: "/css/customize-swagger.css",
        customJs: "/js/customize-swagger.js",
    }));

    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};
