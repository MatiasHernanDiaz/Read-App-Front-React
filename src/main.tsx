import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorScreen from './error/ErrorScreen'
import Root from './routes/root/Root'
import App from './routes/app/App'
import LoginScreen from './routes/login/LoginScreen'
import Dashboard from './routes/app/dashboard/Dashboard'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: 'login',
        element: <LoginScreen />
      },
      {
        id: 'app',
        path: 'app',
        element: <App />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard/>
          },
          {
            path: 'authors',
            children: [
              {
                path: ':authorId'
              },
            ]
          },
          {
            path: 'books',
            children: [
              {
                path: ':bookId'
              },
            ]
          },
        ]
      }
    ]
  }
])


ReactDOM.createRoot( document.getElementById('root')! ).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
)