import { useState } from 'react'
import { cn } from '@/utils/cn'

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'notifications' | 'integrations' | 'security'>('general')

  const tabs = [
    { id: 'general', name: 'General', icon: '🏨' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
    { id: 'security', name: 'Security', icon: '🔒' },
  ]

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Configure your hostel management system
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700 border-primary-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                )}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hostel Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hostel Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      defaultValue="PVT Hostel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      defaultValue="info@pvthostel.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="input-field"
                      defaultValue="+1-555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      className="input-field"
                      defaultValue="https://pvthostel.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      className="input-field"
                      rows={3}
                      defaultValue="123 Main Street, Montreal, QC H2J 3G5, Canada"
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Operational Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Check-in Time
                      </label>
                      <input
                        type="time"
                        className="input-field"
                        defaultValue="15:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Check-out Time
                      </label>
                      <input
                        type="time"
                        className="input-field"
                        defaultValue="11:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select className="input-field">
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select className="input-field">
                        <option value="America/Montreal">America/Montreal</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="America/Los_Angeles">America/Los_Angeles</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Europe/Paris">Europe/Paris</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Stripe', status: 'connected', icon: '💳' },
                    { name: 'PayPal', status: 'disconnected', icon: '🅿️' },
                    { name: 'Square', status: 'disconnected', icon: '⬜' },
                    { name: 'Cash', status: 'enabled', icon: '💵' },
                  ].map((method) => (
                    <div key={method.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{method.name}</h4>
                          <p className="text-sm text-gray-500">
                            Status: <span className={cn(
                              method.status === 'connected' || method.status === 'enabled' 
                                ? 'text-green-600' : 'text-red-600'
                            )}>
                              {method.status}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button className="btn-secondary">
                        {method.status === 'connected' || method.status === 'enabled' ? 'Configure' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Policies</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require payment at booking</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Allow partial payments</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm text-gray-700">Auto-charge on check-in</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Booking Confirmations', description: 'Send confirmation emails to guests' },
                    { name: 'Check-in Reminders', description: 'Remind guests 24 hours before check-in' },
                    { name: 'Check-out Reminders', description: 'Remind guests on check-out day' },
                    { name: 'Payment Receipts', description: 'Send receipts for all payments' },
                    { name: 'Review Requests', description: 'Ask for reviews after check-out' },
                  ].map((notification) => (
                    <div key={notification.name} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.name}</h4>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Configure Twilio for SMS notifications</p>
                    </div>
                    <button className="btn-secondary">Configure Twilio</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Channel Integrations</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Booking.com', status: 'connected', icon: '🏨', description: 'Sync rates and availability' },
                    { name: 'Hostelworld', status: 'disconnected', icon: '🏠', description: 'Manage hostel bookings' },
                    { name: 'Airbnb', status: 'disconnected', icon: '🅰️', description: 'List private rooms' },
                    { name: 'Expedia', status: 'disconnected', icon: '✈️', description: 'Reach more travelers' },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-500">{integration.description}</p>
                          <p className="text-xs text-gray-400">
                            Status: <span className={cn(
                              integration.status === 'connected' ? 'text-green-600' : 'text-red-600'
                            )}>
                              {integration.status}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button className="btn-secondary">
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Access Control</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require two-factor authentication</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Enable session timeout</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm text-gray-700">Allow guest self-registration</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Privacy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">GDPR compliance mode</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Automatic data backups</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm text-gray-700">Anonymous analytics only</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Logs</h3>
                <div className="space-y-4">
                  <button className="btn-secondary">Download System Logs</button>
                  <button className="btn-secondary">Download Audit Trail</button>
                  <button className="btn-secondary">View Security Events</button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button className="btn-secondary">
              Reset to Defaults
            </button>
            <button className="btn-primary">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}