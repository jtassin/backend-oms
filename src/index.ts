const http = require('http');
import {app, runServer } from './server';

const PORT = 4000;


async function run() {
    const server = await runServer()
    await app.listen(PORT);
    const wsServer = http.createServer(() => {
    });
    
    await wsServer.listen(4001);
    server.installSubscriptionHandlers(wsServer);
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
}

run();