import { useState } from 'react'
import { Guest } from '@/types'

export default function Guests() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with API call
  const guests: Guest[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      roomNumber: '101',
      checkInDate: '2024-07-01',
      checkOutDate: '2024-07-05',
      paymentStatus: 'paid',
      nights: 4,
      totalAmount: 200,
      paidAmount: 200,
      idNumber: 'ABC123',
    },
  ]

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Guests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all guest information and bookings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button className="btn-primary">
            Add Guest
          </button>
        </div>
      </div>

      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search guests..."
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in/out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guests.map((guest) => (
                <tr key={guest.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {guest.firstName} {guest.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{guest.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.roomNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {guest.checkInDate} - {guest.checkOutDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      guest.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      guest.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {guest.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}