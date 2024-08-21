import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../Css/Layout.css';

function Layout() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/Form">CV Form</Link></li>
          <li><Link to="/CVList">CV List</Link></li>
          <li><Link to="/Template"><button className='sidebar-button'>Template</button></Link></li>
        </ul>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
