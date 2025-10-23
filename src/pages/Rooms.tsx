import { Room } from '@/types'

export default function Rooms() {
  // Mock data - replace with API call
  const rooms: Room[] = [
    { id: '1', number: '101', type: 'dorm', capacity: 6, currentOccupancy: 4, price: 35, status: 'occupied' },
    { id: '2', number: '102', type: 'private', capacity: 2, currentOccupancy: 0, price: 80, status: 'available' },
    { id: '3', number: '103', type: 'dorm', capacity: 8, currentOccupancy: 8, price: 30, status: 'occupied' },
    { id: '4', number: '201', type: 'suite', capacity: 4, currentOccupancy: 0, price: 150, status: 'maintenance' },
  ]

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Rooms</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage room availability and pricing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div key={room.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Room {room.number}</h3>
                <p className="text-sm text-gray-500 capitalize">{room.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                room.status === 'available' ? 'bg-green-100 text-green-800' :
                room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {room.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Occupancy</span>
                <span className="font-medium">{room.currentOccupancy}/{room.capacity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price per night</span>
                <span className="font-medium">${room.price}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 btn-secondary py-1 text-sm">
                View Details
              </button>
              {room.status === 'available' && (
                <button className="flex-1 btn-primary py-1 text-sm">
                  Book Room
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}