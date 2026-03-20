import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'

export default function ChatPepe() {
  const [resetFlag, setResetFlag] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const hasCleared = useRef(false)

  const initialPrompt = location.state?.prompt || ''

  const handleReset = () => {
    setResetFlag((prev) => !prev)
  }

  useEffect(() => {
    if (!hasCleared.current && location.state?.prompt) {
      hasCleared.current = true

      navigate(location.pathname, {
        replace: true,
        state: {},
      })
    }
  }, [location, navigate])

  return (
    <MainLayout>
      <div className="h-full flex flex-col bg-[#f7f9fc]">

        <ChatHeader onReset={handleReset} />

        <div className="flex-1 min-h-0">
          <ChatInput
            key={resetFlag ? 'reset-1' : 'reset-0'}
            initialPrompt={initialPrompt}
          />
        </div>

      </div>
    </MainLayout>
  )
}
