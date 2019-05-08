import { HTTPInjectOptions } from 'fastify';
import { Redis } from 'ioredis';
import { Db } from 'mongodb';
import * as shortid from 'shortid';
// import { MongoModel } from '../types/augmentation';

// This is a rewrite of startApiServer in typescript, where startApiServer returns the testing environment (instead of puting it in globals)

function generateRnd() {
  let str = '';
  while (str.length < 16) {
    str += shortid
      .generate()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }
  return str.slice(0, 16);
}
let instance: any;

export async function destroy() {
  console.log('kill')
  instance.close()
}


export async function startApiServer() {
  const rnd = generateRnd();
  process.env.MONGO_URL = `mongodb://localhost:27017/kepler-tu-${rnd}`;
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const { app, runServer } = require('../src/server');
  await runServer()
  instance = app;

  const apiServer = app as typeof app & {
    redis: { db: Redis; [prop: string]: any };
    mongo: { db: Db; [prop: string]: any };
    ajv: any;
  };

  process.env.PUBSUB_EMULATOR_HOST =
    process.env.PUBSUB_EMULATOR_HOST || 'localhost:8085';

  const account = `testaccount${rnd}`;

  await apiServer.ready();

  const userId = shortid.generate();

  // const mongo: MongoModel = {
  //   ...apiServer.mongo,
  //   ...apiServer.mongo.scopeCollectionsTo(account),
  // };

  // // ugly but allows us to drop the dbs from setup.ts
  // (global as any).mongo = mongo;

  const request = async (opts: string | HTTPInjectOptions) => {
    const res = await apiServer.inject(opts);
    // case specific for excel generation file and / or when content-disposition is present
    if (
      (res.headers as any)['content-disposition'] ||
      (res.headers as any)['stripe-signature']
    ) {
      return { ...res, data: res.payload };
    }
    return { ...res, data: res.payload ? JSON.parse(res.payload) : {} };
  };

  return {
    destroy: () => {
app.stop();
    },
    accountSlug: account,
    fastify: apiServer,
    ajv: apiServer.ajv,
    redis: apiServer.redis,
    // mongo,
    userId,

    createIndexes: () => apiServer.mongo.createIndexes(account),

    request,

    asAdmin: (opts: HTTPInjectOptions) =>
      request({
        ...opts,
        headers: { ...opts.headers },
      }),
  };
}

type ThenArg<T> = T extends Promise<infer U> ? U : T;
export type ApiServerEnv = ThenArg<ReturnType<typeof startApiServer>>;
