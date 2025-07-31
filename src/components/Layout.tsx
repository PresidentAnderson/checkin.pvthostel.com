import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Check In', href: '/checkin', icon: '🏨' },
  { name: 'Reservations', href: '/reservations', icon: '📋' },
  { name: 'Guests', href: '/guests', icon: '👥' },
  { name: 'Rooms', href: '/rooms', icon: '🚪' },
  { name: 'Calendar', href: '/calendar', icon: '📅' },
  { name: 'Housekeeping', href: '/housekeeping', icon: '🧹' },
  { name: 'Staff', href: '/staff', icon: '👨‍💼' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary-600">PVT Hostel</h1>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      location.pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="btn-primary">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}