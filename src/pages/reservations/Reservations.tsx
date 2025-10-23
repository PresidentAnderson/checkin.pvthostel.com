import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReservationStore } from '@/store/useReservationStore'
import { Reservation } from '@/types/comprehensive'
import { cn } from '@/utils/cn'

export default function Reservations() {
  const { reservations, cancelReservation, checkInReservation, checkOutReservation } = useReservationStore()
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReservations = reservations.filter((reservation) => {
    const matchesFilter = filter === 'all' || reservation.status === filter
    const matchesSearch = 
      reservation.guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'checked_in':
        return 'bg-green-100 text-green-800'
      case 'checked_out':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'no_show':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: Reservation['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleQuickAction = (reservationId: string, action: 'check_in' | 'check_out' | 'cancel') => {
    switch (action) {
      case 'check_in':
        checkInReservation(reservationId)
        break
      case 'check_out':
        checkOutReservation(reservationId)
        break
      case 'cancel':
        if (confirm('Are you sure you want to cancel this reservation?')) {
          cancelReservation(reservationId, 'Cancelled by staff')
        }
        break
    }
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Reservations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all guest reservations and bookings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/reservations/new" className="btn-primary">
            New Reservation
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Guest name or confirmation number..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Filter
            </label>
            <select
              className="input-field"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Reservations</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button className="btn-secondary">
              Export
            </button>
            <button className="btn-secondary">
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="card">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest & Confirmation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates & Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room(s)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.guest.firstName} {reservation.guest.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reservation.confirmationNumber}
                      </div>
                      {reservation.guest.email && (
                        <div className="text-xs text-gray-400">
                          {reservation.guest.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{reservation.checkInDate}</div>
                      <div>{reservation.checkOutDate}</div>
                      <div className="text-xs text-gray-500">
                        {reservation.nights} night{reservation.nights !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.rooms.map(room => room.number).join(', ') || 'TBA'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">${reservation.totalAmount}</div>
                      <div className="text-xs text-gray-500">
                        Paid: ${reservation.paidAmount}
                      </div>
                      <span className={cn(
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        getPaymentStatusColor(reservation.paymentStatus)
                      )}>
                        {reservation.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(reservation.status)
                    )}>
                      {reservation.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {reservation.source.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {reservation.status === 'confirmed' && (
                        <button
                          onClick={() => handleQuickAction(reservation.id, 'check_in')}
                          className="text-green-600 hover:text-green-900 text-xs"
                        >
                          Check In
                        </button>
                      )}
                      {reservation.status === 'checked_in' && (
                        <button
                          onClick={() => handleQuickAction(reservation.id, 'check_out')}
                          className="text-blue-600 hover:text-blue-900 text-xs"
                        >
                          Check Out
                        </button>
                      )}
                      <Link
                        to={`/reservations/${reservation.id}`}
                        className="text-primary-600 hover:text-primary-900 text-xs"
                      >
                        View
                      </Link>
                      {reservation.status === 'confirmed' && (
                        <button
                          onClick={() => handleQuickAction(reservation.id, 'cancel')}
                          className="text-red-600 hover:text-red-900 text-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm || filter !== 'all' 
                  ? 'No reservations match your criteria' 
                  : 'No reservations found'
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}