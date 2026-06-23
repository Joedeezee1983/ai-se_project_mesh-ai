import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './AppLayout.css';

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const location = useLocation();
  return (
    <div className="app-layout">
      {location.pathname !== '/' && <Header />}
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
