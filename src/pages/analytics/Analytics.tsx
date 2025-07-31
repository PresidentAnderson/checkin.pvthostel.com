import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import RevenueChart from '@/components/charts/RevenueChart'

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d')

  // Mock data - replace with real analytics data
  const revenueData = [
    { date: '2024-07-25', revenue: 1200, bookings: 8, occupancy: 75 },
    { date: '2024-07-26', revenue: 1400, bookings: 10, occupancy: 80 },
    { date: '2024-07-27', revenue: 1100, bookings: 7, occupancy: 70 },
    { date: '2024-07-28', revenue: 1600, bookings: 12, occupancy: 85 },
    { date: '2024-07-29', revenue: 1800, bookings: 14, occupancy: 90 },
    { date: '2024-07-30', revenue: 2000, bookings: 16, occupancy: 95 },
    { date: '2024-07-31', revenue: 1750, bookings: 13, occupancy: 88 },
  ]

  const roomTypeData = [
    { name: 'Dorm Beds', value: 60, revenue: 15000 },
    { name: 'Private Rooms', value: 25, revenue: 12000 },
    { name: 'Suites', value: 15, revenue: 8000 },
  ]

  const bookingSourceData = [
    { source: 'Direct', bookings: 25, revenue: 8500 },
    { source: 'Booking.com', bookings: 35, revenue: 12000 },
    { source: 'Hostelworld', bookings: 20, revenue: 7000 },
    { source: 'Walk-in', bookings: 15, revenue: 5500 },
    { source: 'Airbnb', bookings: 5, revenue: 2000 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  const kpis = [
    {
      name: 'Total Revenue',
      value: '$35,000',
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      name: 'Occupancy Rate',
      value: '82%',
      change: '+5.2%',
      changeType: 'positive' as const,
    },
    {
      name: 'Average Daily Rate',
      value: '$45',
      change: '+8.1%',
      changeType: 'positive' as const,
    },
    {
      name: 'RevPAR',
      value: '$37',
      change: '+15.3%',
      changeType: 'positive' as const,
    },
    {
      name: 'Cancellation Rate',
      value: '8.5%',
      change: '-2.1%',
      changeType: 'negative' as const,
    },
    {
      name: 'Guest Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      changeType: 'positive' as const,
    },
  ]

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Business intelligence and performance metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            className="input-field"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="card">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {kpi.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {kpi.value}
            </dd>
            <dd className={`mt-2 flex items-baseline text-sm font-semibold ${
              kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change}
            </dd>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>

        {/* Room Type Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Room Type</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, revenue }) => `${name}: $${revenue}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {roomTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Sources */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bookings by Source</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={bookingSourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Performing Rooms */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Rooms</h3>
          <div className="space-y-3">
            {[
              { room: 'Room 101', revenue: 2500, occupancy: 95, rate: 45 },
              { room: 'Room 102', revenue: 2200, occupancy: 88, rate: 42 },
              { room: 'Room 201', revenue: 2000, occupancy: 82, rate: 48 },
              { room: 'Dorm A', revenue: 1800, occupancy: 90, rate: 35 },
              { room: 'Suite 301', revenue: 1600, occupancy: 75, rate: 65 },
            ].map((room) => (
              <div key={room.room} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{room.room}</p>
                  <p className="text-sm text-gray-500">{room.occupancy}% occupancy</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${room.revenue}</p>
                  <p className="text-sm text-gray-500">${room.rate}/night</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New booking', guest: 'John Doe', time: '5 min ago', type: 'booking' },
              { action: 'Check-in completed', guest: 'Jane Smith', time: '12 min ago', type: 'checkin' },
              { action: 'Payment received', guest: 'Mike Johnson', time: '25 min ago', type: 'payment' },
              { action: 'Review submitted', guest: 'Sarah Wilson', time: '1 hour ago', type: 'review' },
              { action: 'Maintenance request', guest: 'Room 205', time: '2 hours ago', type: 'maintenance' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.guest}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}