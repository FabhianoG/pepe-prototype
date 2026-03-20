import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import ChatPepe from "./pages/ChatPepe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      {/* 🟢 LANDING PRINCIPAL */}
      <Route path="/home" element={<Home />} />

      {/* 🤖 CHAT REAL */}
      <Route path="/chat-pepe" element={<ChatPepe />} />
    </Routes>
  );
}

export default App;
