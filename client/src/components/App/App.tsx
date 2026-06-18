import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Intro from '../../pages/Intro/Intro';
import KnowledgeBase from '../../pages/KnowledgeBase/KnowledgeBase';
import Chat from '../../pages/Chat/Chat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <span className="app__logo">MeshAI</span>
          <nav className="app__nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'app__nav-link app__nav-link--active' : 'app__nav-link'}>Home</NavLink>
            <NavLink to="/chat" className={({ isActive }) => isActive ? 'app__nav-link app__nav-link--active' : 'app__nav-link'}>Chat</NavLink>
            <NavLink to="/knowledge-base" className={({ isActive }) => isActive ? 'app__nav-link app__nav-link--active' : 'app__nav-link'}>Knowledge Base</NavLink>
          </nav>
        </header>
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
