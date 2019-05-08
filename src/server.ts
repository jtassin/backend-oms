import "reflect-metadata";

// import { buildSchema } from "graphql";
const { ApolloServer } = require('apollo-server-fastify');
const { OrderResolvers } = require('./graphql/resolvers');
import { buildSchema } from 'type-graphql';
import { pubsub } from "./pubsub";
import { Context } from "./context";

// The use of fastify-plugin is required to be able to register hook globally
const verifyAuth = require('./verifyAuth')

export const app = require('fastify')();
app.register(verifyAuth);

export async function runServer() {
    const schema = await buildSchema({ resolvers: [OrderResolvers], pubSub: pubsub })
    const server = new ApolloServer({
        context: (req: any) => {
            console.log(req.test)
            const context: Context = {
                test: req.test
            }
            console.log('sending', context)
            return context
        },
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
    return server;
}



// const httpServer = http.createServer(app);
// console.log(httpServer)
// server.installSubscriptionHandlers(httpServer);

// console.log(server)