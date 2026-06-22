import { useState, useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { getChats, createChat, getMessages, sendMessage, type Chat as ChatType, type Message } from '../../utils/api';
import './Chat.css';

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [newChatInput, setNewChatInput] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChats()
      .then((res) => setChats(res.data ?? []))
      .finally(() => setIsLoadingChats(false));
  }, []);

  useEffect(() => {
    if (!activeChatId) return;
    setIsLoadingMessages(true);
    setMessages([]);
    getMessages(activeChatId)
      .then((res) => setMessages(res.data ?? []))
      .finally(() => setIsLoadingMessages(false));
  }, [activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowNewChat(false);
  };

  const handleCreateChat = async (e: FormEvent) => {
    e.preventDefault();
    const title = newChatInput.trim();
    if (!title) return;
    const res = await createChat(title);
    if (res.data) {
      setChats((prev) => [res.data!, ...prev]);
      setActiveChatId(res.data._id);
      setNewChatInput('');
      setShowNewChat(false);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || !activeChatId || isSending) return;

    const userMsg: Message = {
      _id: `temp-${Date.now()}`,
      chatId: activeChatId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    const res = await sendMessage(activeChatId, content);
    if (res.data) {
      setMessages((prev) => [...prev, res.data!]);
    }
    setIsSending(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as FormEvent);
    }
  };

  const activeChat = chats.find((c) => c._id === activeChatId);

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <div className="chat__sidebar-header">
          <span className="chat__sidebar-title">Chats</span>
          <button
            className="chat__new-btn"
            onClick={() => setShowNewChat(true)}
            aria-label="New chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {showNewChat && (
          <form className="chat__new-form" onSubmit={handleCreateChat}>
            <input
              className="chat__new-input"
              type="text"
              placeholder="Chat title..."
              value={newChatInput}
              onChange={(e) => setNewChatInput(e.target.value)}
              autoFocus
            />
            <div className="chat__new-form-actions">
              <button type="submit" className="chat__new-form-btn chat__new-form-btn--confirm">Create</button>
              <button type="button" className="chat__new-form-btn" onClick={() => { setShowNewChat(false); setNewChatInput(''); }}>Cancel</button>
            </div>
          </form>
        )}

        <ul className="chat__list">
          {isLoadingChats && <li className="chat__list-status">Loading...</li>}
          {!isLoadingChats && chats.length === 0 && (
            <li className="chat__list-status">No chats yet.</li>
          )}
          {chats.map((c) => (
            <li key={c._id}>
              <button
                className={`chat__list-item${c._id === activeChatId ? ' chat__list-item--active' : ''}`}
                onClick={() => handleSelectChat(c._id)}
              >
                <svg className="chat__list-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span className="chat__list-label">{c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="chat__main">
        {!activeChatId ? (
          <div className="chat__empty">
            <p className="chat__empty-text">Select a chat or create a new one to get started.</p>
            <button className="chat__empty-btn" onClick={() => setShowNewChat(true)}>New Chat</button>
          </div>
        ) : (
          <>
            <div className="chat__messages-header">
              <h2 className="chat__messages-title">{activeChat?.title}</h2>
            </div>

            <div className="chat__messages">
              {isLoadingMessages && (
                <p className="chat__messages-status">Loading messages...</p>
              )}
              {!isLoadingMessages && messages.length === 0 && (
                <p className="chat__messages-status">No messages yet. Ask something below.</p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat__message chat__message--${msg.role}`}
                >
                  <span className="chat__message-role">
                    {msg.role === 'user' ? 'You' : 'MeshAI'}
                  </span>
                  <p className="chat__message-content">{msg.content}</p>
                </div>
              ))}
              {isSending && (
                <div className="chat__message chat__message--assistant">
                  <span className="chat__message-role">MeshAI</span>
                  <p className="chat__message-content chat__message-content--typing">Thinking...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat__input-form" onSubmit={handleSend}>
              <textarea
                className="chat__input"
                placeholder="Ask a question about your documents..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isSending}
              />
              <button
                type="submit"
                className="chat__send-btn"
                disabled={!input.trim() || isSending}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
