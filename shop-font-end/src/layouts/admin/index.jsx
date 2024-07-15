import React from 'react'
import HeaderLayoutAdmin from './components/header';
import FooterLayoutAdmin from './components/footer';
import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4">
        <HeaderLayoutAdmin />
        <main>
          <Outlet />
        </main>
        <FooterLayoutAdmin />
      </div >
    </>
  );
};

export default LayoutAdmin;