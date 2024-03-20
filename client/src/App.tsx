import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./common/components/ProtectedRoute";
import RootLayout from "./layouts/RootLayout";
import Explore from "./pages/Explore";
import ReportItem from "./features/explore/components/ReportItem";
import ProfilePage from "./pages/Profile";
import MessagesPage from "./pages/Messages";
import ChatPage from "./pages/Chat";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>} />
        <Route path="/explore" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>} />
        <Route path="/explore/report-item" element={
          <ProtectedRoute>
            <ReportItem />
          </ProtectedRoute>} />
          <Route path="/messages" element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>} />
          <Route path="/chat/:item" element={
          <ProtectedRoute>
            <ChatPage/>
          </ProtectedRoute>} />
      </Routes>
    </RootLayout>
  );
};

export default App;
