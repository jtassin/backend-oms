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

    afterAll(() => {
        destroy()
    })

    it('works', async () => {
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
})