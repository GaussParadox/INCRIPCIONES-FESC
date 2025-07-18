import Inicio from '@/pages/Inicio/Inicio'
import SingleUser from '@/pages/Users/Id/SingleUser'
import UsersPage from '@/pages/Users/Users'
import ProgramasPage from '@/pages/Programas/Programas'
import Form from '@/pages/Inicio/form'
import Preform from '@/pages/Inicio/preform'
import Dashboard from '@/pages/Inicio/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/form' element={<Form />} />
        <Route path='/preform' element={<Preform />} />
        <Route path='/users/:id' element={<SingleUser />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/programas' element={<ProgramasPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
