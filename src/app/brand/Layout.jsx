
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
     
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
