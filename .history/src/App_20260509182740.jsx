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
import CalendrierInstitut from './pages/CalendrierInstitut'
import Reservations from './pages/Reservations'
import MesServices from './pages/MesServices'
import MonEquipe from './pages/MonEquipe'
// import DashboardAdmin from './pages/DashboardAdmin'
import Login from './pages/Login'
import ClientLogin from './pages/client/Login'
import ClientRegister from './pages/client/Register'
import ClientSalons from './pages/client/Salons'
import ClientReservation from './pages/client/Reservation'
import ClientFavoris from './pages/client/favoris';
import ClientSalonPicker from './pages/client/SalonPicker';
import Horaires from './pages/Horaires'
import Revenus from './pages/Revenus'
import Clientsfideles  from './pages/Clientsfideles'

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
        <Route path="/dashboard/calendrier" element={<CalendrierInstitut />} />
        <Route path="/dashboard/reservations" element={<Reservations />} />
        <Route path="/dashboard/services" element={<MesServices />} />
        <Route path="/dashboard/team" element={<MonEquipe />} />
        <Route path="/dashboard/hours" element={<Horaires />} />
        <Route path="/dashboard/revenue" element={<Revenus />} />
        <Route path="/dashboard/clients-fideles" element={<Clientsfideles />} />
        {/* <Route path="/dashboard/admin" element={<DashboardAdmin />} /> */}
        <Route path="/client/inscription" element={<ClientRegister />} />
        <Route path="/client/connexion" element={<ClientLogin />} />
        <Route path="/client/salons" element={<ClientSalons />} />        
        <Route path="/client/reserver" element={<ClientSalonPicker />} />
        <Route path="/client/reserver/:id" element={<ClientReservation />} />
        <Route path="/client/favoris" element={<ClientFavoris />} />

      </Routes>
    </BrowserRouter>
  )
}