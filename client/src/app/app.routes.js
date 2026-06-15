import { createBrowserRouter, Navigate } from 'react-router-dom'
import { createElement } from 'react'
import AuthHome from '../features/auth/pages/AuthHome'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: createElement(Navigate, { to: '/login', replace: true }),
  },
  {
    path: '/login',
    element: createElement(Login),
  },
  {
    path: '/register',
    element: createElement(Register),
  },
  {
    path: '/dashboard',
    element: createElement(AuthHome),
  },
])
