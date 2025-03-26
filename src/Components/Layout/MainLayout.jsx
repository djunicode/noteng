import React from 'react';
import Sidebar from '../Home/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-[250px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
