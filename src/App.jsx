import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import CVList from './Components/CVList';
import Template from './Components/Template'; // Make sure this matches

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
        },
        {
          path: 'Template',
          element: <Template /> // Ensure this matches
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
