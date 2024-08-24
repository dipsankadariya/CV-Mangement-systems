import React from 'react';
import CVList from './Components/CVList';
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import Layout from './Components/Layout';
import Template from './Components/Template';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'Form',
          element: <Form />,
        },
        {
          path: 'CVList',
          element: <CVList />,
        },
        {
          path: 'Template',
          element: <Template />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
