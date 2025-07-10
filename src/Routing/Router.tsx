import Inicio from '@/pages/Inicio/Inicio'
import SingleUser from '@/pages/Users/Id/SingleUser'
import UsersPage from '@/pages/Users/Users'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/users/:id' element={<SingleUser />} />
        <Route path='/users' element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
