import Inicio from '@/pages/Inicio/Inicio'
import SingleUser from '@/pages/Users/Id/SingleUser'
import UsersPage from '@/pages/Users/Users'
import ProgramasPage from '@/pages/Programas/Programas'
import Form from '@/pages/Inicio/form'
import Preform from '@/pages/Inicio/preform'
import Dashboard from '@/pages/Inicio/Dashboard'
import Analiticas from '@/pages/Analiticas/Analiticas'
import LoginForm from '@/pages/Inicio/login'
import ProtectedRoute from '@/components/ProtectedRoute' // Asegúrate de tener esta ruta correcta

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/form'
          element={
              <Form />
          }
        />
        <Route
          path='/preform'
          element={
              <Preform />
      
          }
        />
        <Route
          path='/users/:id'
          element={
            <ProtectedRoute>
              <SingleUser />
            </ProtectedRoute>
          }
        />
        <Route
          path='/users'
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/programas'
          element={
            <ProtectedRoute>
              <ProgramasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/analiticas'
          element={
            <ProtectedRoute>
              <Analiticas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
