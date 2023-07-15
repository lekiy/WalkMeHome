import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './ui/Landing.tsx'
import Home from './ui/Home.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/landing',
    element: <Landing />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
