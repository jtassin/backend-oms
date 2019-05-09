import { startApiServer, ApiServerEnv, destroy } from "../../../__tests__/startApiServer";

let env: ApiServerEnv;

// import {
//     ApiServerEnv,
//     startApiServer,
//   } from '../../../../__tests__/startApiServer';

describe('e2e', () => {
    beforeAll(async () => {
        env = await startApiServer()
    })

    afterAll(async () => {
        await destroy()
    })

    it('can query', async () => {
        const payload = {
            operationName: null,
            query: "{listOrderProducts {id}}",
            variables: {}
        }
        const res = await env.asAdmin({
            method: 'POST',
            url: '/graphql',
            payload,
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(res.data)
    })

    it('can mutate', async () => {
        const payload = {
            operationName: null,
            query: `mutation addOrderProduct($articleId: String!, $orderId: String!) {
                addOrderProduct(articleId: $articleId, orderId: $orderId) {
                  id
                  state
                }
              }`,
            variables: {articleId: '1', orderId: '6'}
        }
        const res = await env.asAdmin({
            method: 'POST',
            url: '/graphql',
            payload,
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(res.data)
    })
})