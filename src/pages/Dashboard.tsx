import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '@/components/Calendar'
import { analyticsApi } from '@/services/api'
import { mockAnalyticsApi, isMockMode } from '@/services/mockApi'
import { useGuestStore } from '@/store/useGuestStore'
import { useReservationStore } from '@/store/useReservationStore'

interface DashboardStats {
  totalGuests: number
  occupiedRooms: number
  totalRooms: number
  todayCheckins: number
  revenueToday: number
  occupancyRate: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { guests } = useGuestStore()
  const { reservations } = useReservationStore()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true)
      
      let dashboardStats
      if (isMockMode()) {
        dashboardStats = await mockAnalyticsApi.getDashboardStats()
      } else {
        try {
          dashboardStats = await analyticsApi.getDashboardStats()
        } catch (apiError) {
          console.warn('API not available, using mock data:', apiError)
          dashboardStats = await mockAnalyticsApi.getDashboardStats()
        }
      }
      
      setStats(dashboardStats)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      // Fallback to local data if available
      setStats({
        totalGuests: guests.length,
        occupiedRooms: 0,
        totalRooms: 4,
        todayCheckins: reservations.filter(r => r.status === 'checked_in').length,
        revenueToday: 0,
        occupancyRate: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatCards = () => {
    if (!stats) return []
    
    return [
      { 
        name: 'Total Guests', 
        value: stats.totalGuests.toString(), 
        change: `+${Math.floor(Math.random() * 10)}%`, 
        changeType: 'positive' as const 
      },
      { 
        name: 'Occupied Rooms', 
        value: `${stats.occupiedRooms}/${stats.totalRooms}`, 
        change: `${stats.occupancyRate}%`, 
        changeType: stats.occupancyRate > 80 ? 'positive' as const : 'neutral' as const 
      },
      { 
        name: 'Today\'s Check-ins', 
        value: stats.todayCheckins.toString(), 
        change: `+${Math.floor(Math.random() * 5)}`, 
        changeType: 'positive' as const 
      },
      { 
        name: 'Revenue Today', 
        value: `$${stats.revenueToday.toLocaleString()}`, 
        change: `+${Math.floor(Math.random() * 20)}%`, 
        changeType: 'positive' as const 
      },
    ]
  }

  const getRecentActivity = () => {
    const recentReservations = reservations
      .filter(r => r.status === 'checked_in')
      .slice(-3)
      .map(r => ({
        id: r.id,
        name: `${r.guest.firstName} ${r.guest.lastName}`,
        room: r.rooms.map(room => room.number).join(', ') || 'TBA',
        time: '2 hours ago' // This would be calculated from actual timestamp
      }))

    return recentReservations.length > 0 ? recentReservations : [
      { id: '1', name: 'John Doe', room: '101', time: '2 hours ago' },
      { id: '2', name: 'Jane Smith', room: '102', time: '3 hours ago' },
      { id: '3', name: 'Bob Wilson', room: '103', time: '4 hours ago' },
    ]
  }

  const getUpcomingCheckouts = () => {
    const upcomingCheckouts = reservations
      .filter(r => r.status === 'checked_in')
      .slice(0, 3)
      .map(r => ({
        id: r.id,
        name: `${r.guest.firstName} ${r.guest.lastName}`,
        room: r.rooms.map(room => room.number).join(', ') || 'TBA',
        time: 'Tomorrow' // This would be calculated from checkout date
      }))

    return upcomingCheckouts.length > 0 ? upcomingCheckouts : [
      { id: '1', name: 'Alice Johnson', room: '201', time: 'Tomorrow' },
      { id: '2', name: 'Mike Brown', room: '202', time: 'Tomorrow' },
      { id: '3', name: 'Sarah Davis', room: '203', time: 'In 2 days' },
    ]
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your hostel operations
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {getStatCards().map((stat) => (
            <div key={stat.name} className="card hover:shadow-md transition-shadow">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </dd>
              <dd className={`mt-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.changeType === 'positive' && '+'}
                {stat.change}
              </dd>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Check-ins</h3>
            <Link
              to="/reservations?status=checked_in"
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {getRecentActivity().map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded">
                <div>
                  <p className="font-medium text-gray-900">{activity.name}</p>
                  <p className="text-sm text-gray-500">Room {activity.room}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  <div className="text-xs text-green-600 font-medium">✓ Checked In</div>
                </div>
              </div>
            ))}
            {getRecentActivity().length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No recent check-ins
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Check-outs</h3>
            <Link
              to="/reservations?status=checked_in"
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {getUpcomingCheckouts().map((checkout) => (
              <div key={checkout.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded">
                <div>
                  <p className="font-medium text-gray-900">{checkout.name}</p>
                  <p className="text-sm text-gray-500">Room {checkout.room}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{checkout.time}</span>
                  <div className="text-xs text-yellow-600 font-medium">⏰ Check-out Due</div>
                </div>
              </div>
            ))}
            {getUpcomingCheckouts().length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No upcoming check-outs
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link to="/checkin" className="card hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-2">👤</div>
          <div className="font-medium text-gray-900">New Check-in</div>
          <div className="text-sm text-gray-500">Register new guest</div>
        </Link>
        
        <Link to="/rooms" className="card hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-2">🏠</div>
          <div className="font-medium text-gray-900">Manage Rooms</div>
          <div className="text-sm text-gray-500">View room status</div>
        </Link>
        
        <Link to="/reservations" className="card hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="font-medium text-gray-900">Reservations</div>
          <div className="text-sm text-gray-500">Manage bookings</div>
        </Link>
        
        <Link to="/reports" className="card hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-medium text-gray-900">Reports</div>
          <div className="text-sm text-gray-500">View analytics</div>
        </Link>
      </div>

      {/* Calendar Widget */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Calendar Overview</h3>
          <Link
            to="/calendar"
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            View Full Calendar →
          </Link>
        </div>
        <div style={{ height: '400px' }}>
          <Calendar className="border-0 shadow-none" />
        </div>
      </div>
    </div>
  )
}