import Calendar from '@/components/Calendar'
import { useGuestStore } from '@/store/useGuestStore'

export default function CalendarPage() {
  const { guests } = useGuestStore()

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <p className="mt-2 text-sm text-gray-700">
            View guest check-ins, check-outs, and occupancy schedule
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button className="btn-primary">
            Export Calendar
          </button>
        </div>
      </div>

      <Calendar guests={guests} />

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <dt className="text-sm font-medium text-gray-500">
            Today's Check-ins
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-green-600">
            {guests.filter(guest => {
              const today = new Date().toISOString().split('T')[0]
              return guest.checkInDate === today
            }).length}
          </dd>
        </div>
        
        <div className="card">
          <dt className="text-sm font-medium text-gray-500">
            Today's Check-outs
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-amber-600">
            {guests.filter(guest => {
              const today = new Date().toISOString().split('T')[0]
              return guest.checkOutDate === today
            }).length}
          </dd>
        </div>
        
        <div className="card">
          <dt className="text-sm font-medium text-gray-500">
            Current Occupancy
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-indigo-600">
            {guests.filter(guest => {
              const today = new Date()
              const checkIn = new Date(guest.checkInDate)
              const checkOut = new Date(guest.checkOutDate)
              return checkIn <= today && today < checkOut
            }).length}
          </dd>
        </div>
        
        <div className="card">
          <dt className="text-sm font-medium text-gray-500">
            Pending Payments
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-red-600">
            {guests.filter(guest => guest.paymentStatus === 'pending').length}
          </dd>
        </div>
      </div>
    </div>
  )
}