const fp = require('fastify-plugin');
const { middlewares } = require('@keplr/backend-auth');

// The use of fastify-plugin is required to be able to register hook globally
module.exports = fp(async fastify => {
  fastify.addHook('preHandler', async function hook(request, reply) {
    // await middlewares.authenticate.call(this, request, reply);
    request.test = 'coucou';
    if (request.account) {
      request.mongo = this.mongo.scopeCollectionsTo(request.account);
    }

    return request;
  });
});
