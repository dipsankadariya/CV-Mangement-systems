import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import CVList from './Components/CVList';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true, 
          element: <Dashboard />
        },
        {
          path: 'Form',
          element: <Form />
        },
        {
          path: 'CVList',
          element: <CVList />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
