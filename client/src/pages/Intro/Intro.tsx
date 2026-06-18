import { useNavigate } from 'react-router-dom';
import './Intro.css';

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro">
      <section className="intro__hero">
        <h1 className="intro__title">Your AI-Powered<br />Knowledge Base</h1>
        <p className="intro__subtitle">
          Upload your company documents, handbooks, and guides — then ask questions
          in plain English and get instant, accurate answers powered by AI.
        </p>
        <div className="intro__actions">
          <button className="intro__btn intro__btn--primary" onClick={() => navigate('/chat')}>
            Start Chatting
          </button>
          <button className="intro__btn intro__btn--secondary" onClick={() => navigate('/knowledge-base')}>
            Manage Documents
          </button>
        </div>
      </section>

      <section className="intro__features">
        <div className="intro__feature">
          <div className="intro__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="intro__feature-title">Upload Documents</h3>
          <p className="intro__feature-desc">
            Add PDF files to your knowledge base. MeshAI processes and indexes them automatically.
          </p>
        </div>

        <div className="intro__feature">
          <div className="intro__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h3 className="intro__feature-title">Ask Questions</h3>
          <p className="intro__feature-desc">
            Chat naturally with your documents. Ask anything and get answers drawn directly from your content.
          </p>
        </div>

        <div className="intro__feature">
          <div className="intro__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h3 className="intro__feature-title">Instant Answers</h3>
          <p className="intro__feature-desc">
            Get precise, AI-generated responses in seconds — no more searching through pages of documentation.
          </p>
        </div>
      </section>
    </div>
  );
}
