import { ChatOpenAI } from '@langchain/openai'
import env from '../../config/index'
import { logger } from '../../core/logger'

export default class LLMService {
  /**
   * Dapp LLM 검색
   * @param question
   * @returns
   */
  async searchDapp(question: string) {
    try {
      // 1. DApp 확인
      logger.info(`Received question: ${question}`)
      const cleanedQuestion = question
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .trim()
        .toLowerCase()
      logger.info(`Cleaned question: ${cleanedQuestion}`)

      // 2. DApp이 있으면 검증된 링크와 메시지 반환
      const res = await fetch(
        'https://raw.githubusercontent.com/Dilrong/dapp-lang/refs/heads/main/packages/shared/data/dapps.json'
      )
      if (!res.ok) {
        logger.info('No Dapp found in JSON, proceeding with LLM')
      } else {
        const dapps = await res.json()
        const dapp = dapps.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (d: any) =>
            d.name.toLowerCase().includes(cleanedQuestion) ||
            d.function.toLowerCase().includes(cleanedQuestion)
        )
        if (dapp) {
          logger.info(`Dapp found: ${JSON.stringify(dapp)}`)
          return { message: 'OK', data: dapp }
        }
      }

      // 3. DApp이 없으면 LLM으로 확인
      const llm = new ChatOpenAI({
        modelName: 'google/gemini-2.0-flash-001',
        openAIApiKey: env.OPEN_ROUTER_KEY,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1'
        }
      })

      const prompt = `You are a helpful assistant specialized in finding information about decentralized applications (Dapps).
      Provide a concise and accurate answer to the user's query.
      If the query is unclear, ask for clarification.
      Do not include unverified or speculative information.
      
      User Query: ${question}
      
      Answer:`
      const result = await llm.invoke(prompt)
      logger.info(`LLM response: ${result.content}`)
      return result.content
    } catch (err) {
      logger.error(err)
      throw new Error('Failed to search Dapp')
    }
  }
}
