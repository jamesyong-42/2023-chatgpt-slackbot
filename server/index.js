import SlackBots from '@slack/bolt'
import dotenv from 'dotenv'
const {App} = SlackBots

dotenv.config()

import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})
const chatGPTSend = async (msg) => {
  const res = await api.sendMessage(msg)
  console.log(res.text)
  return res.text
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // socketMode:true, // enable the following to use socket mode
  // appToken: process.env.APP_TOKEN
});

(async () => {
  // Start your app
  await app.start(process.env.SERVER_PORT);
  console.log(`⚡️ Slack Bolt app is running on port ${process.env.SERVER_PORT}!`);
})();

app.message(async ({ message, say }) => {
  try {
    const response = await chatGPTSend(message)
    say(response)
  } catch (error) {
    console.log("err")
    console.error(error);
  }
});