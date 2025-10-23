import { useState, useEffect } from 'react'
import { EnhancedRoom } from '@/types/comprehensive'
import { roomApi } from '@/services/api'
import { mockRoomApi, isMockMode } from '@/services/mockApi'
import toast from 'react-hot-toast'

export default function Rooms() {
  const [rooms, setRooms] = useState<EnhancedRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<EnhancedRoom | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      let roomsData
      if (isMockMode()) {
        roomsData = await mockRoomApi.getAll()
      } else {
        try {
          roomsData = await roomApi.getAll()
        } catch (apiError) {
          console.warn('API not available, using mock data:', apiError)
          roomsData = await mockRoomApi.getAll()
        }
      }
      
      setRooms(roomsData)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rooms')
      toast.error('Failed to load rooms')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (roomId: string, newStatus: string) => {
    try {
      let updatedRoom
      if (isMockMode()) {
        updatedRoom = await mockRoomApi.updateStatus(roomId, newStatus)
      } else {
        try {
          updatedRoom = await roomApi.updateStatus(roomId, newStatus)
        } catch (apiError) {
          updatedRoom = await mockRoomApi.updateStatus(roomId, newStatus)
        }
      }
      
      setRooms(prev => prev.map(room => 
        room.id === roomId ? updatedRoom : room
      ))
      
      toast.success(`Room ${updatedRoom.number} status updated to ${newStatus}`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to update room status')
    }
  }

  const getStatusColor = (status: EnhancedRoom['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cleaning':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'out_of_order':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const rate = occupancy / capacity
    if (rate === 0) return 'text-green-600'
    if (rate < 0.7) return 'text-yellow-600'
    if (rate < 1) return 'text-orange-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="px-4 sm:px-0">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">{error}</div>
          <button onClick={fetchRooms} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

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
          <div key={room.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Room {room.number}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {room.type} {room.subType && `• ${room.subType.replace('_', ' ')}`}
                </p>
                {room.name && (
                  <p className="text-xs text-gray-400 mt-1">{room.name}</p>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(room.status)}`}>
                  {room.status.replace('_', ' ')}
                </span>
                {room.floor && (
                  <span className="text-xs text-gray-500">Floor {room.floor}</span>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Occupancy</span>
                <span className={`font-medium ${getOccupancyColor(room.currentOccupancy, room.capacity)}`}>
                  {room.currentOccupancy}/{room.capacity}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(room.currentOccupancy / room.capacity) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Base Price</span>
                <span className="font-medium">
                  ${room.basePrice}
                  {room.dynamicPrice !== room.basePrice && (
                    <span className="text-primary-600 ml-1">
                      → ${room.dynamicPrice}
                    </span>
                  )}
                </span>
              </div>

              {room.amenities && room.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {amenity.name}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">+{room.amenities.length - 3} more</span>
                  )}
                </div>
              )}

              {(room.accessibility || room.smoking !== undefined) && (
                <div className="flex space-x-2 text-xs">
                  {room.accessibility && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">♿ Accessible</span>
                  )}
                  {room.smoking !== undefined && (
                    <span className={`px-2 py-1 rounded ${room.smoking ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                      {room.smoking ? '🚬 Smoking' : '🚭 No Smoking'}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedRoom(room)
                  setShowDetails(true)
                }}
                className="flex-1 btn-secondary py-2 text-sm"
              >
                View Details
              </button>
              
              {room.status === 'available' && (
                <button className="flex-1 btn-primary py-2 text-sm">
                  Book Room
                </button>
              )}
              
              {room.status === 'occupied' && (
                <button 
                  onClick={() => handleStatusUpdate(room.id, 'cleaning')}
                  className="flex-1 bg-blue-600 text-white py-2 text-sm rounded hover:bg-blue-700"
                >
                  Mark for Cleaning
                </button>
              )}
              
              {room.status === 'cleaning' && (
                <button 
                  onClick={() => handleStatusUpdate(room.id, 'available')}
                  className="flex-1 bg-green-600 text-white py-2 text-sm rounded hover:bg-green-700"
                >
                  Mark Available
                </button>
              )}
              
              {room.status === 'maintenance' && (
                <button 
                  onClick={() => handleStatusUpdate(room.id, 'available')}
                  className="flex-1 bg-green-600 text-white py-2 text-sm rounded hover:bg-green-700"
                >
                  Complete Maintenance
                </button>
              )}
            </div>
            
            {room.lastCleaned && (
              <div className="mt-2 text-xs text-gray-500">
                Last cleaned: {new Date(room.lastCleaned).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {rooms.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-500">No rooms found</div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {rooms.filter(r => r.status === 'available').length}
            </div>
            <div className="text-sm text-green-800">Available</div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {rooms.filter(r => r.status === 'occupied').length}
            </div>
            <div className="text-sm text-red-800">Occupied</div>
          </div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {rooms.filter(r => r.status === 'maintenance').length}
            </div>
            <div className="text-sm text-yellow-800">Maintenance</div>
          </div>
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {rooms.filter(r => r.status === 'cleaning').length}
            </div>
            <div className="text-sm text-blue-800">Cleaning</div>
          </div>
        </div>
      </div>
    </div>
  )
}