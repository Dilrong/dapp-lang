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
    const llm = new ChatOpenAI({
      modelName: 'google/gemini-2.0-flash-001',
      openAIApiKey: env.OPEN_ROUTER_KEY,
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1'
      }
    })

    // TODO: DB 참고해서 있으면 검증된 링크라고 안내하기
    // const prompt = ``
    const result = await llm.invoke(question)
    logger.info(result.content)

    return result.content
  }
}
