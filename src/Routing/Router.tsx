import Inicio from '@/pages/Inicio/Inicio'
import SingleUser from '@/pages/Users/Id/SingleUser'
import UsersPage from '@/pages/Users/Users'
import Form from '@/pages/Inicio/form'
import Dashboard from '@/pages/Inicio/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/form' element={<Form />} />
        <Route path='/users/:id' element={<SingleUser />} />
        <Route path='/users' element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
