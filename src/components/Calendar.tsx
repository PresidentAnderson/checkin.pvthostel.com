import { useState, useMemo } from 'react'
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'
import { CalendarEvent, Guest } from '@/types'
import { cn } from '@/utils/cn'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface CalendarProps {
  guests?: Guest[]
  className?: string
}

// Mock data - replace with real data from your store
const mockGuests: Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    roomNumber: '101',
    checkInDate: '2024-08-01',
    checkOutDate: '2024-08-05',
    paymentStatus: 'paid',
    nights: 4,
    totalAmount: 200,
    paidAmount: 200,
    idNumber: 'ABC123',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    roomNumber: '102',
    checkInDate: '2024-08-03',
    checkOutDate: '2024-08-07',
    paymentStatus: 'paid',
    nights: 4,
    totalAmount: 180,
    paidAmount: 180,
    idNumber: 'DEF456',
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    roomNumber: '103',
    checkInDate: '2024-08-02',
    checkOutDate: '2024-08-04',
    paymentStatus: 'pending',
    nights: 2,
    totalAmount: 120,
    paidAmount: 60,
    idNumber: 'GHI789',
  },
]

export default function Calendar({ guests = mockGuests, className }: CalendarProps) {
  const [view, setView] = useState<View>('month')
  const [date, setDate] = useState(new Date())

  const events: CalendarEvent[] = useMemo(() => {
    const eventList: CalendarEvent[] = []
    
    guests.forEach((guest) => {
      const checkInDate = new Date(guest.checkInDate)
      const checkOutDate = new Date(guest.checkOutDate)
      
      // Check-in event
      eventList.push({
        id: `checkin-${guest.id}`,
        title: `Check-in: ${guest.firstName} ${guest.lastName}`,
        start: checkInDate,
        end: new Date(checkInDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours
        resource: {
          type: 'check-in',
          guest,
          roomNumber: guest.roomNumber,
          status: 'confirmed',
        },
      })
      
      // Stay event (spans the entire duration)
      eventList.push({
        id: `stay-${guest.id}`,
        title: `${guest.firstName} ${guest.lastName} - Room ${guest.roomNumber}`,
        start: checkInDate,
        end: checkOutDate,
        resource: {
          type: 'stay',
          guest,
          roomNumber: guest.roomNumber,
          status: 'confirmed',
        },
      })
      
      // Check-out event
      eventList.push({
        id: `checkout-${guest.id}`,
        title: `Check-out: ${guest.firstName} ${guest.lastName}`,
        start: new Date(checkOutDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours before
        end: checkOutDate,
        resource: {
          type: 'check-out',
          guest,
          roomNumber: guest.roomNumber,
          status: 'confirmed',
        },
      })
    })
    
    return eventList
  }, [guests])

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3b82f6' // default blue
    let borderColor = '#1e40af'
    
    switch (event.resource.type) {
      case 'check-in':
        backgroundColor = '#10b981' // green
        borderColor = '#047857'
        break
      case 'check-out':
        backgroundColor = '#f59e0b' // amber
        borderColor = '#d97706'
        break
      case 'stay':
        backgroundColor = '#6366f1' // indigo
        borderColor = '#4338ca'
        break
    }
    
    if (event.resource.guest.paymentStatus === 'pending') {
      backgroundColor = '#ef4444' // red for unpaid
      borderColor = '#dc2626'
    }
    
    return {
      style: {
        backgroundColor,
        borderColor,
        color: 'white',
        border: `2px solid ${borderColor}`,
        borderRadius: '4px',
        fontSize: '12px',
        padding: '2px 4px',
      },
    }
  }

  const CustomEvent = ({ event }: { event: CalendarEvent }) => (
    <div className="text-xs">
      <div className="font-medium">{event.title}</div>
      <div className="opacity-90">Room {event.resource.roomNumber}</div>
      {event.resource.guest.paymentStatus === 'pending' && (
        <div className="text-red-200 text-xs">⚠ Payment Pending</div>
      )}
    </div>
  )

  return (
    <div className={cn('bg-white rounded-lg shadow-md', className)}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Guest Calendar
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setView('month')}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                view === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              )}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                view === 'week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              )}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                view === 'day'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              )}
            >
              Day
            </button>
            <button
              onClick={() => setView('agenda')}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                view === 'agenda'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              )}
            >
              Agenda
            </button>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            Check-ins
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
            Check-outs
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-500 rounded mr-2"></div>
            Guest Stays
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            Payment Pending
          </div>
        </div>
      </div>
      
      <div className="p-4" style={{ height: '600px' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
          }}
          step={60}
          showMultiDayTimes
          popup
          tooltipAccessor={(event: CalendarEvent) => 
            `${event.resource.guest.firstName} ${event.resource.guest.lastName} - Room ${event.resource.roomNumber}\n${event.resource.type === 'check-in' ? 'Checking in' : event.resource.type === 'check-out' ? 'Checking out' : 'Staying'}\nPayment: ${event.resource.guest.paymentStatus}`
          }
        />
      </div>
    </div>
  )
}