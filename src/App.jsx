import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
      <main id="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
