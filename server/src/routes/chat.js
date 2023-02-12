import { Router } from 'express'
import { loggerWithTag } from '../helpers/logger.js'
import {test} from "../api/chatgpt.js";
const router = Router()
const log = loggerWithTag('chat')

router.get('/', async (req, res) => {
  log('test')

  try {

    await test()

  } catch (err) {
    console.error(err)
  }

})



export default router
