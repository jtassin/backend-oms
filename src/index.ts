import "reflect-metadata";
const http = require('http');

// import { buildSchema } from "graphql";
const { ApolloServer } = require('apollo-server-fastify');
const { OrderResolvers } = require('./graphql/resolvers');
import { buildSchema } from 'type-graphql';
const PORT = 4000;

const app = require('fastify')();

(async function () {
    const schema = await buildSchema({ resolvers: [OrderResolvers] })
    const server = new ApolloServer({
        schema,
        resolvers: [OrderResolvers],
        playground: true,
        subscriptions: {
            // path: "/subscriptions",

            onConnect: () => {
                console.log('let s go party')
            }
        }
    });
    app.register(server.createHandler());
    await app.listen(PORT);

    const wsServer = http.createServer(() => {
    });

    wsServer.listen(4001);

    // const httpServer = http.createServer(app);
    // console.log(httpServer)
    server.installSubscriptionHandlers(wsServer);
    // server.installSubscriptionHandlers(httpServer);

    // console.log(server)
    console.log('come on barbie !')
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})();
