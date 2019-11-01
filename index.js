require('dotenv').config()
console.log('this is working');
const express = require('express');
const server = express();
server.use(express.json());

const userRouter = require('./data/userRouter.js')
const actionRouter = require('./data/actionRouter.js')
server.use('/api/users', userRouter )
server.use('/api/actions', actionRouter )

server.get('/', (req, res) => {
    res.status(200).json({message: 'My API'})
  });

  const port = process.env.PORT || 8080
  server.listen(port, () => console.log(`listening on port ${port}`))

  module.exports = server

/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
