import PepeWelcome from '../components/PepeWelcome'
import PepeInfoCard from '../components/PepeInfoCard'
import ChatLayout from '../components/chat/ChatLayout'
import MainLayout from '../layout/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <div
        className="
    w-full
    flex justify-center py-6 px-4
  "
      >
        <div className="w-full max-w-6xl space-y-6">
          {/* 🔥 BLOQUE SUPERIOR */}
          <div className="flex gap-6 items-stretch">
            {/* 🧑 IZQUIERDA */}
            <div className="bg-white rounded-2xl shadow-xl p-6 flex-1 flex">
              <PepeWelcome />
            </div>

            {/* 📊 DERECHA */}
            <div className="bg-white rounded-2xl shadow-xl p-6 flex-2 flex flex-col">
              <PepeInfoCard />
            </div>
          </div>

          {/* 🔥 CHAT SIEMPRE VISIBLE */}
          <div
            className="
          bg-white
          rounded-2xl
          shadow-2xl
          h-[70vh]
          overflow-hidden
        "
          >
            <ChatLayout />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
