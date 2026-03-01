import { bootstrap } from '../src/index.js';

let app: any;

export default async function handler(req: any, res: any) {
    try {
        if (!app) {
            console.log('API: Bootstrap starting...');
            const { fastify } = await bootstrap();
            app = fastify;
            console.log('API: Bootstrap finished.');
        }

        await app.ready();
        app.server.emit('request', req, res);
    } catch (err: any) {
        console.error('API HANDLER ERROR:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: false,
            error: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        }));
    }
}
