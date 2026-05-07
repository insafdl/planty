import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Institutes from './pages/Institutes'
import InstituteDetail from './pages/InstituteDetail'
import Reservation from './pages/Reservation'
import Pricing from './pages/Pricing'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DashboardPremium from './pages/DashboardPremium'
// import DashboardAdmin from './pages/DashboardAdmin'
import Login from './pages/Login'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instituts" element={<Institutes />} />
        <Route path="/instituts/:id" element={<InstituteDetail />} />
        <Route path="/reserver/:id" element={<Reservation />} />
        <Route path="/tarifs" element={<Pricing />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/premium" element={<DashboardPremium />} />
        {/* <Route path="/dashboard/admin" element={<DashboardAdmin />} /> */}
      </Routes>
    </BrowserRouter>
  )
}