import serverless from 'serverless-http';
import { bootstrap } from '../src/index.js';

let app: any;
let handler: any;

export const handlerFunc = async (event: any, context: any) => {
    try {
        if (!app) {
            console.log('API: Handler initializing bootstrap...');
            const { fastify } = await bootstrap();
            app = fastify;
            handler = serverless(app as any);
            console.log('API: Handler initialization complete.');
        }
        return await handler(event, context);
    } catch (err: any) {
        console.error('NETLIFY HANDLER ERROR:', err);
        throw err;
    }
};

export default handlerFunc;
