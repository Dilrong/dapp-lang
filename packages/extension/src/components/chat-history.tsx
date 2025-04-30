import { useEffect, useRef } from "react"

interface ChatHistoryProps {
  messages: any[]
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={scrollRef}
      className="flex-1 text-base p-2 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 120px)" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded ${
            msg.type === "user"
              ? "bg-blue-100 ml-auto max-w-[80%]"
              : "mr-auto max-w-[80%]"
          }`}>
          {msg.content}
        </div>
      ))}
    </div>
  )
}
