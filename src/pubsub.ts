// const { PubSub } = require('apollo-server');
import { RedisPubSub } from 'graphql-redis-subscriptions';
export const pubsub = new RedisPubSub();

// export const pubsub = new PubSub();


export const NEW_EVENT = '@newEvent';

// pubsub.subscribe(() => {

// })

// const a = pubsub.asyncIterator([NEW_EVENT])
// console.log(a)