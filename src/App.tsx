import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import ChatPepe from "./pages/ChatPepe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat-pepe" element={<ChatPepe />} />
    </Routes>
  );
}

export default App;
