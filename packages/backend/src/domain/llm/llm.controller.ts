import { Request, Response } from 'express'
import LLMService from './llm.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const askLLM = async (req: Request, res: Response): Promise<any> => {
  const { question } = req.body

  const llmService = new LLMService()
  const data = await llmService.searchDapp(question)

  return res.status(200).json({ message: 'OK', data })
}
