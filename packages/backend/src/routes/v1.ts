import express from 'express'
import { askLLM } from '../domain/llm/llm.controller'

const router = express.Router()

router.post('/v1/llm/ask', askLLM)

export default router
