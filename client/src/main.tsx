import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Paths } from './paths'
import './index.css'


const router = createBrowserRouter([
  {
    path: Paths.login,
    element: <h1>Login</h1>
  },
  {
    path: Paths.register,
    element: <h1>Register</h1>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
