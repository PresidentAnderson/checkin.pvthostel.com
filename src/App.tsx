import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CheckIn from './pages/CheckIn'
import Guests from './pages/Guests'
import Rooms from './pages/Rooms'
import Reports from './pages/Reports'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App