import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv'
dotenv.config()

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})


export const test = async () => {
  const res = await api.sendMessage('I want to write a dingding bot which uses chatGPT underneath, how to make it happen?')
  console.log(res.text)
}


