import 'reflect-metadata'

import { Server } from './server'

const main = () => {
  const server = new Server()
  server.start()
}

main()
