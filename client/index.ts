import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server'

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
})

async function main() {
    const users = await trpc.userList.query()
    console.log('users ==>', users)

    const createdUser1 = await trpc.userCreate.mutate({ name: 'john wick' })
    const createdUser2 = await trpc.userCreate.mutate({ name: 'snoop dog' })
    console.log('createUser ==>', createdUser1, createdUser2)

    const user = await trpc.userById.query('1')
    console.log('User 1 ==>', user)
}

main().catch(console.error)
