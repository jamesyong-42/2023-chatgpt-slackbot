import express from 'express'
import cors from 'cors'
const {App} = require("@slack/bolt")
import dotenv from 'dotenv'
dotenv.config()

// import { logger } from './src/helpers/logger.js'
// import routes from './src/routes/index.js'

// const server = express()
// server.use(cors())
// server.use(express.json())
//
// server.listen(process.env.SERVER_PORT, () => {
//   logger.info(`static server is running on port ${process.env.SERVER_PORT}`)
//
// })
//
// server.use('/test', (req, res) => {
//   // console.log(req)
//   return res.status(200).send('good')
// })


// server.use('/api/sign', routes.sign)
// server.use('/api/test', routes.test)
// server.use('/chat', routes.chat)


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // socketMode:true, // enable the following to use socket mode
  // appToken: process.env.APP_TOKEN
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.SERVER_PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

app.message("hey", async ({ command, say }) => {
  try {
    say("Yaaay! that command works!");
  } catch (error) {
    console.log("err")
    console.error(error);
  }
});