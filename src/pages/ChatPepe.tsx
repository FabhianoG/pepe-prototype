import { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'

export default function ChatPepe() {
  const [resetFlag, setResetFlag] = useState(false)

  const handleReset = () => {
    setResetFlag((prev) => !prev)
  }

  return (
    <MainLayout>
      <div className="h-full flex flex-col bg-[#f7f9fc]">

        {/* HEADER */}
        <ChatHeader onReset={handleReset} />

        {/* CHAT */}
        <div className="flex-1 min-h-0">
          <ChatInput key={resetFlag ? 'reset-1' : 'reset-0'} />
        </div>

      </div>
    </MainLayout>
  )
}
