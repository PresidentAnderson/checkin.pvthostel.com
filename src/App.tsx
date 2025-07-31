import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CheckIn from './pages/CheckIn'
import Guests from './pages/Guests'
import Rooms from './pages/Rooms'
import Reports from './pages/Reports'
import CalendarPage from './pages/Calendar'
import Reservations from './pages/reservations/Reservations'
import Housekeeping from './pages/housekeeping/Housekeeping'
import Staff from './pages/staff/Staff'
import Analytics from './pages/analytics/Analytics'
import Settings from './pages/settings/Settings'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/housekeeping" element={<Housekeeping />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App