import { ArrowUp } from "lucide-react"
import React from "react"

interface ChatInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  message: string
  setMessage: (msg: string) => void
}

export function ChatInput({ onSubmit, message, setMessage }: ChatInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <form
        onSubmit={onSubmit}
        className="flex items-center p-4 max-w-3xl mx-auto">
        <textarea
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          placeholder="Ask for the DApp."
          className="flex-1 resize-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 h-12 max-h-32 overflow-y-auto"
          rows={1}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
            }
          }}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200">
          <ArrowUp />
        </button>
      </form>
    </div>
  )
}
