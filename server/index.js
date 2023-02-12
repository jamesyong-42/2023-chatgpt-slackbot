import SlackBots from '@slack/bolt'
import dotenv from 'dotenv'
const {App} = SlackBots

dotenv.config()

// import { ChatGPTAPI } from 'chatgpt'
//
// const api = new ChatGPTAPI({
//   apiKey: process.env.OPENAI_API_KEY,
//   debug: true
// })
// const chatGPTSend = async (msg) => {
//   const res = await api.sendMessage(msg)
//   console.log(res.text)
//   return res.text
// }


import { ChatGPTClient } from '@waylaidwanderer/chatgpt-api';

let lastResponse

const clientOptions = {
  // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
  // Warning: This will expose your `openaiApiKey` to a third-party. Consider the risks before using this.
  reverseProxyUrl: 'https://chatgpt.pawan.krd/api/completions',
  // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
  modelOptions: {
    // You can override the model name and any other parameters here.
    model: 'text-davinci-002-render-paid',
  },
  // (Optional) Set custom instructions instead of "You are ChatGPT...".
  // promptPrefix: 'You are Bob, a cowboy in Western times...',
  // (Optional) Set a custom name for the user
  // userLabel: 'User',
  // (Optional) Set a custom name for ChatGPT
  // chatGptLabel: 'ChatGPT',
  // (Optional) Set to true to enable `console.debug()` logging
  debug: false,
};

const cacheOptions = {
  // Options for the Keyv cache, see https://www.npmjs.com/package/keyv
  // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default)
  // For example, to use a JSON file (`npm i keyv-file`) as a database:
  // store: new KeyvFile({ filename: 'cache.json' }),
};

const chatGptClient = new ChatGPTClient(process.env.OPENAI_API_KEY, clientOptions, cacheOptions);

const response = await chatGptClient.sendMessage('Hello!');
console.log(response); // { response: 'Hi! How can I help you today?', conversationId: '...', messageId: '...' }

const response2 = await chatGptClient.sendMessage('Write a poem about cats.', { conversationId: response.conversationId, parentMessageId: response.messageId });
console.log(response2.response); // Cats are the best pets in the world.

const response3 = await chatGptClient.sendMessage('Now write it in French.', {
  conversationId: response2.conversationId,
  parentMessageId: response2.messageId,
  // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
  // You will receive one token at a time, so you will need to concatenate them yourself.
  onProgress: (token) => console.log(token),
});

const chatGPTSend = async (msg) => {
  let res
  if (lastResponse) {
    res = await chatGptClient.sendMessage(msg, { conversationId: lastResponse.conversationId, parentMessageId: lastResponse.messageId })
  } else {
    res = await chatGptClient.sendMessage(msg)
  }
  lastResponse = res
  console.log(res.response)
  return res.response
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
  console.log(`received: ${message.text}`)
  try {
    const response = await chatGPTSend(message.text)
    say(response)
  } catch (error) {
    console.log("err")
    console.error(error);
  }
});