import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './ui/Login.tsx'
import Home from './ui/Home.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/login',
    element: <Login />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
