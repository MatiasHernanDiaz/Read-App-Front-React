import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorScreen from './error/ErrorScreen'
import Root, { loader as userLoader } from './routes/root/Root'
import App, { action as logoutAction } from './routes/app/App'
import LoginScreen, { action as loginAction } from './routes/login/LoginScreen'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: userLoader,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: 'login',
        element: <LoginScreen />,
        action: loginAction
      },
      {
        id: 'app',
        path: 'app',
        element: <App />,
        action: logoutAction,
        children: [
          {
            path: 'dashboard',
            element: <p>Dashboard</p>
          },
          {
            path: 'authors',
            element: <p>Autores</p>,
            children: [
              {
                path: ':authorId'
              },
            ]
          },
          {
            path: 'books',
            element: <p>Libros</p>,
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


ReactDOM.createRoot( document.getElementById('root')!! ).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
)