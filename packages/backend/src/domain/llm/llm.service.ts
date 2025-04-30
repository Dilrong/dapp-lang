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
      const llm = new ChatOpenAI({
        modelName: 'google/gemini-2.0-flash-001',
        openAIApiKey: env.OPEN_ROUTER_KEY,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1'
        }
      })

      // TODO: DB 참고해서 있으면 검증된 링크라고 안내하기
      const prompt = `You are a helpful assistant specialized in finding information about decentralized applications (Dapps).
        Provide a concise and accurate answer to the user's query.
        If the query is unclear, ask for clarification.
        Do not include unverified or speculative information.
        
        User Query: ${question}
        
        Answer:`
      const result = await llm.invoke(prompt)
      logger.info(result.content)

      return result.content
    } catch (err) {
      logger.error(err)
    }
  }
}
