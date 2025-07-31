export default function Dashboard() {
  const stats = [
    { name: 'Total Guests', value: '42', change: '+4.75%', changeType: 'positive' },
    { name: 'Occupied Rooms', value: '28/35', change: '80%', changeType: 'neutral' },
    { name: 'Today\'s Check-ins', value: '8', change: '+2', changeType: 'positive' },
    { name: 'Revenue Today', value: '$1,240', change: '+12.5%', changeType: 'positive' },
  ]

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
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
              {stat.change}
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Check-ins</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">Guest Name {i}</p>
                  <p className="text-sm text-gray-500">Room {100 + i}</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Check-outs</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">Guest Name {i}</p>
                  <p className="text-sm text-gray-500">Room {200 + i}</p>
                </div>
                <span className="text-sm text-gray-500">Tomorrow</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}