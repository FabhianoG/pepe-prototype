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
      <div className="w-full min-h-screen bg-[#f4f7fb] py-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md flex flex-col h-[80vh] overflow-hidden">
          
          {/* HEADER */}
          <ChatHeader onReset={handleReset} />

          {/* 🔥 FIX CLAVE */}
          <div className="flex-1 min-h-0">
            <ChatInput key={resetFlag ? 'reset-1' : 'reset-0'} />
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
