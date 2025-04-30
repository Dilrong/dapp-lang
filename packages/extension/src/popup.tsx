import "./style.css"

import { useState } from "react"

import { ChatHistory } from "./components/chat-history"
import { ChatInput } from "./components/chat-input"

export default function IndexPopup() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userMessage = input.trim()
    if (!userMessage) return

    setMessages((prev) => [...prev, { type: "user", content: userMessage }])
    setInput("")

    try {
      const response = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userMessage })
      })

      if (!response.ok) {
        throw new Error("서버 응답 오류")
      }

      const data = await response.json()
      const answer = data.answer ?? "응답이 없습니다."

      // 한 글자씩 애니메이션 효과로 추가
      let currentText = ""
      setMessages((prev) => [...prev, { type: "bot", content: "" }])
      for (let i = 0; i < answer.length; i++) {
        currentText += answer[i]
        await new Promise((res) => setTimeout(res, 10)) // 속도 조절
        setMessages((prev) => {
          // 마지막 메시지만 업데이트
          const newPrev = [...prev]
          newPrev[newPrev.length - 1] = { type: "bot", content: currentText }
          return newPrev
        })
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "서버와 통신 중 오류가 발생했습니다." }
      ])
    }
  }

  return (
    <div className="flex flex-col h-96 w-96">
      <ChatHistory messages={messages} />
      <ChatInput onSubmit={handleSend} message={input} setMessage={setInput} />
    </div>
  )
}
