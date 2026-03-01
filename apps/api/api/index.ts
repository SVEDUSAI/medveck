import { bootstrap } from '../src/index.js';

let app: any;

export default async function handler(req: any, res: any) {
    if (!app) {
        const { fastify } = await bootstrap();
        app = fastify;
    }

    await app.ready();
    app.server.emit('request', req, res);
}
