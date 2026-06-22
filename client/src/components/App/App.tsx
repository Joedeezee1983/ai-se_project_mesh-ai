import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import Intro from '../../pages/Intro/Intro';
import KnowledgeBase from '../../pages/KnowledgeBase/KnowledgeBase';
import Chat from '../../pages/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
