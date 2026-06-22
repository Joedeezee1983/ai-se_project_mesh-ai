import type { ReactNode } from 'react';
import Header from '../Header/Header';
import './AppLayout.css';

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
